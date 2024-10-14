

const mongoose = require('mongoose');

const statusSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true 
  },
}, {
  timestamps: true // Tự động thêm các trường createdAt và updatedAt
});

const Status = mongoose.model('Status', statusSchema);

module.exports = Status;
