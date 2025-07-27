import mongoose from "mongoose";
import dotenv from "dotenv";

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/blog-app`);
    console.log(`Server running on ${mongoose.connection.host}`);
  } catch (error) {
    console.log(error);
  }
};

export { connectDB };
