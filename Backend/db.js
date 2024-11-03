const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/mydatabase";

const connectToMongo = () => {
    mongoose.connect(mongoURI)
        .then(() => console.log("Connected to MongoDB successfully"))
        .catch((error) => console.error("MongoDB connection error:", error));
};

module.exports = connectToMongo;
