import mongoose from "mongoose";
import connectDB from "../mongoose/mongoose";

export function fetchAllChatRooms() {
  const db = mongoose.connection;
  const chatRooms = db.collection("chatRooms");
  return chatRooms.find().toArray();
}
