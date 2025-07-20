// src/pages/dealer/sales/CustomerSalesHistory.jsx
import React, { useEffect, useState, useMemo } from 'react';
import TopHeaderBar from '@/components/shared/navigation/TopHeaderBar';
import { DateRangeSelector } from '@/components/shared/navigation/DateRangeSelector';
import { FilterPanel } from '@/components/shared/navigation/FilterPanel';
import { useSearchParams, Link } from 'react-router-dom';
import { useCrmStore } from '@/store/crmStore';
import { ShoppingBagIcon, TicketIcon, DocumentTextIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';

export default function CustomerSalesHistory() {
  const [searchParams, setSearchParams] = useSearchParams();
  const customerId = searchParams.get('customerId'); // This should ideally be a real ID
  const [customerName, setCustomerName] = useState("Selected Customer"); // Placeholder for customer name

  const initialDateRange = searchParams.get('dateRange') || 'all_time';
  const initialType = searchParams.get('type') || '';

  const [dateRange, setDateRange] = useState(initialDateRange);
  const [filters, setFilters] = useState({ type: initialType });

  const { customers, salesOrders, quotes, invoices, loading, fetchCustomers, fetchSalesOrders, fetchQuotes, fetchInvoices } = useCrmStore();

  useEffect(() => {
    // Fetch all related data, then filter by customerId client-side for this view
    fetchCustomers();
    fetchSalesOrders();
    fetchQuotes();
    fetchInvoices();

    if (customerId) {
      const foundCustomer = customers.find(c => c.id === customerId);
      if (foundCustomer) {
        setCustomerName(`${foundCustomer.firstName} ${foundCustomer.lastName} (${foundCustomer.company})`);
      } else {
        setCustomerName(`Customer ID: ${customerId}`);
      }
    } else {
      setCustomerName("No Customer Selected");
    }

    const newSearchParams = new URLSearchParams();
    if (customerId) newSearchParams.set('customerId', customerId);
    if (dateRange && dateRange !== 'all_time') newSearchParams.set('dateRange', dateRange);
    if (filters.type) newSearchParams.set('type', filters.type);
    setSearchParams(newSearchParams, { replace: true });

    // Polling for real-time updates
    const interval = setInterval(() => {
      fetchSalesOrders();
      fetchQuotes();
      fetchInvoices();
    }, 60000);
    return () => clearInterval(interval);
  }, [customerId, dateRange, filters, fetchCustomers, fetchSalesOrders, fetchQuotes, fetchInvoices, setSearchParams, customers]);


  const combinedHistory = useMemo(() => {
    if (!customerId) return [];

    const history = [];

    // Filter Sales Orders for this customer
    salesOrders.filter(order => order.customerId === customerId).forEach(order => {
      history.push({
        id: order.id,
        type: 'Order',
        date: order.orderDate,
        description: `Order: ${order.id} - ${order.status}`,
        amount: order.totalValue,
        status: order.status,
        link: `/dealer/sales/orders?search=${order.id}`, // Link back to OrderList filtered
        raw: order
      });
    });

    // Filter Quotes for this customer
    quotes.filter(quote => quote.customerId === customerId).forEach(quote => {
      history.push({
        id: quote.id,
        type: 'Quote',
        date: quote.dateIssued,
        description: `Quote: ${quote.id} - ${quote.status}`,
        amount: quote.totalValue,
        status: quote.status,
        link: `/dealer/sales/quotes?search=${quote.id}`, // Link back to QuoteList filtered
        raw: quote
      });
    });

    // Filter Invoices for this customer
    invoices.filter(invoice => invoice.customerId === customerId).forEach(invoice => {
      history.push({
        id: invoice.id,
        type: 'Invoice',
        date: invoice.dateIssued,
        description: `Invoice: ${invoice.id} - ${invoice.status}`,
        amount: invoice.totalAmount,
        status: invoice.status,
        link: `/dealer/finance/invoices?search=${invoice.id}`, // Link back to Invoices filtered
        raw: invoice
      });
    });

    // Sort by date (most recent first)
    return history.sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [customerId, salesOrders, quotes, invoices]);


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

  const typeOptions = useMemo(() => [
    { value: 'Order', label: 'Orders' },
    { value: 'Quote', label: 'Quotes' },
    { value: 'Invoice', label: 'Invoices' },
    { value: 'Service', label: 'Service Records' }, // Future: integrate service module data
    { value: 'Communication', label: 'Communications' }, // Future: integrate communication logs
  ], []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Paid':
      case 'Delivered':
      case 'Completed':
      case 'Accepted': return 'bg-green-100 text-green-800';
      case 'Due':
      case 'Sent':
      case 'Pending':
      case 'Processing': return 'bg-blue-100 text-blue-800';
      case 'Overdue':
      case 'Rejected':
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
        <TopHeaderBar title={`Sales History for ${customerName}`} showBack={true} backTo="/dealer/crm/customers/panel" />
        <DateRangeSelector selectedRange={dateRange} onRangeChange={setDateRange} />
      </div>

      <p className="mt-1 text-gray-600">Review a comprehensive history of sales transactions and interactions for this customer.</p>

      {!customerId && (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">No Customer Selected!</strong>
          <span className="block sm:inline ml-2">Please select a customer from the <Link to="/dealer/crm/customers/panel" className="underline hover:text-yellow-800">Customers Panel</Link> to view their history.</span>
        </div>
      )}

      {customerId && (
        <>
          <FilterPanel
            filtersConfig={[
              { id: 'type', label: 'Record Type', type: 'select', options: typeOptions },
              // Add more filters for specific details within records
            ]}
            onFilterChange={handleFilterChange}
            currentFilters={filters}
          />

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Transaction History ({combinedHistory.length})</h2>
            {loading ? (
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-16 bg-gray-100 rounded-md animate-pulse"></div>
                ))}
              </div>
            ) : combinedHistory.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        ID
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Description
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
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
                    {combinedHistory.map((item, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          <div className="flex items-center">
                            {item.type === 'Order' && <ShoppingBagIcon className="h-5 w-5 mr-2 text-blue-500" />}
                            {item.type === 'Quote' && <TicketIcon className="h-5 w-5 mr-2 text-purple-500" />}
                            {item.type === 'Invoice' && <DocumentTextIcon className="h-5 w-5 mr-2 text-green-500" />}
                            {item.type === 'Service' && <Cog6ToothIcon className="h-5 w-5 mr-2 text-orange-500" />}
                            {item.type}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {item.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(item.date).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {item.description}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {item.amount ? `$${item.amount.toLocaleString()}` : 'N/A'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(item.status)}`}>
                            {item.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          {item.link ? (
                            <Link to={item.link} className="text-blue-600 hover:text-blue-900">
                              View
                            </Link>
                          ) : (
                            <span className="text-gray-400">N/A</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-600 col-span-full text-center py-8">No history found for this customer with the selected criteria.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}
