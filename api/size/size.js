const express = require('express');
const Size = require('../../models/size'); // Import model Size
const router = express.Router();

// Tạo mới Size
router.post('/add', async (req, res) => {
  const { name, priceAdjustment } = req.body; // Lấy tên và điều chỉnh giá từ request body

  try {
    const size = new Size({ name, priceAdjustment });
    await size.save();
    res.status(201).json({ message: 'Kích thước đã được tạo thành công', size });
  } catch (error) {
    if (error.code === 11000) { // Kiểm tra lỗi unique
      return res.status(400).json({ message: 'Kích thước đã tồn tại' });
    }
    console.error(error);
    res.status(500).json({ message: 'Lỗi khi tạo kích thước', error: error.message });
  }
});

// Lấy tất cả Size
router.get('/', async (req, res) => {
  try {
    const sizes = await Size.find();
    res.status(200).json(sizes);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi lấy danh sách size', error: err.message });
  }
});

// Lấy Size theo ID
router.get('/:id', async (req, res) => {
  try {
    const size = await Size.findById(req.params.id);
    if (!size) {
      return res.status(404).json({ message: 'Không tìm thấy size' });
    }
    res.status(200).json(size);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi lấy thông tin size', error: err.message });
  }
});

// Cập nhật Size
router.put('/:id', async (req, res) => {
  try {
    const { name, priceAdjustment } = req.body;
    const updatedSize = await Size.findByIdAndUpdate(
      req.params.id,
      { name, priceAdjustment },
      { new: true }
    );
    if (!updatedSize) {
      return res.status(404).json({ message: 'Không tìm thấy size' });
    }
    res.status(200).json(updatedSize);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi cập nhật size', error: err.message });
  }
});

// Xóa Size
router.delete('/:id', async (req, res) => {
  try {
    const deletedSize = await Size.findByIdAndDelete(req.params.id);
    if (!deletedSize) {
      return res.status(404).json({ message: 'Không tìm thấy size' });
    }
    res.status(200).json({ message: 'Xóa size thành công' });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi xóa size', error: err.message });
  }
});

module.exports = router;
