const express = require('express');
const Category = require('../../models/category'); // Import model Category
const Status = require('../../models/status'); // Import model Status
const router = express.Router();

// Tạo mới Category
router.post('/', async (req, res) => {
  try {
    const { name, description, status } = req.body;
    const newCategory = new Category({ name, description, status }); // Đảm bảo status cũng được truyền vào
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (err) {
    console.error(err); // Log lỗi ra console để dễ dàng debug
    res.status(500).json({ message: 'Lỗi khi tạo category', error: err.message });
  }
});

// Lấy tất cả Category
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find().populate('status'); // Populating để lấy thông tin status
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi lấy danh sách category', error: err.message });
  }
});

// Lấy Category theo ID
router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findById(req.params.id).populate('status');
    if (!category) {
      return res.status(404).json({ message: 'Không tìm thấy category' });
    }
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi lấy thông tin category', error: err.message });
  }
});

// Cập nhật Category
router.put('/:id', async (req, res) => {
  try {
    const { name, description, status } = req.body;

    // Kiểm tra trạng thái có tồn tại không
    if (status) {
      const foundStatus = await Status.findById(status);
      if (!foundStatus) {
        return res.status(404).json({ message: 'Trạng thái không tồn tại' });
      }
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      { name, description, status },
      { new: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ message: 'Không tìm thấy category' });
    }

    res.status(200).json(updatedCategory);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi cập nhật category', error: err.message });
  }
});

// Xóa Category
router.delete('/:id', async (req, res) => {
  try {
    const deletedCategory = await Category.findByIdAndDelete(req.params.id);
    if (!deletedCategory) {
      return res.status(404).json({ message: 'Không tìm thấy category' });
    }
    res.status(200).json({ message: 'Xóa category thành công' });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi xóa category', error: err.message });
  }
});

module.exports = router;
