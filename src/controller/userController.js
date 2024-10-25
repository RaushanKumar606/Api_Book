const User = require('../model/userModel'); 
const bcrypt = require('bcrypt');

// *------------------------------
// *   Home Logic
// *------------------------------
const home = async (req, res) => {
  try {
    res.status(200).send("Welcome to home page");
  } catch (error) {
    console.error(error);
    res.status(404).send({ msg: "Page Not Found" });
  }
};

// *------------------------------
// *   User Register Logic
// *------------------------------

const userRegister = async (req, res, next) => { // Corrected function name
  const { username, email, phone, password } = req.body;

  try {
    if (!username || !email || !phone || !password) {
      return res.status(401).json({ mes: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(401).send({ message: "User with given email already exists" });
    }
  const hashPassword = await bcrypt.hash(password,10)
    const newUser = new User({ username, email, phone, password:hashPassword });
    await newUser.save();
    res.status(200).json({ mes: "User successfully registered" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};


// *------------------------------
// *   User Register Logic
// *------------------------------

const loginUser = async(req,res)=>{
  const {email ,password}=req.body;
  try {
    const user =  await User.findOne({email});
    if(!user){
     return res.status(400).json({mes:"user is not found"});
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).send({ msg: "Invalid credentials" });
    }
    
    res.status(200).send({ msg: "Login successful" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ msg: "Server error" });
  }
}

module.exports = { home, userRegister ,loginUser}; 
