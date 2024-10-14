const express = require('express');
const Payment = require('../../models/payment'); // Import model Payment
const authMiddleware = require('../../middlewares/auth'); // Import middleware xác thực
const router = express.Router();

router.post('/', authMiddleware, async (req, res) => { // Thêm middleware ở đây
  try {
    console.log('Received request body:', req.body); // Ghi log yêu cầu
    const token = req.header('Authorization')?.replace('Bearer ', ''); // Lấy token từ header
    console.log('Token:', token); // Ghi log token

    const { date, method, amountPaid, status } = req.body;

    // Kiểm tra xem status có tồn tại trong request không
    if (!status) {
      return res.status(400).json({ message: 'Trường status là bắt buộc' });
    }

    const newPayment = new Payment({ date, method, amountPaid, status });
    await newPayment.save();
    res.status(201).json(newPayment);
  } catch (err) {
    console.error('Error creating payment:', err); // Ghi log lỗi
    res.status(500).json({ message: 'Lỗi khi tạo thanh toán', error: err.message });
  }
});

// Lấy tất cả thanh toán
router.get('/', authMiddleware, async (req, res) => { // Thêm middleware ở đây
  try {
    const payments = await Payment.find();
    res.status(200).json(payments); // Trả về thanh toán
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi lấy danh sách thanh toán', error: err.message });
  }
});

module.exports = router;
