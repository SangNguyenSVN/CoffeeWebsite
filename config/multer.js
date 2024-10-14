// config/upload.js
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const cloudinary = require('./cloudinary');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'coffeeshop', // Tên thư mục trên Cloudinary
    allowed_formats: ['jpg', 'png', 'jpeg'], // Các định dạng cho phép
  },
});

const upload = multer({ storage });

module.exports = upload;
