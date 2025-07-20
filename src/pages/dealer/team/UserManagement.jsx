// src/pages/dealer/team/UserManagement.jsx
import React, { useEffect, useState, useMemo } from 'react';
import TopHeaderBar from '@/components/shared/navigation/TopHeaderBar';
import { DateRangeSelector } from '@/components/shared/navigation/DateRangeSelector'; // Could filter by start date
import { FilterPanel } from '@/components/shared/navigation/FilterPanel';
import { Link, useSearchParams } from 'react-router-dom';
import { PlusIcon, EyeIcon, PencilSquareIcon, UserCircleIcon, BuildingOffice2Icon } from '@heroicons/react/24/outline';
import { useCrmStore } from '@/store/crmStore';

export default function UserManagement() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialDateRange = searchParams.get('dateRange') || 'all_time'; // For join date
  const initialSearch = searchParams.get('search') || '';
  const initialRole = searchParams.get('role') || '';
  const initialType = searchParams.get('type') || '';
  const initialStatus = searchParams.get('status') || '';

  const [dateRange, setDateRange] = useState(initialDateRange);
  const [filters, setFilters] = useState({
    search: initialSearch,
    role: initialRole,
    type: initialType,
    status: initialStatus,
  });

  const { users, loading, fetchUsers, updateData } = useCrmStore();

  useEffect(() => {
    // Fetch users based on filters. Date range might apply to 'start date'
    fetchUsers({ dateRange, ...filters });

    const newSearchParams = new URLSearchParams();
    if (dateRange && dateRange !== 'all_time') newSearchParams.set('dateRange', dateRange);
    if (filters.search) newSearchParams.set('search', filters.search);
    if (filters.role) newSearchParams.set('role', filters.role);
    if (filters.type) newSearchParams.set('type', filters.type);
    if (filters.status) newSearchParams.set('status', filters.status);
    setSearchParams(newSearchParams, { replace: true });

    const interval = setInterval(() => {
      fetchUsers({ dateRange, ...filters });
    }, 60000);
    return () => clearInterval(interval);
  }, [dateRange, filters, fetchUsers, setSearchParams]);

  const handleFilterChange = (newFilter) => {
    setFilters((prev) => {
      const updatedFilters = { ...prev, ...newFilter };
      Object.keys(updatedFilters).forEach(key => {
        if (updatedFilters[key] === '') {
          delete updatedFilters[key];
        }
      });
      return updatedFilters;
    });
  };

  const roleOptions = useMemo(() => {
    const uniqueRoles = Array.from(new Set(users.map(u => u.role))).filter(Boolean);
    return uniqueRoles.map(r => ({ value: r, label: r }));
  }, [users]);

  const typeOptions = useMemo(() => [
    { value: 'Dealer Staff', label: 'Dealer Staff' },
    { value: 'Aerion Brand Representative', label: 'Aerion Brand Representative' },
  ], []);

  const statusOptions = useMemo(() => [
    { value: 'Active', label: 'Active' },
    { value: 'Inactive', label: 'Inactive' },
  ], []);

  const getUserStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Inactive': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleToggleUserStatus = async (userId, currentStatus) => {
    const newStatus = currentStatus === 'Active' ? 'Inactive' : 'Active';
    const confirmation = window.confirm(`Are you sure you want to change user ${userId}'s status to ${newStatus}?`);
    if (confirmation) {
      await updateData('users', userId, { status: newStatus });
      fetchUsers({ dateRange, ...filters });
    }
  };


  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
        <TopHeaderBar title="User Management" showBack={true} backTo="/dealer/team/dashboard" />
        <div className="flex items-center gap-4">
          <DateRangeSelector selectedRange={dateRange} onRangeChange={setDateRange} />
          <Link
            to="/dealer/team/users/create" // Placeholder for create user page
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            Add New User
          </Link>
        </div>
      </div>

      <p className="mt-1 text-gray-600">Manage all dealership staff and Aerion Brand Representatives, their roles, and access permissions within the system.</p>

      <FilterPanel
        filtersConfig={[
          { id: 'search', label: 'Search Name/Email', type: 'text' },
          { id: 'type', label: 'User Type', type: 'select', options: typeOptions },
          { id: 'role', label: 'Role', type: 'select', options: roleOptions },
          { id: 'status', label: 'Status', type: 'select', options: statusOptions },
        ]}
        onFilterChange={handleFilterChange}
        currentFilters={filters}
      />

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Dealership & Brand Team Members ({users.length})</h2>
        {loading ? (
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-100 rounded-md animate-pulse"></div>
            ))}
          </div>
        ) : users.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User Type
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Start Date
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      <div className="flex items-center">
                        {user.type === 'Aerion Brand Representative' ? (
                          <BuildingOffice2Icon className="h-5 w-5 mr-2 text-aerion-blue" />
                        ) : (
                          <UserCircleIcon className="h-5 w-5 mr-2 text-gray-500" />
                        )}
                        {user.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.role}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getUserStatusColor(user.status)}`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(user.startDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <button title="View Details" className="text-blue-600 hover:text-blue-900">
                          <EyeIcon className="h-5 w-5" />
                        </button>
                        <button title="Edit User" className="text-indigo-600 hover:text-indigo-900">
                          <PencilSquareIcon className="h-5 w-5" />
                        </button>
                        <button
                          title={user.status === 'Active' ? 'Deactivate User' : 'Activate User'}
                          onClick={() => handleToggleUserStatus(user.id, user.status)}
                          className={`text-sm font-medium ${user.status === 'Active' ? 'text-red-600 hover:text-red-900' : 'text-green-600 hover:text-green-900'}`}
                        >
                          {user.status === 'Active' ? 'Deactivate' : 'Activate'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-600 col-span-full text-center py-8">No users found for the selected criteria.</p>
        )}
      </div>
    </div>
  );
}
