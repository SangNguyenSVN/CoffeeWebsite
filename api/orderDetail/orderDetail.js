const express = require('express');
const OrderDetail = require('../../models/orderDetail'); // Import model OrderDetail
const router = express.Router();
const authMiddleware = require('../../middlewares/auth'); // Import middleware auth

// API Lưu chi tiết đơn hàng
router.post('/save', authMiddleware, async (req, res) => {
  try {
    const { order, status } = req.body;

    // Tạo chi tiết đơn hàng
    const newOrderDetail = new OrderDetail({
      order,   // ID của đơn hàng
      status   // ID trạng thái
    });

    // Lưu chi tiết đơn hàng
    await newOrderDetail.save();
    res.status(201).json(newOrderDetail);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi lưu chi tiết đơn hàng', error: error.message });
  }
});
module.exports = router;
