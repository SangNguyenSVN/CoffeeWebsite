const mongoose = require('mongoose');
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log('MongoDB connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1); // Exit process with failure
  }
};
module.exports = connectDB;
