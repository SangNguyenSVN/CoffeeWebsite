const mongoose = require('mongoose');

const sizeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true, // Loại bỏ khoảng trắng thừa
    unique: true // Đảm bảo tên kích thước là duy nhất
  },
  priceAdjustment: {
    type: Number,
    required: true // Trường này bắt buộc
  }
}, {
  timestamps: true // Thêm timestamps cho các trường createdAt và updatedAt
});

const Size = mongoose.model('Size', sizeSchema);

module.exports = Size;
