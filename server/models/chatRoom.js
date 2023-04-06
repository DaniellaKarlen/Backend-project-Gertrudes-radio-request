import mongoose from "mongoose";

const chatRoomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "must be a name"],
    trim: true,
  },
  description: {
    type: String,
  },
  members: {
    type: Array,
  },
});

const ChatRoom = mongoose.model("ChatRoom", chatRoomSchema);

// const aPost = new ChatMessage({ name: "William", message: "Hi" });

// aPost.messages.push({ name: "Daniella", message: "Hej på dig" });

// aPost.save((err, data) => {});

export default ChatRoom;
