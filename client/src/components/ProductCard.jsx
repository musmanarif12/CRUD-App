function ProductCard({ product, onEdit, onDelete }) {
  return (
    <div className="product-card">
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
          <button onClick={() => onEdit(product)} className="action-btn action-btn-edit">
            ✏️ Edit
          </button>
          <button onClick={() => onDelete(product._id, product.name)} className="action-btn action-btn-delete">
            🗑️ Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
