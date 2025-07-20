// src/pages/dealer/profile/DealerProfile.jsx
import React, { useEffect } from 'react';
import TopHeaderBar from '@/components/shared/navigation/TopHeaderBar';
import { useCrmStore } from '@/store/crmStore';
import { UserCircleIcon } from 'lucide-react';
import { BuildingOfficeIcon, GlobeAltIcon, PhoneIcon, EnvelopeIcon, BanknotesIcon, KeyIcon, ClockIcon } from '@heroicons/react/24/outline';

export default function DealerProfile() {
  const { dealerProfile, loading, error, fetchDealerProfile, updateData } = useCrmStore();

  useEffect(() => {
    fetchDealerProfile();
  }, [fetchDealerProfile]);

  const handleEditProfile = async () => {
    const newContactName = prompt("Enter new primary contact name:", dealerProfile?.primaryContact || "");
    if (newContactName !== null) {
      await updateData('dealerProfile', 'singleton', { primaryContact: newContactName }); // 'singleton' as ID for a single profile record
      fetchDealerProfile(); // Re-fetch to update UI
    }
  };


  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <TopHeaderBar title="Dealer Profile" />
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 h-96 flex items-center justify-center">
          <p className="text-gray-600 animate-pulse">Loading dealer profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 space-y-6">
        <TopHeaderBar title="Dealer Profile" />
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline ml-2">{error}</span>
          <p className="mt-2">Please try refreshing the page.</p>
        </div>
      </div>
    );
  }

  if (!dealerProfile) {
    return (
      <div className="p-6 space-y-6">
        <TopHeaderBar title="Dealer Profile" />
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Profile Not Found!</strong>
          <span className="block sm:inline ml-2">No dealer profile data available.</span>
        </div>
      </div>
    );
  }


  return (
    <div className="p-6 space-y-6">
      <TopHeaderBar title="Dealer Profile" />
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <BuildingOfficeIcon className="h-6 w-6 mr-2 text-aerion-blue" /> Dealership Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6 text-gray-700">
          <div>
            <p className="font-medium text-gray-900">Legal Name:</p>
            <p>{dealerProfile.legalName}</p>
          </div>
          <div>
            <p className="font-medium text-gray-900">Trading Name:</p>
            <p>{dealerProfile.tradeName}</p>
          </div>
          <div className="md:col-span-2">
            <p className="font-medium text-gray-900">Address:</p>
            <p>{dealerProfile.address}</p>
          </div>
          <div>
            <p className="font-medium text-gray-900 flex items-center"><UserCircleIcon className="h-5 w-5 mr-1 text-gray-500" /> Primary Contact:</p>
            <p>{dealerProfile.primaryContact}</p>
          </div>
          <div>
            <p className="font-medium text-gray-900 flex items-center"><EnvelopeIcon className="h-5 w-5 mr-1 text-gray-500" /> Contact Email:</p>
            <p>{dealerProfile.contactEmail}</p>
          </div>
          <div>
            <p className="font-medium text-gray-900 flex items-center"><PhoneIcon className="h-5 w-5 mr-1 text-gray-500" /> Contact Phone:</p>
            <p>{dealerProfile.contactPhone}</p>
          </div>
          <div>
            <p className="font-medium text-gray-900 flex items-center"><GlobeAltIcon className="h-5 w-5 mr-1 text-gray-500" /> Website:</p>
            <p>{dealerProfile.website}</p>
          </div>
          {dealerProfile.logoUrl && (
            <div className="md:col-span-2">
              <p className="font-medium text-gray-900">Dealership Logo:</p>
              <img src={dealerProfile.logoUrl} alt="Dealership Logo" className="mt-2 h-auto max-w-[150px] rounded-md shadow-sm" />
            </div>
          )}
        </div>

        <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4 flex items-center">
          <BanknotesIcon className="h-6 w-6 mr-2 text-aerion-blue" /> Financial Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6 text-gray-700">
          <div>
            <p className="font-medium text-gray-900">Bank Name:</p>
            <p>{dealerProfile.bankName}</p>
          </div>
          <div>
            <p className="font-medium text-gray-900">Account Number:</p>
            <p>{dealerProfile.accountNumber}</p>
          </div>
          <div>
            <p className="font-medium text-gray-900">IFSC/SWIFT Code:</p>
            <p>{dealerProfile.ifscSwift}</p>
          </div>
          <div>
            <p className="font-medium text-gray-900">Tax ID (GST/VAT):</p>
            <p>{dealerProfile.taxId}</p>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4 flex items-center">
          <KeyIcon className="h-6 w-6 mr-2 text-aerion-blue" /> Licenses & Certifications
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6 text-gray-700">
          <div>
            <p className="font-medium text-gray-900">Business License:</p>
            <p>{dealerProfile.businessLicense}</p>
          </div>
          <div>
            <p className="font-medium text-gray-900">Aerion Certified:</p>
            <p>{dealerProfile.aerionCertified}</p>
          </div>
          {dealerProfile.aerionCertified === "Yes" && (
            <div>
              <p className="font-medium text-gray-900 flex items-center"><ClockIcon className="h-5 w-5 mr-1 text-gray-500" /> Certification Expiry:</p>
              <p>{new Date(dealerProfile.certificationExpiry).toLocaleDateString()}</p>
            </div>
          )}
        </div>

        <div className="mt-8 flex justify-end">
          <button
            onClick={handleEditProfile}
            className="inline-flex items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
}
