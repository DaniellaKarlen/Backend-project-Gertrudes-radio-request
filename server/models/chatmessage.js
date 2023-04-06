import mongoose from "mongoose";

const chatmessageSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  message: {
    type: String,
  },
});

const ChatMessage = mongoose.model("ChatMessage", chatmessageSchema);

export default ChatMessage;
