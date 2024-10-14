const express = require('express');
const Status = require('../../models/status'); // Import Model của Status
const router = express.Router();

// Đường dẫn để thêm trạng thái mới
router.post('/add', async (req, res) => {
  try {
    const { name } = req.body; // Destructure name từ req.body
    if (!name) {
      return res.status(400).json({ message: "Tên trạng thái là bắt buộc." });
    }
    const newStatus = new Status({ name });
    await newStatus.save();
    res.status(201).json(newStatus);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi tạo trạng thái', error: err.message });
  }
});
// Lấy tất cả trạng thái
router.get('/', async (req, res) => {
  try {
    const statuses = await Status.find();
    res.status(200).json(statuses);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi lấy trạng thái', error: err.message });
  }
});

// Lấy trạng thái theo ID
router.get('/:id', async (req, res) => {
  try {
    const status = await Status.findById(req.params.id);
    if (!status) {
      return res.status(404).json({ message: 'Không tìm thấy trạng thái' });
    }
    res.status(200).json(status);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi lấy trạng thái', error: err.message });
  }
});

// Cập nhật trạng thái
router.put('/:id', async (req, res) => {
  try {
    const { name, description } = req.body;
    const updatedStatus = await Status.findByIdAndUpdate(
      req.params.id,
      { name, description },
      { new: true }
    );
    if (!updatedStatus) {
      return res.status(404).json({ message: 'Không tìm thấy trạng thái' });
    }
    res.status(200).json(updatedStatus);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi cập nhật trạng thái', error: err.message });
  }
});

// Xóa trạng thái
router.delete('/:id', async (req, res) => {
  try {
    const deletedStatus = await Status.findByIdAndDelete(req.params.id);
    if (!deletedStatus) {
      return res.status(404).json({ message: 'Không tìm thấy trạng thái' });
    }
    res.status(200).json({ message: 'Xóa trạng thái thành công' });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi xóa trạng thái', error: err.message });
  }
});

module.exports = router;
