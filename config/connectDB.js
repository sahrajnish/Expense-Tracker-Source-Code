const mongoose = require("mongoose");

const connectDB = async (fileName) => {
    try {
        await mongoose.connect(fileName);
        console.log(`Mongo DB connection successful: ${mongoose.connection.host}`)
    } catch (error) {
        console.log(`MongoDB connection failed: ${error}`)
    }
}

module.exports = {
    connectDB
}