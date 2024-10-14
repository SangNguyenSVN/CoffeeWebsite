const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  status: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Status',  // Trạng thái của danh mục (hoạt động, bị ẩn)
    required: true
  }
}, {
  timestamps: true
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
