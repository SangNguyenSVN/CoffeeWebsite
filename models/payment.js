const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  method: {
    type: String,  // Phương thức thanh toán
    required: true,
  },
  amountPaid: {
    type: Number,
    required: true,
  },
  status: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Status',  
    required: true
  }
}, {
  timestamps: true,
});

const Payment = mongoose.model('Payment', paymentSchema);
module.exports = Payment;
