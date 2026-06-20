const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL_CLOUD);
    console.log(`Connected to MongoDB ${mongoose.connection.host}`);
  } catch (error) {
    console.log(`MongoDB error ${error}`);
  }
};

module.exports = connectDB;
