const mongoose = require('mongoose');
const connection = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/Book_Api', 
      
    );
    console.log("Connected to the database successfully!");
  } catch (error) {
    console.error("Database connection failed, retrying...");
  }
};

module.exports = { connection };
