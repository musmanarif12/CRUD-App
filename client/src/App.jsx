import { useState, useEffect } from 'react';

function App() {
  // State for products list and loading indicator
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // State for filtering products
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // App Theme state
  const [lightTheme, setLightTheme] = useState(false);

  const API_URL = 'http://localhost:5000/api/products';

  // Side-effect to toggle theme classes on the body element
  useEffect(() => {
    if (lightTheme) {
      document.body.classList.add('light-theme');
    } else {
      document.body.classList.remove('light-theme');
    }
  }, [lightTheme]);

  // Function to fetch products from backend API
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const query = new URLSearchParams();
      
      if (searchTerm) {
        query.append('search', searchTerm);
      }
      if (selectedCategory && selectedCategory !== 'All') {
        query.append('category', selectedCategory);
      }

      const response = await fetch(`${API_URL}?${query.toString()}`);
      if (!response.ok) {
        throw new Error('Failed to retrieve products');
      }
      
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      console.error('Error fetching products:', err.message);
    } finally {
      setLoading(false);
    }
  };

  // Run fetchProducts when search or filters change (with debouncing for human input feel)
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchProducts();
    }, 450);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm, selectedCategory]);

  // Dashboard Stats Calculations
  const totalProducts = products.length;
  const totalValue = products.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const outOfStockCount = products.filter(item => item.quantity === 0).length;

  // Categories list for dropdown selection
  const categoriesList = ['All', 'Electronics', 'Clothing', 'Home', 'Books', 'Other'];

  return (
    <div className="app-container">
      {/* Header Bar */}
      <header className="navbar">
        <div className="logo">
          📦 <span>StockFlow</span>
        </div>
        <button 
          onClick={() => setLightTheme(!lightTheme)} 
          className="theme-toggle-btn"
          title={lightTheme ? 'Toggle Dark Mode' : 'Toggle Light Mode'}
        >
          {lightTheme ? '🌙' : '☀️'}
        </button>
      </header>

      {/* Overview Stat Cards */}
      <section className="metrics-container">
        <div className="metric-card">
          <div className="metric-info">
            <h3>Total Products</h3>
            <p>{loading ? '...' : totalProducts}</p>
          </div>
          <div className="metric-icon">📦</div>
        </div>
        <div className="metric-card">
          <div className="metric-info">
            <h3>Inventory Value</h3>
            <p>{loading ? '...' : `$${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}</p>
          </div>
          <div className="metric-icon">💰</div>
        </div>
        <div className="metric-card">
          <div className="metric-info">
            <h3>Out of Stock</h3>
            <p style={{ color: outOfStockCount > 0 ? 'var(--danger)' : 'var(--success)' }}>
              {loading ? '...' : outOfStockCount}
            </p>
          </div>
          <div className="metric-icon">⚠️</div>
        </div>
      </section>

      {/* Action and Filter Controls */}
      <section className="toolbar">
        <div className="search-filter-group">
          <div className="search-input-wrapper">
            <span className="search-icon">🔍</span>
            <input 
              type="text" 
              placeholder="Search products by name..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          
          <select 
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="category-select"
          >
            {categoriesList.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        
        <button className="btn btn-primary">
          ➕ Add Product
        </button>
      </section>

      {/* Grid displaying the products */}
      {loading ? (
        <div className="product-grid">
          {[1, 2, 3, 4].map(idx => (
            <div key={idx} className="skeleton-card pulse">
              <div className="skeleton-image"></div>
              <div className="skeleton-text"></div>
              <div className="skeleton-text-sub"></div>
              <div className="skeleton-footer">
                <div className="skeleton-price"></div>
                <div className="skeleton-btn"></div>
              </div>
            </div>
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">🔍</div>
          <h3 className="empty-state-title">No products found</h3>
          <p className="empty-state-desc">Try matching another search term or click "Add Product" to create one.</p>
        </div>
      ) : (
        <div className="product-grid">
          {products.map(product => (
            <div key={product._id} className="product-card">
              <div className="product-image-container">
                <img 
                  src={product.imageUrl} 
                  alt={product.name} 
                  className="product-image"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop';
                  }}
                />
                <span className="product-category-badge">{product.category}</span>
              </div>
              
              <div className="product-details">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-desc">{product.description || 'No description provided.'}</p>
                
                <div className="product-meta">
                  <span className="product-price">${Number(product.price).toFixed(2)}</span>
                  <span className={`product-stock ${product.quantity > 0 ? 'stock-in' : 'stock-out'}`}>
                    {product.quantity > 0 ? `${product.quantity} in stock` : 'Out of Stock'}
                  </span>
                </div>
                
                <div className="product-actions">
                  <button className="action-btn action-btn-edit">
                    ✏️ Edit
                  </button>
                  <button className="action-btn action-btn-delete">
                    🗑️ Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
