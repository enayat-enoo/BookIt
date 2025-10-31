const mongoose = require("mongoose");

const connectDB = async (url) => {
    console.log(url);
    return await mongoose.connect(url);
};

module.exports = connectDB;