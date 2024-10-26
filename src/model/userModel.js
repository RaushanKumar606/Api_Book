const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, lowercase: true },
  email: { type: String, required: true, lowercase: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String },
  iaAdmin: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });


//  token genrate 
userSchema.methods.generateToken = async function () {
  try {
    return jwt.sign(
      {
        _id: this._id,
        email: this.email,
        isAdmin: this.iaAdmin,
      },
      process.env.SECRET_JWT,
      {
        expiresIn: "1d",
      }
    );
  } catch (error) {
    console.log(error);

  }

}

userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) {
    nexr();
  }
  try {
    const saltPass = await bcrypt.genSalt(10);
    const hash_pass = await bcrypt.hash(user.password, saltPass);
    user.password = hash_pass;
  
  } catch (error) {
    next(error);
  }
});

// * compare the user password and exist password
userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};


const User = mongoose.model('User', userSchema);
module.exports = User;  
