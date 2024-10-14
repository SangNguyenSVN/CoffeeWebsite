const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Tạo schema cho Employer
const employerSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'employer' } // Phân quyền, mặc định là 'employer'
});

// Mã hóa mật khẩu trước khi lưu
employerSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Phương thức xác thực mật khẩu
employerSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Tạo phương thức để kiểm tra quyền
employerSchema.methods.isEmployer = function () {
  return this.role === 'employer';
};

module.exports = mongoose.model('Employer', employerSchema);
