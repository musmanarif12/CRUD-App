function ProductModal({ isOpen, onClose, formData, onChange, onSubmit, isEditing }) {
  // Categories available in the form dropdown
  const formCategories = ['Electronics', 'Clothing', 'Home', 'Books', 'Other'];

  return (
    <div className={`modal-overlay ${isOpen ? 'active' : ''}`}>
      <div className="modal-content">
        <div className="modal-header">
          <h2 className="modal-title">{isEditing ? 'Edit Product' : 'Add New Product'}</h2>
          <button onClick={onClose} className="modal-close-btn">&times;</button>
        </div>

        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label className="form-label">Product Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={onChange}
              placeholder="e.g. Wireless Mouse"
              className="form-input"
              required
            />
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <div className="form-group" style={{ flex: 1 }}>
              <label className="form-label">Price ($) *</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={onChange}
                placeholder="0.00"
                step="0.01"
                min="0"
                className="form-input"
                required
              />
            </div>

            <div className="form-group" style={{ flex: 1 }}>
              <label className="form-label">Quantity *</label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={onChange}
                placeholder="0"
                min="0"
                className="form-input"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Category *</label>
            <select
              name="category"
              value={formData.category}
              onChange={onChange}
              className="form-input"
            >
              {formCategories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Image URL</label>
            <input
              type="url"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={onChange}
              placeholder="https://example.com/image.jpg"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={onChange}
              placeholder="Brief description of the product..."
              className="form-textarea"
            />
          </div>

          <div className="form-actions">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-secondary"
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {isEditing ? 'Update Product' : 'Save Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProductModal;
