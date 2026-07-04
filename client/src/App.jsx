import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ProductCard from './components/ProductCard';
import ProductModal from './components/ProductModal';
import Toast from './components/Toast';

function App() {
  // State for products list and loading indicator
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // State for filtering products
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // App Theme state
  const [lightTheme, setLightTheme] = useState(false);

  // Modal State for Add/Edit Product
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editProductId, setEditProductId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: 'Electronics',
    quantity: '',
    imageUrl: '',
    description: ''
  });

  // Toasts Notification State
  const [toasts, setToasts] = useState([]);

  const API_URL = 'http://localhost:5000/api/products';

  // Side-effect to toggle theme classes on the body element
  useEffect(() => {
    if (lightTheme) {
      document.body.classList.add('light-theme');
    } else {
      document.body.classList.remove('light-theme');
    }
  }, [lightTheme]);

  // Toast Helper to show notifications
  const triggerToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts((prevToasts) => [...prevToasts, { id, message, type }]);

    setTimeout(() => {
      setToasts((prevToasts) => prevToasts.filter(t => t.id !== id));
    }, 3500);
  };

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
      triggerToast('Failed to load products from server', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Run fetchProducts when search or filters change
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchProducts();
    }, 450);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm, selectedCategory]);

  // Handle input changes inside the Form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Open modal with empty form for adding a new product
  const openAddModal = () => {
    setEditProductId(null);
    setFormData({
      name: '',
      price: '',
      category: 'Electronics',
      quantity: '',
      imageUrl: '',
      description: ''
    });
    setIsModalOpen(true);
  };

  // Open modal with pre-filled form for editing an existing product
  const openEditModal = (product) => {
    setEditProductId(product._id);
    setFormData({
      name: product.name,
      price: product.price,
      category: product.category,
      quantity: product.quantity,
      imageUrl: product.imageUrl || '',
      description: product.description || ''
    });
    setIsModalOpen(true);
  };

  // Form submission handler to create or update product
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.price || !formData.category) {
      triggerToast('Required fields are missing', 'error');
      return;
    }

    if (Number(formData.price) < 0 || Number(formData.quantity) < 0) {
      triggerToast('Price and Quantity cannot be negative', 'error');
      return;
    }

    try {
      const payload = {
        ...formData,
        price: Number(formData.price),
        quantity: formData.quantity ? Number(formData.quantity) : 0
      };

      if (!payload.imageUrl.trim()) {
        delete payload.imageUrl;
      }

      const isEditing = editProductId !== null;
      const url = isEditing ? `${API_URL}/${editProductId}` : API_URL;
      const method = isEditing ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to save product');
      }

      triggerToast(isEditing ? 'Product updated successfully!' : 'Product added successfully!');
      setIsModalOpen(false);
      fetchProducts();
    } catch (err) {
      console.error('Error saving product:', err.message);
      triggerToast(err.message || 'Failed to save product', 'error');
    }
  };

  // Delete product handler
  const handleDeleteProduct = async (id, name) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete "${name}"?`);
    if (!confirmDelete) return;

    try {
      const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });

      if (!response.ok) {
        throw new Error('Failed to delete product');
      }

      triggerToast('Product deleted successfully!');
      fetchProducts();
    } catch (err) {
      console.error('Error deleting product:', err.message);
      triggerToast(err.message || 'Failed to delete product', 'error');
    }
  };

  // Dashboard Stats Calculations
  const totalProducts = products.length;
  const totalValue = products.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const outOfStockCount = products.filter(item => item.quantity === 0).length;

  // Categories list for filter dropdown
  const categoriesList = ['All', 'Electronics', 'Clothing', 'Home', 'Books', 'Other'];

  return (
    <div className="app-container">
      {/* Toast Notifications Component */}
      <Toast toasts={toasts} />

      {/* Navbar Component */}
      <Navbar lightTheme={lightTheme} setLightTheme={setLightTheme} />

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

        <button onClick={openAddModal} className="btn btn-primary">
          ➕ Add Product
        </button>
      </section>

      {/* Product Grid Section */}
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
            <ProductCard
              key={product._id}
              product={product}
              onEdit={openEditModal}
              onDelete={handleDeleteProduct}
            />
          ))}
        </div>
      )}

      {/* Product Modal Component */}
      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        formData={formData}
        onChange={handleInputChange}
        onSubmit={handleFormSubmit}
        isEditing={editProductId !== null}
      />
    </div>
  );
}

export default App;
