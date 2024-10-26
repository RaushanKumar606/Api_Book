const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Authorization is required" });
  }
  const parsedToken = token.split(' ')[1];

  try {
  
    const decoded = jwt.verify(parsedToken, process.env.SECRET_JWT);
    req.user = decoded;
    // console.log("userid:", req.user._id);
    next(); 
  } catch (error) {
    console.error('Token verification error:', error);
    res.status(403).json({ message: "Invalid or expired token" });
  }
};

module.exports = auth;
