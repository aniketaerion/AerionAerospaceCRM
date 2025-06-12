// src/pages/dealer/BusinessProfile.jsx
import React, { useState, useEffect } from 'react';
// Assuming your api/dealers.js will eventually handle fetching/updating full dealer profile
// For Phase 1, we will use local dummy data.
// import { getDealerProfile, updateDealerProfile } from '../../api/dealers'; // Will uncomment later

const dummyDealerProfile = {
    dealer_name: 'Example Aero Solutions',
    contact_person: 'Jane Doe',
    email: 'janedoe@exampleaero.com',
    phone: '+1 555-123-4567',
    addressStreet: '123 Aerion Way',
    addressCity: 'Metropolis',
    addressState: 'CA',
    addressPincode: '90210',
    addressCountry: 'USA',
    business_description: 'Leading drone reseller and service provider in the region, serving agricultural and surveillance sectors.',
    logo_url: 'https://placehold.co/100x100/A0D468/000000?text=Dealer+Logo', // Placeholder image
    shop_photo_urls: [
        'https://placehold.co/150x100/F0B800/FFFFFF?text=Shop+Photo+1', // Placeholder image
        'https://placehold.co/150x100/0A2558/FFFFFF?text=Shop+Photo+2', // Placeholder image
        'https://placehold.co/150x100/3D85C6/FFFFFF?text=Shop+Photo+3', // Placeholder image
    ],
    // New fields for personalization and potential assessment (dummy data)
    dealer_type: 'Certified Reseller',
    established_year: 2018,
    annual_revenue_range: '₹1 Cr - ₹5 Cr',
    number_of_employees: 15,
    geographical_reach: 'Southern India',
    service_area_description: 'Covers Karnataka, Andhra Pradesh, Telangana for sales and service.'
};

