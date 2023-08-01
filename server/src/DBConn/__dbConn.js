const mongoose = require("mongoose");
require("dotenv").config(); // Load environment variables from .env file

const DBConn = async () => {
    try {
        // Access the MongoDB connection string from the environment variables
        const uri = process.env.MONGODB_URI;
        
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log("Database Connected Successfully!!!");
    } catch (error) {
        console.error("Database Connection Failed:", error.message);
    }
}

DBConn();
