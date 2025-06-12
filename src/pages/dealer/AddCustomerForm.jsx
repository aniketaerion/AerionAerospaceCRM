import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // To navigate back after submission

const AddCustomerForm = () => {
    const navigate = useNavigate(); // Hook to navigate

    const [customerData, setCustomerData] = useState({
        name: '',
        email: '',
        phone: '',
        addressStreet: '',
        addressCity: '',
        addressState: '',
        addressPincode: '',
        addressCountry: '',
        notes: '' // Any specific notes from dealer about this customer
    });

    // Handles changes in form input fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        setCustomerData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    // Handles form submission (currently just logs data)
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission behavior (page reload)
        console.log('Dummy Customer Data Submitted:', customerData);
        // In a real application (Phase 3), you would send this data to your backend API.
        // For now, we'll simulate success and navigate back.
        // Using alert() is generally discouraged in canvas, but for a quick dummy data confirmation, it's used here.
        // For production, replace with a custom modal/toast notification.
        alert('Customer added successfully (dummy data)! Check console for details.');
        navigate('/dealer/customers'); // Navigate back to the customers list
    };

    return (
        <div className="p-4 bg-white rounded-lg shadow-md max-w-2xl mx-auto my-8">
            <h2 className="text-2xl font-bold text-blue-800 mb-4 border-b-2 pb-2 border-yellow-500">Add New Customer</h2>
            <p className="text-gray-600 mb-6">Enter the details for your new customer below.</p>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Customer Name */}
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Customer Name <span className="text-red-500">*</span></label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={customerData.name}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        required
                    />
                </div>

                {/* Email */}
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email <span className="text-red-500">*</span></label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={customerData.email}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        required
                    />
                </div>

                {/* Phone */}
                <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone <span className="text-red-500">*</span></label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={customerData.phone}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        required
                    />
                </div>

                {/* Address Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="addressStreet" className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
                        <input type="text" id="addressStreet" name="addressStreet" value={customerData.addressStreet} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500" />
                    </div>
                    <div>
                        <label htmlFor="addressCity" className="block text-sm font-medium text-gray-700 mb-1">City</label>
                        <input type="text" id="addressCity" name="addressCity" value={customerData.addressCity} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500" />
                    </div>
                    <div>
                        <label htmlFor="addressState" className="block text-sm font-medium text-gray-700 mb-1">State/Province</label>
                        <input type="text" id="addressState" name="addressState" value={customerData.addressState} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500" />
                    </div>
                    <div>
                        <label htmlFor="addressPincode" className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
                        <input type="text" id="addressPincode" name="addressPincode" value={customerData.addressPincode} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500" />
                    </div>
                </div>
                <div>
                    <label htmlFor="addressCountry" className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                    <input type="text" id="addressCountry" name="addressCountry" value={customerData.addressCountry} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500" />
                </div>

                {/* Notes */}
                <div>
                    <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">Notes (Optional)</label>
                    <textarea
                        id="notes"
                        name="notes"
                        rows="3"
                        value={customerData.notes}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    ></textarea>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-4 pt-4">
                    <button
                        type="button"
                        onClick={() => navigate('/dealer/customers')} // Navigate back to list
                        className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 font-semibold hover:bg-gray-100 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-6 py-2 bg-blue-800 text-white rounded-md font-semibold hover:bg-blue-700 transition-colors"
                    >
                        Add Customer
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddCustomerForm;
