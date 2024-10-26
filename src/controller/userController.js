const Contact = require('../model/contactModel');
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


    const hashPassword = await bcrypt.hash(password, 10)
    const newUser = new User({ username, email, phone, password: hashPassword });
    await newUser.save();
    res.status(200).json({ mes: "User successfully registered",
      token: await newUser.generateToken(),
      userid: newUser._id.toString(),
     });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};


// *------------------------------
// *   User LOGIN Logic
// *------------------------------
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExist = await User.findOne({ email });

    console.log("User Found:", userExist); // Log user found
    console.log("Provided Password:", password); // Log the provided password

    if (!userExist) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const isPassword = await userExist.comparePassword(password.trim());
    console.log("Password Match:", isPassword);

    if (isPassword) {
      return res.status(200).json({
        message: "Login Successful",
        token: await userExist.generateToken(),
        userid: userExist._id.toString(),
      });
    } else {
      return res.status(401).json({ message: "Unauthorized user" });
    }
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// *------------------------------
// *   User contact  Logic
// *------------------------------

const contact = async (req, res) => {
  const { username, email, phone, comment } = req.body;
  try {
    if (!username || !email || !phone || !comment) {
      return res.status(401).json({ mes: "All field are require " })
    }

    const newcontact = new Contact({ username, email, phone, comment });
    await newcontact.save();
    res.status(200).json({ mes: "User successfully add to comment " });


  } catch (error) {
    console.error(error);
    res.status(500).send({ msg: "Server error" });
  }

}

module.exports = { home, userRegister, loginUser, contact }; 
