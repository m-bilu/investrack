import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

const connectDB = async () => {
  try {
    if (!MONGODB_URI)
      throw new Error('Please define the MONGODB_URI environment variable');
    await mongoose.connect(MONGODB_URI);
  } catch (error) {
    console.error(error);
  }
};

export default connectDB;
