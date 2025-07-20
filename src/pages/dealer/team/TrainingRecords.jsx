// src/pages/dealer/team/TrainingRecords.jsx
import React, { useEffect, useState, useMemo } from 'react';
import TopHeaderBar from '@/components/shared/navigation/TopHeaderBar';
import { DateRangeSelector } from '@/components/shared/navigation/DateRangeSelector'; // Filter by completion/expiry date
import { FilterPanel } from '@/components/shared/navigation/FilterPanel';
import { useSearchParams } from 'react-router-dom';
import { useCrmStore } from '@/store/crmStore';
import { AcademicCapIcon, CheckBadgeIcon, ExclamationTriangleIcon, CalendarDaysIcon, EyeIcon } from '@heroicons/react/24/outline';

export default function TrainingRecords() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialDateRange = searchParams.get('dateRange') || 'all_time';
  const initialSearch = searchParams.get('search') || '';
  const initialStatus = searchParams.get('status') || '';
  const initialEmployeeId = searchParams.get('employeeId') || ''; // Filter by specific employee

  const [dateRange, setDateRange] = useState(initialDateRange);
  const [filters, setFilters] = useState({
    search: initialSearch,
    status: initialStatus,
    employeeId: initialEmployeeId,
  });

  const { users, loading, fetchUsers, updateData } = useCrmStore(); // Need users to get employee names

  // Generate mock training records with actual user IDs
  const mockTrainingRecords = useMemo(() => {
    const records = [];
    users.forEach(user => {
      // Add general certifications
      records.push({
        id: `TR-${user.id}-G1`,
        employeeId: user.id,
        employeeName: user.name,
        course: `${faker.hacker.adjective()} Industry Standard Certification`,
        dateCompleted: faker.date.past({ years: 1, refDate: new Date(user.startDate) }).toISOString(),
        expiryDate: faker.date.future({ years: 1, refDate: new Date() }).toISOString(),
        status: faker.helpers.arrayElement(['Certified', 'Due for Renewal', 'Expired']),
        type: 'General',
      });

      // Add Aerion specific certifications for sales/service roles
      if (user.role.includes('Sales') || user.role.includes('Service') || user.type === 'Aerion Brand Representative') {
        records.push({
          id: `TR-${user.id}-A1`,
          employeeId: user.id,
          employeeName: user.name,
          course: `Aerion Product Master - ${faker.commerce.productName()}`,
          dateCompleted: faker.date.past({ years: 0.5, refDate: new Date(user.startDate) }).toISOString(),
          expiryDate: faker.date.future({ years: 0.5, refDate: new Date() }).toISOString(),
          status: faker.helpers.arrayElement(['Certified', 'Due for Renewal']),
          type: 'Aerion Product',
        });
        records.push({
          id: `TR-${user.id}-A2`,
          employeeId: user.id,
          employeeName: user.name,
          course: `Aerion ${faker.hacker.ingverb()} Protocol Training`,
          dateCompleted: faker.date.past({ years: 0.2, refDate: new Date(user.startDate) }).toISOString(),
          expiryDate: faker.date.future({ years: 0.2, refDate: new Date() }).toISOString(),
          status: faker.helpers.arrayElement(['Certified', 'Expired']),
          type: 'Aerion Protocol',
        });
      }
    });
    return records;
  }, [users]);


  const [filteredRecords, setFilteredRecords] = useState([]);

  useEffect(() => {
    fetchUsers(); // Ensure users data is loaded

    // Apply filters to mockTrainingRecords here, after users are loaded
    const currentFilteredRecords = mockTrainingRecords.filter(record => {
      const matchesSearch = filters.search === '' ||
                            record.employeeName.toLowerCase().includes(filters.search.toLowerCase()) ||
                            record.course.toLowerCase().includes(filters.search.toLowerCase());
      const matchesStatus = filters.status === '' || record.status === filters.status;
      const matchesEmployee = filters.employeeId === '' || record.employeeId === filters.employeeId;
      // Date range filtering (e.g., for expiry dates or completion dates) would apply here
      return matchesSearch && matchesStatus && matchesEmployee;
    });
    setFilteredRecords(currentFilteredRecords);


    const newSearchParams = new URLSearchParams();
    if (dateRange && dateRange !== 'all_time') newSearchParams.set('dateRange', dateRange);
    if (filters.search) newSearchParams.set('search', filters.search);
    if (filters.status) newSearchParams.set('status', filters.status);
    if (filters.employeeId) newSearchParams.set('employeeId', filters.employeeId);
    setSearchParams(newSearchParams, { replace: true });

    const interval = setInterval(() => {
        // Re-run filtering based on latest users if needed, or re-fetch if this were a real API
    }, 60000);
    return () => clearInterval(interval);
  }, [dateRange, filters, fetchUsers, setSearchParams, users, mockTrainingRecords]);


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

  const statusOptions = useMemo(() => [
    { value: 'Certified', label: 'Certified' },
    { value: 'Due for Renewal', label: 'Due for Renewal' },
    { value: 'Expired', label: 'Expired' },
  ], []);

  const employeeOptions = useMemo(() => {
    return users.map(user => ({ value: user.id, label: user.name }));
  }, [users]);

  const getCertificationStatusColor = (status) => {
    switch (status) {
      case 'Certified': return 'bg-green-100 text-green-800';
      case 'Due for Renewal': return 'bg-yellow-100 text-yellow-800';
      case 'Expired': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleUpdateCertificationStatus = async (recordId, currentStatus) => {
    // In a real app, this would update a certification record
    alert(`Action: Update status for record ${recordId} from ${currentStatus}. (Mock: Not implemented in store)`);
    // Example: await updateData('trainingRecords', recordId, { status: 'Recertified', expiryDate: new Date().setFullYear(new Date().getFullYear() + 1) });
  };


  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
        <TopHeaderBar title="Training & Certifications" showBack={true} backTo="/dealer/team/dashboard" />
        {/* DateRangeSelector here might filter by 'date completed' or 'expiry date' */}
        <DateRangeSelector selectedRange={dateRange} onRangeChange={setDateRange} />
      </div>

      <p className="mt-1 text-gray-600">Track all employee training and certifications, including critical Aerion product expertise, and monitor renewal dates.</p>

      <FilterPanel
        filtersConfig={[
          { id: 'search', label: 'Search Employee/Course', type: 'text' },
          { id: 'employeeId', label: 'Employee', type: 'select', options: employeeOptions },
          { id: 'status', label: 'Certification Status', type: 'select', options: statusOptions },
        ]}
        onFilterChange={handleFilterChange}
        currentFilters={filters}
      />

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Training and Certification Records ({filteredRecords.length})</h2>
        {loading ? (
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-100 rounded-md animate-pulse"></div>
            ))}
          </div>
        ) : filteredRecords.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Employee
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Course/Certification
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date Completed
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Expiry Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredRecords.map((record) => (
                  <tr key={record.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {record.employeeName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {record.course}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {record.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(record.dateCompleted).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center">
                        {record.status === 'Due for Renewal' && <CalendarDaysIcon className="h-4 w-4 mr-1 text-orange-500" />}
                        {record.status === 'Expired' && <ExclamationTriangleIcon className="h-4 w-4 mr-1 text-red-500" />}
                        {new Date(record.expiryDate).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getCertificationStatusColor(record.status)}`}>
                        {record.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <button title="View Details" className="text-blue-600 hover:text-blue-900">
                          <EyeIcon className="h-5 w-5" />
                        </button>
                        {(record.status === 'Due for Renewal' || record.status === 'Expired') && (
                           <button
                            title="Mark as Recertified"
                            onClick={() => handleUpdateCertificationStatus(record.id, record.status)}
                            className="text-green-600 hover:text-green-900"
                          >
                            <CheckBadgeIcon className="h-5 w-5" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-600 col-span-full text-center py-8">No training records found for the selected criteria.</p>
        )}
      </div>
    </div>
  );
}
