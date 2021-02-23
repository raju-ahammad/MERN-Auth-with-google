const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: 'dlywsncdd',
    api_key: 257885713371326,
    api_secret: '6WyXWbg4IxXChwi1W5OX9ODNURk'
});

module.exports = cloudinary;