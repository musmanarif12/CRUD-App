import React from 'react';

// Metrics Component: Renders the cards showing overall stats
const Metrics = ({ products, loading }) => {
  // Statistics Calculations
  const totalProducts = products.length;
  const totalValue = products.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const outOfStockCount = products.filter(item => item.quantity === 0).length;

  return (
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
  );
};

export default Metrics;
