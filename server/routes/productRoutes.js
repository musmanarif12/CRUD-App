const express = require('express');
const router = express.Router();
const {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
} = require('../controllers/productController');

// Map URL routes to controller handler functions
// GET /api/products -> Fetch all products
// POST /api/products -> Create a product
router.get('/', getProducts);
router.post('/', createProduct);

// GET /api/products/:id -> Fetch single product details
// PUT /api/products/:id -> Update a product
// DELETE /api/products/:id -> Delete a product
router.get('/:id', getProductById);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;
