const cloudinary = require('cloudinary').v2;
const path = require('path');

cloudinary.config({
    cloud_name: process.env.CLOU_NAME,
    api_key: process.env.CLOU_API_KEY,
    api_secret: process.env.CLOU_SECRIT_KEY
  });


module.exports = {cloudinary}
 