const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // Liên kết với User (Khách hàng)
    required: true
  },
  totalAmount: {
    type: Number,
    required: true
  },
  status: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Status',  // Liên kết với Status model
    required: true
  },
  orderDetails: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',  // Liên kết với Product
      required: true
    },
    quantity: {
      type: Number,
      required: true
    },
    price: {
      type: Number,
      required: true
    }
  }],
  paymentMethod: {
    type: String,
    required: true
  },
  shippingAddress: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true // Tự động thêm createdAt và updatedAt
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
