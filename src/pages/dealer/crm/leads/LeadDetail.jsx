import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import supabase from '@/lib/supabase/supabaseClient.ts';
import {
  PhoneIcon,
  EnvelopeIcon,
  ChatBubbleBottomCenterTextIcon,
  CheckBadgeIcon,
} from '@heroicons/react/24/outline';

// Import the LeadHistory component
import LeadHistory from './LeadHistory';

// --- Reusable Components for this page ---

// Tab Button Component
const TabButton = ({ isActive, onClick, children }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 text-sm font-medium rounded-md transition-colors
      ${isActive
        ? 'bg-aerion-blue text-white'
        : 'text-neutral-medium hover:bg-gray-100'
      }
    `}
  >
    {children}
  </button>
);

// Details Section Component
const LeadDetailsSection = ({ lead }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4 text-sm">
        <div className="flex flex-col"><span className="font-medium text-neutral-medium">Full Name</span><span className="text-neutral-dark">{lead.firstName} {lead.lastName}</span></div>
        <div className="flex flex-col"><span className="font-medium text-neutral-medium">Phone</span><span className="text-neutral-dark">{lead.mobile}</span></div>
        <div className="flex flex-col"><span className="font-medium text-neutral-medium">Language</span><span className="text-neutral-dark">{lead.language}</span></div>
        <div className="flex flex-col"><span className="font-medium text-neutral-medium">Pin Code</span><span className="text-neutral-dark">{lead.pinCode}</span></div>
        <div className="flex flex-col"><span className="font-medium text-neutral-medium">Product Interest</span><span className="text-neutral-dark">{lead.productInterest}</span></div>
        <div className="flex flex-col"><span className="font-medium text-neutral-medium">Assigned To</span><span className="text-neutral-dark">{lead.assignedTo || '-'}</span></div>
        <div className="flex flex-col"><span className="font-medium text-neutral-medium">Interest Level</span><span className="text-neutral-dark">{lead.interestLevel}</span></div>
        <div className="flex flex-col"><span className="font-medium text-neutral-medium">Stage</span><span className="text-neutral-dark">{lead.stage}</span></div>
    </div>
);

// Activity Timeline Component
const ActivityTimeline = () => {
    // In a real app, this data would be fetched from an 'interactions' table
    const activities = [
        { type: 'Call', notes: 'Left a voicemail, requested a call back.', user: 'Alice', date: '2025-06-18' },
        { type: 'System', notes: 'Status changed from New to Contacted.', user: 'Workflow', date: '2025-06-17' },
    ];

    return (
        <div className="space-y-4">
             {/* Form to log a new activity/disposition */}
             <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="font-semibold text-neutral-dark mb-2">Log New Activity</h3>
                <textarea className="w-full border rounded-md p-2" rows="3" placeholder="Log call notes, email summary, or meeting details..."></textarea>
                <div className="flex justify-end mt-2">
                    <button className="px-4 py-2 bg-aerion-blue text-white text-sm font-semibold rounded-md hover:bg-aerion-blue-dark">Save Activity</button>
                </div>
             </div>
             {/* List of past activities */}
             {activities.map((activity, i) => (
                <div key={i} className="p-4 border-l-4 border-aerion-blue bg-neutral-light/50 rounded">
                    <p className="text-sm font-medium text-neutral-dark">{activity.type} by {activity.user}</p>
                    <p className="text-sm text-neutral-medium mt-1">{activity.notes}</p>
                    <p className="text-xs text-neutral-medium mt-2">{activity.date}</p>
                </div>
             ))}
        </div>
    )
}

// --- Main Lead Detail Component ---

export default function LeadDetail() {
  const { leadId } = useParams();
  const navigate = useNavigate();
  const [lead, setLead] = useState(null);
  const [activeTab, setActiveTab] = useState('Details');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeadData = async () => {
      if (!leadId) return;
      setLoading(true);
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .eq('id', leadId)
        .single();

      if (error || !data) {
        console.error('Error fetching lead:', error);
        navigate('/dealer/crm/leads'); // Redirect if lead not found
      } else {
        setLead(data);
      }
      setLoading(false);
    };

    fetchLeadData();
  }, [leadId, navigate]);

  if (loading || !lead) {
    return <div className="p-8">Loading lead details...</div>;
  }
  
  const handleConvertToCustomer = () => {
    // 1. Update the 'is_customer' flag in the leads table
    // 2. Create a new record in the 'customers' table
    // 3. Navigate to the new customer detail page
    console.log(`Converting lead ${lead.id} to a customer.`);
    alert('This would trigger the lead conversion process.');
  };

  return (
    <div className="p-6 md:p-8 space-y-6">
      {/* --- Page Header --- */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-neutral-dark">{lead.firstName} {lead.lastName}</h1>
          <p className="text-neutral-medium">Lead ID: {lead.id}</p>
        </div>
        <div className="flex items-center gap-2">
            <button className="p-2 bg-white border rounded-md shadow-sm hover:bg-gray-50"><PhoneIcon className="h-5 w-5 text-neutral-dark" /></button>
            <button className="p-2 bg-white border rounded-md shadow-sm hover:bg-gray-50"><EnvelopeIcon className="h-5 w-5 text-neutral-dark" /></button>
            <button className="p-2 bg-white border rounded-md shadow-sm hover:bg-gray-50"><ChatBubbleBottomCenterTextIcon className="h-5 w-5 text-neutral-dark" /></button>
            <button 
                onClick={handleConvertToCustomer}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 shadow-sm"
            >
                <CheckBadgeIcon className="h-5 w-5"/>
                Convert to Customer
            </button>
        </div>
      </div>

      {/* --- Main Content Body --- */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        {/* Tab Navigation */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="flex space-x-2">
            <TabButton isActive={activeTab === 'Details'} onClick={() => setActiveTab('Details')}>Details</TabButton>
            <TabButton isActive={activeTab === 'Activity'} onClick={() => setActiveTab('Activity')}>Activity</TabButton>
            <TabButton isActive={activeTab === 'History'} onClick={() => setActiveTab('History')}>History</TabButton>
          </nav>
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === 'Details' && <LeadDetailsSection lead={lead} />}
          {activeTab === 'Activity' && <ActivityTimeline />}
          {activeTab === 'History' && <LeadHistory leadId={lead.id} />} {/* Render LeadHistory with leadId prop */}
        </div>
      </div>
    </div>
  );
}