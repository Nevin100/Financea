import mongoose from "mongoose";

const connectDB = async() => {
  const MONGO_URI = process.env.MONGODB_URI as string;

  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB Connection Error", error);
  }
}

export default connectDB;
