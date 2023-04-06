import mongoose from "mongoose";
import * as env from "dotenv";
env.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("connected to Mongo atlas");
  } catch (error) {
    console.log("Failed to connect to Mongo atlas", error);
  }
};

export default connectDB;
