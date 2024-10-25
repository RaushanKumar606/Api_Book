const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { 
    type: String, 
    required: true,
    lowercase: true,
  },
  email: {
    type: String, 
    required: true,
    lowercase: true,
    unique: true,
    match: /.+\@.+\..+/  // Regex pattern to validate email format
  },
  phone: {
    type: String,  // Using String to accommodate different phone number formats
  },
  class: {
    type: String, 
  },
  date: { type: Date, default: Date.now },
  buff: Buffer
}, { timestamps: true }); 
module.exports = mongoose.model('User', userSchema);
