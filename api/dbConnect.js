const mongoose = require("mongoose");

const uri = process.env.DATABASE_URI;

const connectToDB = async () => {
    try {
        await mongoose.connect(uri);
        console.log("Successfully connected to database");
    } catch (e) {
        throw new Error(e);
    }
};

module.exports = connectToDB;