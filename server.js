const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db'); // Kết nối MongoDB
const apiRoutes = require('./api/api'); // Các route API
const imageRoutes = require('./routes/upload'); // Route upload ảnh
const authRoutes = require('./routes/auth'); // Route xác thực (auth)
const app = express();

// Load environment variables
dotenv.config();

// Kết nối tới MongoDB
connectDB();

// Middleware
app.use(cors()); // Cho phép CORS
app.use(express.json()); // Đọc JSON từ request body

// Routes
app.use('/api', apiRoutes);
app.use('/upload', imageRoutes);
app.use('/auth', authRoutes);

// Middleware xử lý lỗi
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Lỗi máy chủ', error: err.message });
});

module.exports = app;
