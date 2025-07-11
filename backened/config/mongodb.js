import mongoose from "mongoose";

const connectDB = async () => {
  console.log("🔍 MongoDB URI:", process.env.MONGODB_URI);  // Add this line

  mongoose.connection.on("connected", () => {
    console.log("✅ DB Connected");
  });

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      
    });
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
  }
};

export default connectDB;
