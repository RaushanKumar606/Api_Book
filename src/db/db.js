const mongoose = require('mongoose');
const connection = async () => {
  try {
    await mongoose.connect(process.env.MOGOO_URI, 
      
    );
    console.log("Connected to the database successfully!");
  } catch (error) {
    console.error("Database connection failed, retrying...");
  }
};

module.exports = { connection };
