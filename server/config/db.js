const mongoose = require('mongoose');

// Function to connect to MongoDB Database
const connectDB = async () => {
    try {
        // Connect to MongoDB using the URI from environment variables
        const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/crud_app');
        console.log(`MongoDB Connected successfully to host: ${conn.connection.host}`);
    } catch (error) {
        console.error(`MongoDB connection failed: ${error.message}`);
        // Exit application if database connection fails
        process.exit(1);
    }
};

module.exports = connectDB;
