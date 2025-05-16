const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Successfully connected to DB`);
  } catch (error) {
    console.log(`Error connecting to DB ${error}`);
  }
};

module.exports = connectDB;
