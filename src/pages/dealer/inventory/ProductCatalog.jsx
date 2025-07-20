// src/pages/dealer/inventory/ProductCatalog.jsx
import React, { useEffect, useState, useMemo, useRef } from 'react';
import TopHeaderBar from '@/components/shared/navigation/TopHeaderBar';
import { DateRangeSelector } from '@/components/shared/navigation/DateRangeSelector';
import { FilterPanel } from '@/components/shared/navigation/FilterPanel';
import { useSearchParams } from 'react-router-dom';
import { useCrmStore } from '@/store/crmStore';
// Import Lucide React icons (these are still fine as they are not Shadcn UI specific)
import { MoreHorizontal, PlusCircle, Search, Filter, EyeIcon, PencilIcon, Trash2 } from 'lucide-react';

export default function ProductCatalog() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || '';
  const initialCategory = searchParams.get('category') || '';
  const initialSupplier = searchParams.get('supplier') || '';
  const initialDateRange = searchParams.get('dateRange') || 'all_time';

  const [dateRange, setDateRange] = useState(initialDateRange);
  const [filters, setFilters] = useState({
    search: initialSearch,
    category: initialCategory,
    supplier: initialSupplier
  });

  // Use the central CRM store for products data
  const { products, loading, fetchProducts, createProduct, deleteProduct } = useCrmStore();

  const [isAddProductDialogOpen, setIsAddProductDialogOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: '',
    sku: '',
    price: '',
    stock: '',
    status: 'Available', // Default status for new products
    description: '',
    manufacturer: '',
    unitCost: '',
    reorderPoint: '',
    warehouseLocation: '',
  });

  // State for managing dropdown menus (one for each product row)
  const [openDropdownId, setOpenDropdownId] = useState(null);

  // Fetch products on component mount and when filters/dateRange change
  useEffect(() => {
    fetchProducts({ dateRange, ...filters });

    // Sync URL search params
    const newSearchParams = new URLSearchParams();
    if (dateRange && dateRange !== 'all_time') newSearchParams.set('dateRange', dateRange);
    if (filters.search) newSearchParams.set('search', filters.search);
    if (filters.category) newSearchParams.set('category', filters.category);
    if (filters.supplier) newSearchParams.set('supplier', filters.supplier);
    setSearchParams(newSearchParams, { replace: true });

    // Polling for real-time updates
    const interval = setInterval(() => {
      fetchProducts({ dateRange, ...filters });
    }, 60000); // Poll every 60 seconds
    return () => clearInterval(interval);
  }, [dateRange, filters, fetchProducts, setSearchParams]);

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

  // Memoized options for filters from current product data
  const categoryOptions = useMemo(() => {
    const uniqueCategories = Array.from(new Set((products || []).map(p => p.category))).filter(Boolean);
    return uniqueCategories.map(cat => ({ value: cat, label: cat }));
  }, [products]);

  const supplierOptions = useMemo(() => {
    const uniqueSuppliers = Array.from(new Set((products || []).map(p => p.supplier))).filter(Boolean);
    return uniqueSuppliers.map(sup => ({ value: sup, label: sup }));
  }, [products]);

  // Status options for the new product form
  const newProductStatusOptions = useMemo(() => [
    { value: 'Available', label: 'Available' },
    { value: 'Low Stock', label: 'Low Stock' },
    { value: 'Out of Stock', label: 'Out of Stock' },
  ], []);

  // Maps status to Tailwind CSS classes
  const getStatusBadgeClasses = (stockStatus) => {
    switch (stockStatus) {
      case 'Available':
        return 'bg-green-100 text-green-800';
      case 'Low Stock':
        return 'bg-yellow-100 text-yellow-800';
      case 'Out of Stock':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getProductStockStatus = (product) => {
    if (product.currentStock === 0) return 'Out of Stock';
    if (product.currentStock <= product.reorderPoint) return 'Low Stock';
    return 'Available';
  };

  const handleAddNewProduct = async () => {
    if (!newProduct.name || !newProduct.category || !newProduct.sku || !newProduct.price || !newProduct.stock) {
      console.error('Please fill in all required fields: Name, Category, SKU, Price, Stock.');
      // In a real app, you might show a user-friendly toast or alert here.
      return;
    }

    try {
      const result = await createProduct(newProduct);
      if (result.success) {
        console.log('Product added successfully:', result.productId);
        fetchProducts({ dateRange, ...filters });
        setNewProduct({
          name: '', category: '', sku: '', price: '', stock: '', status: 'Available',
          description: '', manufacturer: '', unitCost: '', reorderPoint: '', warehouseLocation: ''
        });
        setIsAddProductDialogOpen(false);
      } else {
        console.error('Failed to add product:', result.error);
      }
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm(`Are you sure you want to delete product ${productId}? This action cannot be undone.`)) {
      try {
        const result = await deleteProduct(productId);
        if (result.success) {
          console.log('Product deleted successfully:', productId);
          fetchProducts({ dateRange, ...filters });
        } else {
          console.error('Failed to delete product:', result.error);
        }
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  // Helper function to format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);
  };

  // Ref for dropdown to close when clicking outside
  const dropdownRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdownId(null); // Close any open dropdown
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 font-sans">
      <TopHeaderBar title="Product Catalog" />

      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <div className="flex-1 w-full md:w-auto">
              <h2 className="text-2xl font-semibold text-gray-800">Inventory Overview</h2>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <DateRangeSelector selectedRange={dateRange} onSelectRange={setDateRange} />
              <button
                onClick={() => setIsAddProductDialogOpen(true)}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white font-medium rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
              >
                <PlusCircle className="h-5 w-5" />
                <span>Add New Product</span>
              </button>
            </div>
          </div>

          {/* Filter and Search Bar */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
            <div className="relative col-span-full md:col-span-2 lg:col-span-2">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={filters.search}
                onChange={(e) => handleFilterChange({ search: e.target.value })}
                className="pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500 w-full shadow-sm"
              />
            </div>
            <FilterPanel
              filters={[
                {
                  label: "Category",
                  name: "category",
                  type: "select",
                  options: [{ value: '', label: 'All Categories' }, ...categoryOptions],
                  value: filters.category,
                },
                {
                  label: "Supplier",
                  name: "supplier",
                  type: "select",
                  options: [{ value: '', label: 'All Suppliers' }, ...supplierOptions],
                  value: filters.supplier,
                },
              ]}
              onFilterChange={handleFilterChange}
            />
          </div>

          {/* Product Table */}
          {loading ? (
            <div className="text-center py-8 text-gray-500">Loading products...</div>
          ) : products.length === 0 ? (
            <div className="text-center py-8 text-gray-500">No products found matching your criteria.</div>
          ) : (
            <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SKU</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Updated</th>
                    <th className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {products.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.category}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.sku}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatCurrency(product.price)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.currentStock}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClasses(getProductStockStatus(product))}`}>
                          {getProductStockStatus(product)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {product.lastActivity ? new Date(product.lastActivity).toLocaleDateString() : 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        {/* Custom Dropdown Menu */}
                        <div className="relative inline-block text-left" ref={dropdownRef}>
                          <button
                            type="button"
                            className="inline-flex justify-center items-center p-2 text-sm font-medium text-gray-700 bg-white rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            onClick={() => setOpenDropdownId(openDropdownId === product.id ? null : product.id)}
                          >
                            <span className="sr-only">Open actions menu</span>
                            <MoreHorizontal className="h-5 w-5" />
                          </button>

                          {openDropdownId === product.id && (
                            <div
                              className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10"
                              role="menu"
                              aria-orientation="vertical"
                              aria-labelledby="menu-button"
                              tabIndex="-1"
                            >
                              <div className="py-1" role="none">
                                <span className="block px-4 py-2 text-xs text-gray-700" role="menuitem" tabIndex="-1">Actions</span>
                                <a
                                  href="#" // Replace with actual view/edit links if applicable
                                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                  role="menuitem" tabIndex="-1"
                                >
                                  <EyeIcon className="h-4 w-4" /> View Details
                                </a>
                                <a
                                  href="#" // Replace with actual view/edit links if applicable
                                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                  role="menuitem" tabIndex="-1"
                                >
                                  <PencilIcon className="h-4 w-4" /> Edit
                                </a>
                                <div className="border-t border-gray-100 my-1"></div>
                                <button
                                  onClick={() => handleDeleteProduct(product.id)}
                                  className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700"
                                  role="menuitem" tabIndex="-1"
                                >
                                  <Trash2 className="h-4 w-4" /> Delete
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* Add New Product Dialog (Modal) */}
      {isAddProductDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md animate-fade-in-up">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-900">Add New Product</h3>
              <button
                onClick={() => setIsAddProductDialogOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <p className="text-sm text-gray-600 mb-6">Fill in the details for the new product.</p>

            <div className="grid grid-cols-1 gap-y-4">
              <div className="flex flex-col">
                <label htmlFor="name" className="text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  id="name"
                  type="text"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="category" className="text-sm font-medium text-gray-700 mb-1">Category</label>
                <input
                  id="category"
                  type="text"
                  value={newProduct.category}
                  onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="sku" className="text-sm font-medium text-gray-700 mb-1">SKU</label>
                <input
                  id="sku"
                  type="text"
                  value={newProduct.sku}
                  onChange={(e) => setNewProduct({ ...newProduct, sku: e.target.value })}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="price" className="text-sm font-medium text-gray-700 mb-1">Price (INR)</label>
                <input
                  id="price"
                  type="number"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="stock" className="text-sm font-medium text-gray-700 mb-1">Stock</label>
                <input
                  id="stock"
                  type="number"
                  value={newProduct.stock}
                  onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="unitCost" className="text-sm font-medium text-gray-700 mb-1">Unit Cost (INR)</label>
                <input
                  id="unitCost"
                  type="number"
                  value={newProduct.unitCost}
                  onChange={(e) => setNewProduct({ ...newProduct, unitCost: e.target.value })}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="reorderPoint" className="text-sm font-medium text-gray-700 mb-1">Reorder Point</label>
                <input
                  id="reorderPoint"
                  type="number"
                  value={newProduct.reorderPoint}
                  onChange={(e) => setNewProduct({ ...newProduct, reorderPoint: e.target.value })}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="warehouseLocation" className="text-sm font-medium text-gray-700 mb-1">Location</label>
                <input
                  id="warehouseLocation"
                  type="text"
                  value={newProduct.warehouseLocation}
                  onChange={(e) => setNewProduct({ ...newProduct, warehouseLocation: e.target.value })}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="manufacturer" className="text-sm font-medium text-gray-700 mb-1">Manufacturer</label>
                <input
                  id="manufacturer"
                  type="text"
                  value={newProduct.manufacturer}
                  onChange={(e) => setNewProduct({ ...newProduct, manufacturer: e.target.value })}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="status" className="text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  id="status"
                  value={newProduct.status}
                  onChange={(e) => setNewProduct({ ...newProduct, status: e.target.value })}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  {newProductStatusOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col">
                <label htmlFor="description" className="text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  id="description"
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                  rows="3"
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                ></textarea>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setIsAddProductDialogOpen(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 font-medium rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleAddNewProduct}
                className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
              >
                Add Product
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
