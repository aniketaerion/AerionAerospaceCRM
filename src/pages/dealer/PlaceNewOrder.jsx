// src/pages/dealer/PlaceNewOrder.jsx
import React, { useState, useEffect } from 'react';
import { sampleProducts } from '../../sampleProducts'; // CORRECTED PATH

const PlaceNewOrder = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All'); // New state for category filter
  const [searchTerm, setSearchTerm] = useState(''); // Existing search term state
  const [cart, setCart] = useState({}); // Example: { productId: quantity }

  useEffect(() => {
    // In the future, this will be an API call to fetch products
    setProducts(sampleProducts);
  }, []);

  // Get unique categories for the filter dropdown
  const categories = ['All', ...new Set(sampleProducts.map(p => p.category))];

  // Filtered products based on search term and selected category
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddToCart = (productId) => {
    setCart(prevCart => ({
      ...prevCart,
      [productId]: (prevCart[productId] || 0) + 1,
    }));
    console.log(`Added ${productId} to cart.`);
  };

  const handleRemoveFromCart = (productId) => {
    setCart(prevCart => {
      const newCart = { ...prevCart };
      if (newCart[productId] > 1) {
        newCart[productId] -= 1;
      } else {
        delete newCart[productId];
      }
      return newCart;
    });
    console.log(`Removed ${productId} from cart.`);
  };

  const calculateCartTotal = () => {
    let total = 0;
    for (const productId in cart) {
      const product = sampleProducts.find(p => p.id === productId);
      if (product) {
        total += product.price * cart[productId];
      }
    }
    return total.toLocaleString(); // Format for display
  };

  const handlePlaceOrder = () => {
    // In a real app, you'd send 'cart' data to your backend API
    if (Object.keys(cart).length === 0) {
      alert("Your cart is empty!");
      return;
    }
    alert(`Order placed for items: <span class="math-inline">\{JSON\.stringify\(cart\)\}\. Total\: ₹</span>{calculateCartTotal()}`);
    setCart({}); // Clear cart after placing order
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
      <h2 style={{ color: '#0A2558', marginBottom: '25px' }}>Place New Order</h2>

      {/* Search and Filter Controls */}
      <div style={{ marginBottom: '20px', display: 'flex', gap: '15px', alignItems: 'center' }}>
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ddd', flexGrow: 1 }}
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }}
        >
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      {/* Product List */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
        {filteredProducts.map(product => (
          <div key={product.id} style={{
            border: '1px solid #eee',
            borderRadius: '8px',
            padding: '15px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxShadow: '0 1px 5px rgba(0,0,0,0.03)'
          }}>
            <h3 style={{ color: '#0A2558', fontSize: '1.2em', marginBottom: '10px' }}>{product.name}</h3>
            <p style={{ fontSize: '0.9em', color: '#666', marginBottom: '5px' }}>Category: {product.category}</p>
            <p style={{ color: '#F0B800', fontWeight: 'bold', fontSize: '1.1em', marginBottom: '15px' }}>₹{product.price.toLocaleString()}</p>
            <p style={{ fontSize: '0.9em', color: '#555', marginBottom: '15px' }}>{product.description}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <button
                onClick={() => handleAddToCart(product.id)}
                style={{
                  backgroundColor: '#0A2558',
                  color: '#fff',
                  border: 'none',
                  padding: '8px 15px',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  fontSize: '0.9em'
                }}
              >
                Add to Cart
              </button>
              {cart[product.id] > 0 && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#555' }}>
                  <button
                    onClick={() => handleRemoveFromCart(product.id)}
                    style={{ background: 'none', border: '1px solid #ccc', borderRadius: '50%', width: '25px', height: '25px', cursor: 'pointer', fontSize: '1.1em', color: '#555' }}
                  >-</button>
                  <span>{cart[product.id]}</span>
                  <button
                    onClick={() => handleAddToCart(product.id)}
                    style={{ background: 'none', border: '1px solid #ccc', borderRadius: '50%', width: '25px', height: '25px', cursor: 'pointer', fontSize: '1.1em', color: '#555' }}
                  >+</button>
                </div>
              )}
            </div>
          </div>
        ))}
        {filteredProducts.length === 0 && (
          <p style={{ gridColumn: '1 / -1', textAlign: 'center', color: '#888' }}>No products found matching your criteria.</p>
        )}
      </div>

      {/* Cart Summary */}
      <div style={{
        marginTop: '30px',
        borderTop: '1px solid #eee',
        paddingTop: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <h3 style={{ color: '#0A2558' }}>Cart Total: ₹{calculateCartTotal()}</h3>
        <button
          onClick={handlePlaceOrder}
          disabled={Object.keys(cart).length === 0}
          style={{
            backgroundColor: Object.keys(cart).length === 0 ? '#ccc' : '#F0B800',
            color: '#fff',
            border: 'none',
            padding: '12px 25px',
            borderRadius: '5px',
            cursor: Object.keys(cart).length === 0 ? 'not-allowed' : 'pointer',
            fontSize: '1.1em',
            fontWeight: 'bold'
          }}
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default PlaceNewOrder;