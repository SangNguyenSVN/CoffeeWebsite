const mongoose = require('mongoose');
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected... http://localhost:3000/');
  } catch (err) {
    console.error(err.message);
    process.exit(1); // Exit process with failure
  }
};
module.exports = connectDB;
