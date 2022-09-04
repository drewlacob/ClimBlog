require('dotenv').config();
const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME || process.env.REACT_APP_CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY || process.env.REACT_APP_CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET || process.env.REACT_APP_CLOUDINARY_API_SECRET,
});

module.exports = { cloudinary };