const BusinessProfile = () => {
    const [dealerInfo, setDealerInfo] = useState(dummyDealerProfile); // Initialize with dummy data
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false); // No loading for dummy data
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const [newLogoFile, setNewLogoFile] = useState(null);
    const [newShopPhotoFiles, setNewShopPhotoFiles] = useState([]);

    // For Phase 1, useEffect just simulates loading or does nothing as data is static
    // In Phase 3, this would fetch real data from backend
    useEffect(() => {
        // Simulating a delay for fetching data if you want to see loading spinner
        // setLoading(true);
        // setTimeout(() => {
        //     setDealerInfo(dummyDealerProfile);
        //     setLoading(false);
        // }, 500);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDealerInfo(prev => ({ ...prev, [name]: value }));
    };

    const handleLogoChange = (e) => {
        if (e.target.files[0]) {
            setNewLogoFile(e.target.files[0]);
            // For dummy display, you could convert to data URL
            // const reader = new FileReader();
            // reader.onload = (event) => setDealerInfo(prev => ({ ...prev, logo_url: event.target.result }));
            // reader.readAsDataURL(e.target.files[0]);
        }
    };

    const handleShopPhotosChange = (e) => {
        if (e.target.files) {
            setNewShopPhotoFiles(Array.from(e.target.files));
            // For dummy display, you could convert to data URLs
            // const newUrls = Array.from(e.target.files).map(file => URL.createObjectURL(file));
            // setDealerInfo(prev => ({ ...prev, shop_photo_urls: [...prev.shop_photo_urls, ...newUrls] }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError(null);
        setSuccessMessage(null);

        console.log('Simulating update for:', dealerInfo);
        if (newLogoFile) console.log('New Logo File:', newLogoFile.name);
        if (newShopPhotoFiles.length > 0) console.log('New Shop Photos:', newShopPhotoFiles.map(f => f.name));

        // --- Dummy API Call Simulation ---
        try {
            // In Phase 3, this would be: await updateDealerProfile(dealerInfo, newLogoFile, newShopPhotoFiles);
            await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call delay

            // Update dummy data for immediate display based on form changes
            setDealerInfo(prev => ({
                ...prev,
                // If files were selected, update their dummy URLs here
                logo_url: newLogoFile ? 'https://placehold.co/100x100/00FF00/000000?text=New+Logo' : prev.logo_url, // Dummy URL for new logo
                shop_photo_urls: newShopPhotoFiles.length > 0 ? [...prev.shop_photo_urls, 'https://placehold.co/150x100/FF0000/FFFFFF?text=New+Photo'] : prev.shop_photo_urls // Dummy URL for new photo
            }));

            setSuccessMessage('Account details updated successfully (dummy)!');
            setIsEditing(false);
            setNewLogoFile(null);
            setNewShopPhotoFiles([]);
        } catch (err) {
            setError('Failed to update account details (dummy error).');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-40">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-800"></div>
                <p className="ml-4 text-blue-800">Loading business profile...</p>
            </div>
        );
    }

    return (
        <div className="p-6 bg-white rounded-lg shadow-xl max-w-4xl mx-auto my-8 font-inter">
            <h2 className="text-3xl font-extrabold text-blue-800 mb-6 border-b-2 pb-2 border-yellow-500">
                My Business Profile
            </h2>
            <p className="text-gray-600 mb-8">Manage your dealership's general business information, branding, and contact details.</p>

            {successMessage && (
                <div className="bg-green-100 text-green-700 p-3 rounded-md mb-4 border border-green-200">
                    {successMessage}
                </div>
            )}
            {error && isEditing && (
                <div className="bg-red-100 text-red-700 p-3 rounded-md mb-4 border border-red-200">
                    {error}
                </div>
            )}

            {isEditing ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Dealer Name */}
                    <div>
                        <label htmlFor="dealer_name" className="block text-sm font-medium text-gray-700 mb-1">Dealership Name <span className="text-red-500">*</span></label>
                        <input
                            type="text"
                            id="dealer_name"
                            name="dealer_name"
                            value={dealerInfo.dealer_name}
                            onChange={handleChange}
                            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500"
                            required
                        />
                    </div>

                    {/* Contact Person */}
                    <div>
                        <label htmlFor="contact_person" className="block text-sm font-medium text-gray-700 mb-1">Main Contact Person <span className="text-red-500">*</span></label>
                        <input
                            type="text"
                            id="contact_person"
                            name="contact_person"
                            value={dealerInfo.contact_person}
                            onChange={handleChange}
                            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500"
                            required
                        />
                    </div>

                    {/* Email (Often read-only or managed via auth) */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={dealerInfo.email}
                            onChange={handleChange}
                            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm bg-gray-50"
                            readOnly
                        />
                    </div>

                    {/* Phone */}
                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={dealerInfo.phone}
                            onChange={handleChange}
                            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500"
                        />
                    </div>

                    {/* Address Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="addressStreet" className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
                            <input type="text" id="addressStreet" name="addressStreet" value={dealerInfo.addressStreet} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500" />
                        </div>
                        <div>
                            <label htmlFor="addressCity" className="block text-sm font-medium text-gray-700 mb-1">City</label>
                            <input type="text" id="addressCity" name="addressCity" value={dealerInfo.addressCity} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500" />
                        </div>
                        <div>
                            <label htmlFor="addressState" className="block text-sm font-medium text-gray-700 mb-1">State/Province</label>
                            <input type="text" id="addressState" name="addressState" value={dealerInfo.addressState} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500" />
                        </div>
                        <div>
                            <label htmlFor="addressPincode" className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
                            <input type="text" id="addressPincode" name="addressPincode" value={dealerInfo.addressPincode} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500" />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="addressCountry" className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                        <input type="text" id="addressCountry" name="addressCountry" value={dealerInfo.addressCountry} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500" />
                    </div>


                    {/* Business Description */}
                    <div>
                        <label htmlFor="business_description" className="block text-sm font-medium text-gray-700 mb-1">Business Description</label>
                        <textarea
                            id="business_description"
                            name="business_description"
                            value={dealerInfo.business_description}
                            onChange={handleChange}
                            rows="4"
                            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500"
                        ></textarea>
                    </div>

                    {/* New Fields for Business Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="dealer_type" className="block text-sm font-medium text-gray-700 mb-1">Dealer Type</label>
                            <input type="text" id="dealer_type" name="dealer_type" value={dealerInfo.dealer_type} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500" />
                        </div>
                        <div>
                            <label htmlFor="established_year" className="block text-sm font-medium text-gray-700 mb-1">Established Year</label>
                            <input type="number" id="established_year" name="established_year" value={dealerInfo.established_year} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500" />
                        </div>
                        <div>
                            <label htmlFor="annual_revenue_range" className="block text-sm font-medium text-gray-700 mb-1">Annual Revenue Range</label>
                            <input type="text" id="annual_revenue_range" name="annual_revenue_range" value={dealerInfo.annual_revenue_range} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500" />
                        </div>
                        <div>
                            <label htmlFor="number_of_employees" className="block text-sm font-medium text-gray-700 mb-1">Number of Employees</label>
                            <input type="number" id="number_of_employees" name="number_of_employees" value={dealerInfo.number_of_employees} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500" />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="geographical_reach" className="block text-sm font-medium text-gray-700 mb-1">Geographical Reach</label>
                        <input type="text" id="geographical_reach" name="geographical_reach" value={dealerInfo.geographical_reach} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500" />
                    </div>
                    <div>
                        <label htmlFor="service_area_description" className="block text-sm font-medium text-gray-700 mb-1">Service Area Description</label>
                        <textarea
                            id="service_area_description"
                            name="service_area_description"
                            value={dealerInfo.service_area_description}
                            onChange={handleChange}
                            rows="2"
                            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500"
                        ></textarea>
                    </div>


                    {/* Dealer Logo Upload */}
                    <div>
                        <label htmlFor="logo_upload" className="block text-sm font-medium text-gray-700 mb-1">Upload Dealer Logo:</label>
                        {dealerInfo.logo_url && !newLogoFile && (
                            <div className="mt-2 mb-2">
                                <p className="text-gray-500 text-sm">Current Logo:</p>
                                <img src={dealerInfo.logo_url} alt="Current Dealer Logo" className="h-20 w-20 object-contain rounded-md border border-gray-200" />
                            </div>
                        )}
                        <input
                            type="file"
                            id="logo_upload"
                            accept="image/*"
                            onChange={handleLogoChange}
                            className="mt-1 block w-full text-sm text-gray-500
                                       file:mr-4 file:py-2 file:px-4
                                       file:rounded-full file:border-0
                                       file:text-sm file:font-semibold
                                       file:bg-blue-50 file:text-blue-700
                                       hover:file:bg-blue-100"
                        />
                         {newLogoFile && <p className="text-green-600 text-sm mt-1">New logo selected: {newLogoFile.name}</p>}
                    </div>

                    {/* Shop Photos Upload */}
                    <div>
                        <label htmlFor="shop_photos_upload" className="block text-sm font-medium text-gray-700 mb-1">Upload Shop Photos (Multiple allowed):</label>
                        {dealerInfo.shop_photo_urls && dealerInfo.shop_photo_urls.length > 0 && newShopPhotoFiles.length === 0 && (
                            <div className="mt-2 mb-2 flex flex-wrap gap-2">
                                <p className="text-gray-500 text-sm w-full">Current Shop Photos:</p>
                                {dealerInfo.shop_photo_urls.map((url, index) => (
                                    <img key={index} src={url} alt={`Shop Photo ${index + 1}`} className="h-20 w-20 object-cover rounded-md border border-gray-200" />
                                ))}
                            </div>
                        )}
                        <input
                            type="file"
                            id="shop_photos_upload"
                            accept="image/*"
                            multiple
                            onChange={handleShopPhotosChange}
                            className="mt-1 block w-full text-sm text-gray-500
                                       file:mr-4 file:py-2 file:px-4
                                       file:rounded-full file:border-0
                                       file:text-sm file:font-semibold
                                       file:bg-blue-50 file:text-blue-700
                                       hover:file:bg-blue-100"
                        />
                        {newShopPhotoFiles.length > 0 && (
                            <p className="text-green-600 text-sm mt-1">{newShopPhotoFiles.length} new photos selected.</p>
                        )}
                    </div>


                    {/* Action Buttons */}
                    <div className="flex justify-end space-x-3 mt-8">
                        <button
                            type="button"
                            onClick={() => { setIsEditing(false); setError(null); setSuccessMessage(null); setNewLogoFile(null); setNewShopPhotoFiles([]); }}
                            className="px-6 py-3 border border-gray-300 rounded-md text-gray-700 font-semibold hover:bg-gray-100 transition-colors"
                            disabled={submitting}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-3 bg-blue-800 text-white rounded-md font-semibold hover:bg-blue-700 transition-colors"
                            disabled={submitting}
                        >
                            {submitting ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            ) : (
                <div className="space-y-4 text-gray-800">
                    {dealerInfo.logo_url && (
                        <div className="mb-4">
                            <p className="text-sm font-medium text-gray-700">Dealer Logo:</p>
                            <img src={dealerInfo.logo_url} alt="Dealer Logo" className="h-24 w-24 object-contain rounded-lg border border-gray-200 shadow-sm mt-2" />
                        </div>
                    )}
                    <p><strong>Dealership Name:</strong> {dealerInfo.dealer_name}</p>
                    <p><strong>Contact Person:</strong> {dealerInfo.contact_person}</p>
                    <p><strong>Email:</strong> {dealerInfo.email}</p>
                    <p><strong>Phone:</strong> {dealerInfo.phone}</p>
                    <p><strong>Street Address:</strong> {dealerInfo.addressStreet || 'N/A'}</p>
                    <p><strong>City:</strong> {dealerInfo.addressCity || 'N/A'}</p>
                    <p><strong>State/Province:</strong> {dealerInfo.addressState || 'N/A'}</p>
                    <p><strong>Pincode:</strong> {dealerInfo.addressPincode || 'N/A'}</p>
                    <p><strong>Country:</strong> {dealerInfo.addressCountry || 'N/A'}</p>
                    <p><strong>Business Description:</strong> {dealerInfo.business_description || 'N/A'}</p>

                    {/* New Business Details Display */}
                    <div className="mt-6 border-t pt-4 border-gray-200">
                        <h3 className="text-xl font-semibold text-blue-700 mb-3">Business Details</h3>
                        <p><strong>Dealer Type:</strong> {dealerInfo.dealer_type || 'N/A'}</p>
                        <p><strong>Established Year:</strong> {dealerInfo.established_year || 'N/A'}</p>
                        <p><strong>Annual Revenue Range:</strong> {dealerInfo.annual_revenue_range || 'N/A'}</p>
                        <p><strong>Number of Employees:</strong> {dealerInfo.number_of_employees || 'N/A'}</p>
                        <p><strong>Geographical Reach:</strong> {dealerInfo.geographical_reach || 'N/A'}</p>
                        <p><strong>Service Area Description:</strong> {dealerInfo.service_area_description || 'N/A'}</p>
                    </div>

                    {dealerInfo.shop_photo_urls && dealerInfo.shop_photo_urls.length > 0 && (
                        <div>
                            <p className="text-sm font-medium text-gray-700 mt-4">Shop Photos:</p>
                            <div className="flex flex-wrap gap-3 mt-2">
                                {dealerInfo.shop_photo_urls.map((url, index) => (
                                    <img key={index} src={url} alt={`Shop Photo ${index + 1}`} className="h-28 w-28 object-cover rounded-lg border border-gray-200 shadow-sm" />
                                ))}
                            </div>
                        </div>
                    )}

                    <button
                        onClick={() => setIsEditing(true)}
                        className="mt-8 px-6 py-3 bg-yellow-500 text-blue-800 rounded-md font-semibold hover:bg-yellow-600 transition-colors"
                    >
                        Edit Business Profile
                    </button>
                </div>
            )}
        </div>
    );
};

export default BusinessProfile;
