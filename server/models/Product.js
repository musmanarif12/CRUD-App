const mongoose = require('mongoose');

// Define the Product schema structure
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Product name is required'],
        trim: true
    },
    price: {
        type: Number,
        required: [true, 'Product price is required'],
        min: [0, 'Price cannot be negative']
    },
    description: {
        type: String,
        trim: true
    },
    category: {
        type: String,
        required: [true, 'Product category is required'],
        trim: true
    },
    quantity: {
        type: Number,
        required: [true, 'Product quantity is required'],
        min: [0, 'Quantity cannot be negative'],
        default: 0
    },
    imageUrl: {
        type: String,
        default: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop' // default product placeholder image
    }
}, {
    timestamps: true // Automatically creates 'createdAt' and 'updatedAt' fields
});

// Compile the schema into a Mongoose Model
const Product = mongoose.model('Product', productSchema);

// Export the model so it can be used in controllers
module.exports = Product;
