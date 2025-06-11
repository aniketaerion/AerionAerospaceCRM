import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

// --- Dummy Data for Phase 1 ---
// In a real application, this data would come from your backend API
const dummyCustomers = [
    {
        id: 'cust-101',
        name: 'Prakash Sharma',
        email: 'prakash.s@example.com',
        phone: '+91 9000100010',
        dronesPurchased: 2,
        serviceTickets: 1,
        lastInteraction: '2025-05-20',
    },
    {
        id: 'cust-102',
        name: 'Rekha Devi',
        email: 'rekha.d@example.com',
        phone: '+91 9000200020',
        dronesPurchased: 1,
        serviceTickets: 0,
        lastInteraction: '2025-06-01',
    },
    {
        id: 'cust-103',
        name: 'Ramesh Singh',
        email: 'ramesh.s@example.com',
        phone: '+91 9000300030',
        dronesPurchased: 3,
        serviceTickets: 2,
        lastInteraction: '2025-04-15',
    },
    {
        id: 'cust-104',
        name: 'Sunita Patil',
        email: 'sunita.p@example.com',
        phone: '+91 9000400040',
        dronesPurchased: 1,
        serviceTickets: 0,
        lastInteraction: '2025-05-28',
    },
];
// --- End Dummy Data ---


const MyCustomers = () => {
    const navigate = useNavigate(); // Hook to navigate programmatically

    const [customers, setCustomers] = useState(dummyCustomers);
    const [searchTerm, setSearchTerm] = useState('');

    // Basic filtering logic for dummy data
    const filteredCustomers = customers.filter(customer =>
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.phone.includes(searchTerm)
    );

    return (
        <div className="p-4 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-blue-800 mb-4">My Customers</h2>
            <p className="text-gray-600 mb-6">Manage your customer data, track their purchases and service needs.</p>

            {/* Search Bar and Action Buttons */}
            <div className="mb-6 flex flex-col md:flex-row items-stretch md:items-center space-y-3 md:space-y-0 md:space-x-4">
                <input
                    type="text"
                    placeholder="Search by name, email, or phone"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-grow p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
                <button className="bg-yellow-500 text-blue-800 px-6 py-3 rounded-md font-semibold hover:bg-yellow-600 transition-colors w-full md:w-auto">
                    Search
                </button>
                {/* Navigates to the Add Customer Form */}
                <button
                    onClick={() => navigate('/dealer/customers/add')}
                    className="bg-blue-800 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700 transition-colors w-full md:w-auto"
                >
                    Add New Customer
                </button>
            </div>

            {/* Customers Table */}
            {filteredCustomers.length === 0 ? (
                <div className="text-center text-gray-500 py-10">No customers found matching your search.</div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                        <thead>
                            <tr className="bg-blue-50 text-blue-800 uppercase text-sm leading-normal">
                                <th className="py-3 px-6 text-left">Customer Name</th>
                                <th className="py-3 px-6 text-left">Email</th>
                                <th className="py-3 px-6 text-left">Phone</th>
                                <th className="py-3 px-6 text-center">Drones Purchased</th>
                                <th className="py-3 px-6 text-center">Service Tickets</th>
                                <th className="py-3 px-6 text-left">Last Interaction</th>
                                <th className="py-3 px-6 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-700 text-sm font-light">
                            {filteredCustomers.map((customer) => (
                                <tr key={customer.id} className="border-b border-gray-200 hover:bg-gray-100">
                                    <td className="py-3 px-6 text-left whitespace-nowrap">{customer.name}</td>
                                    <td className="py-3 px-6 text-left">{customer.email}</td>
                                    <td className="py-3 px-6 text-left">{customer.phone}</td>
                                    <td className="py-3 px-6 text-center">{customer.dronesPurchased}</td>
                                    <td className="py-3 px-6 text-center">{customer.serviceTickets}</td>
                                    <td className="py-3 px-6 text-left">{customer.lastInteraction}</td>
                                    <td className="py-3 px-6 text-center">
                                        {/* Placeholders for View/Edit buttons */}
                                        <button className="bg-blue-100 text-blue-700 py-1 px-3 rounded-md text-xs font-semibold mr-2 hover:bg-blue-200">
                                            View
                                        </button>
                                        <button className="bg-yellow-100 text-yellow-700 py-1 px-3 rounded-md text-xs font-semibold hover:bg-yellow-200">
                                            Edit
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default MyCustomers;
