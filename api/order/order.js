const express = require('express');
const Order = require('../../models/order'); // Import model Order
const authMiddleware = require('../../middlewares/auth'); // Import middleware xác thực
const router = express.Router();

// Tạo mới đơn hàng
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { customer, totalAmount, status, orderDetails, paymentMethod, shippingAddress } = req.body;

    // Kiểm tra xem customer, totalAmount, status, orderDetails, paymentMethod và shippingAddress có tồn tại trong request không
    if (!customer || !totalAmount || !status || !orderDetails || !paymentMethod || !shippingAddress) {
      return res.status(400).json({ message: 'Tất cả các trường là bắt buộc' });
    }

    const newOrder = new Order({
      customer,
      totalAmount,
      status,
      orderDetails,
      paymentMethod,
      shippingAddress
    });

    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (err) {
    console.error('Error creating order:', err); // Ghi log lỗi
    res.status(500).json({ message: 'Lỗi khi tạo đơn hàng', error: err.message });
  }
});

// Lấy tất cả đơn hàng
router.get('/', authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find().populate('customer').populate('status').populate('orderDetails.product');
    res.status(200).json(orders); // Trả về danh sách đơn hàng
  } catch (err) {
    console.error('Error fetching orders:', err); // Ghi log lỗi
    res.status(500).json({ message: 'Lỗi khi lấy danh sách đơn hàng', error: err.message });
  }
});
// Cập nhật đơn hàng theo ID
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { customer, totalAmount, status, orderDetails, paymentMethod, shippingAddress } = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(id, {
      customer,
      totalAmount,
      status,
      orderDetails,
      paymentMethod,
      shippingAddress
    }, { new: true }); // new: true để trả về tài liệu đã cập nhật

    if (!updatedOrder) {
      return res.status(404).json({ message: 'Đơn hàng không tồn tại' });
    }

    res.status(200).json(updatedOrder);
  } catch (err) {
    console.error('Error updating order:', err); // Ghi log lỗi
    res.status(500).json({ message: 'Lỗi khi cập nhật đơn hàng', error: err.message });
  }
});

// Xóa đơn hàng theo ID
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    const deletedOrder = await Order.findByIdAndDelete(id);
    if (!deletedOrder) {
      return res.status(404).json({ message: 'Đơn hàng không tồn tại' });
    }

    res.status(204).json(); // Không trả về nội dung
  } catch (err) {
    console.error('Error deleting order:', err); // Ghi log lỗi
    res.status(500).json({ message: 'Lỗi khi xóa đơn hàng', error: err.message });
  }
});
module.exports = router;
