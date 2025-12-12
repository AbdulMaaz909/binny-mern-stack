import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.Mongo_URI);
    console.log("Mongodb Connection sucessfully!");
  } catch (error) {
    console.error("MongoDB connection failed!: ", error.message);
    console.exit(1);
  }
};

export default connectDB;
