// controllers/authController.js
const User = require('../models/user');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Đăng ký người dùng
exports.registerUser = async (req, res) => {
    const { fullname, phone, email, username, password, role } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email đã tồn tại' });
        }

        const newUser = new User({ fullname, phone, email, username, password, role });
        await newUser.save();

        res.status(201).json({
            message: 'Người dùng đã được tạo thành công',
            user: {
                id: newUser._id,
                fullname: newUser.fullname,
                email: newUser.email,
                role: newUser.role,
                createdAt: newUser.createdAt,
            }
        });
    } catch (err) {
        res.status(500).json({ message: 'Lỗi khi tạo người dùng', error: err.message });
    }
};

// Đăng nhập người dùng
exports.loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(401).json({ message: 'Người dùng không tồn tại', token: null });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Mật khẩu không chính xác', token: null });
        }

        // Tạo token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Trả về thông tin người dùng và token
        res.status(200).json({
            message: 'Đăng nhập thành công',
            token,
            user: {
                id: user._id,
                fullname: user.fullname,
                email: user.email,
                role: user.role,
            }
        });
    } catch (err) {
        res.status(500).json({ message: 'Lỗi khi đăng nhập', error: err.message });
    }
};
