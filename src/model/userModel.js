const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, lowercase: true },
  email: { type: String, required: true, lowercase: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String }
});

const User = mongoose.model('User', userSchema);
module.exports = User;  
