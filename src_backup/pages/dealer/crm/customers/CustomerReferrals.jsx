// src/pages/dealer/crm/customers/CustomerReferrals.jsx

import React from 'react';
import { UserGroupIcon, ArrowDownRightIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import StatusBadge from '@/components/shared/widgets/StatusBadge';

const mockReferrals = {
  referredBy: {
    id: 'CUS-00123',
    name: 'Rajeev Sharma',
    phone: '9876543210',
    ltv: '₹6.5L',
    status: 'Loyal'
  },
  refersTo: [
    {
      id: 'CUS-00188',
      name: 'Neha Tiwari',
      phone: '9988776655',
      ltv: '₹3.2L',
      status: 'Prime'
    },
    {
      id: 'CUS-00244',
      name: 'Mukesh Yadav',
      phone: '9911002200',
      ltv: '₹1.1L',
      status: 'Active'
    }
  ]
};

export default function CustomerReferrals() {
  const { referredBy, refersTo } = mockReferrals;

  return (
    <div className="bg-white rounded shadow p-6 space-y-6">
      <h2 className="text-xl font-bold flex items-center gap-2">
        <UserGroupIcon className="w-6 h-6 text-blue-600" />
        Referral Network
      </h2>

      {/* Referred By */}
      {referredBy ? (
        <div className="bg-blue-50 p-4 rounded border-l-4 border-blue-500 shadow-sm">
          <p className="text-sm text-gray-700 mb-1">🎯 <strong>Referred By</strong></p>
          <div className="flex justify-between items-center text-sm">
            <div>
              <Link to={`/dealer/crm/customers/${referredBy.id}`} className="text-blue-600 font-medium hover:underline">
                {referredBy.name}
              </Link>
              <p className="text-gray-500 text-xs">{referredBy.phone}</p>
            </div>
            <div className="text-xs text-right">
              <p>LTV: {referredBy.ltv}</p>
              <StatusBadge status={referredBy.status} />
            </div>
          </div>
        </div>
      ) : (
        <p className="text-gray-500 italic">No referral source found.</p>
      )}

      <div className="border-t pt-4">
        <p className="text-sm text-gray-700 mb-2">🔁 <strong>Referred Customers</strong></p>
        {refersTo.length > 0 ? (
          <ul className="space-y-3">
            {refersTo.map((ref) => (
              <li key={ref.id} className="flex justify-between items-center bg-gray-50 p-3 rounded shadow-sm hover:bg-gray-100">
                <div>
                  <Link to={`/dealer/crm/customers/${ref.id}`} className="font-medium text-blue-700 hover:underline">
                    {ref.name}
                  </Link>
                  <p className="text-xs text-gray-500">{ref.phone}</p>
                </div>
                <div className="text-xs text-right">
                  <p>LTV: {ref.ltv}</p>
                  <StatusBadge status={ref.status} />
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 italic">No referrals made yet by this customer.</p>
        )}
      </div>
    </div>
  );
}
