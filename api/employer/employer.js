const express = require('express');
const Employer = require('../../models/employer'); // Import model Employer
const router = express.Router();

// Tạo mới Employer
router.post('/', async (req, res) => {
  try {
    const { fullname, phone, email, username, password } = req.body;
    const newEmployer = new Employer({ fullname, phone, email, username, password });
    await newEmployer.save();
    res.status(201).json(newEmployer);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi tạo employer', error: err.message });
  }
});

// Lấy tất cả Employer
router.get('/', async (req, res) => {
  try {
    const employers = await Employer.find();
    res.status(200).json(employers);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi lấy danh sách employer', error: err.message });
  }
});

// Lấy Employer theo ID
router.get('/:id', async (req, res) => {
  try {
    const employer = await Employer.findById(req.params.id);
    if (!employer) {
      return res.status(404).json({ message: 'Không tìm thấy employer' });
    }
    res.status(200).json(employer);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi lấy thông tin employer', error: err.message });
  }
});

// Cập nhật Employer
router.put('/:id', async (req, res) => {
  try {
    const { fullname, phone, email, username, password } = req.body;
    const updatedEmployer = await Employer.findByIdAndUpdate(
      req.params.id,
      { fullname, phone, email, username, password },
      { new: true }
    );
    if (!updatedEmployer) {
      return res.status(404).json({ message: 'Không tìm thấy employer' });
    }
    res.status(200).json(updatedEmployer);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi cập nhật employer', error: err.message });
  }
});

// Xóa Employer
router.delete('/:id', async (req, res) => {
  try {
    const deletedEmployer = await Employer.findByIdAndDelete(req.params.id);
    if (!deletedEmployer) {
      return res.status(404).json({ message: 'Không tìm thấy employer' });
    }
    res.status(200).json({ message: 'Xóa employer thành công' });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi xóa employer', error: err.message });
  }
});

module.exports = router;
