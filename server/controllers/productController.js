const Product = require('../models/Product');

// 1. GET all products (with optional search and category filters)
const getProducts = async (req, res) => {
    try {
        const { search, category } = req.query;
        let queryObj = {};

        // If search term is provided, filter by product name (case-insensitive)
        if (search) {
            queryObj.name = { $regex: search, $options: 'i' };
        }

        // If category is provided and is not 'All', filter by category
        if (category && category !== 'All') {
            queryObj.category = category;
        }

        // Fetch products and sort by newest first
        const products = await Product.find(queryObj).sort({ createdAt: -1 });
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Server error: failed to fetch products', error: error.message });
    }
};

// 2. GET a single product details by ID
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        
        // Check if product exists
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Server error: failed to fetch product details', error: error.message });
    }
};

// 3. CREATE a new product
const createProduct = async (req, res) => {
    try {
        const { name, price, description, category, quantity, imageUrl } = req.body;

        // Simple validation checks
        if (!name || !price || !category) {
            return res.status(400).json({ message: 'Please enter all required fields: name, price, and category' });
        }

        // Create new product instance
        const newProduct = new Product({
            name,
            price,
            description,
            category,
            quantity: quantity || 0,
            imageUrl
        });

        // Save to Database
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(400).json({ message: 'Failed to create product', error: error.message });
    }
};

// 4. UPDATE a product by ID
const updateProduct = async (req, res) => {
    try {
        const { name, price, description, category, quantity, imageUrl } = req.body;

        // Find the product in the database first
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Update fields if they were provided in the request body
        product.name = name || product.name;
        product.price = price !== undefined ? price : product.price;
        product.description = description !== undefined ? description : product.description;
        product.category = category || product.category;
        product.quantity = quantity !== undefined ? quantity : product.quantity;
        if (imageUrl) {
            product.imageUrl = imageUrl;
        }

        // Save updated product
        const updatedProduct = await product.save();
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(400).json({ message: 'Failed to update product details', error: error.message });
    }
};

// 5. DELETE a product by ID
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Remove the product from the database
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete product', error: error.message });
    }
};

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};
