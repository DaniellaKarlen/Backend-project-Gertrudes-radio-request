import mongoose from "mongoose";
import User from "./user.js";

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
    type: [String],
    required: true,
  },
  message: {
    type: Array,
  },
});

//middleware "pre-save hook"
chatRoomSchema.pre("save", async function (next) {
  const memberIds = await User.find({
    username: { $in: this.members },
  }).distinct("username");
  this.members = memberIds;
  next();
});

const ChatRoom = mongoose.model("ChatRoom", chatRoomSchema);

export async function createChatroom(req, res) {
  const { name, description, members } = req.body;
  const newChatRoom = new ChatRoom({
    name,
    description,
    members,
  });
  await newChatRoom.save();

  res.json({ message: "New chatroom added" });
}

export async function allChatrooms(req, res) {
  const chatrooms = await ChatRoom.find({});
  res.json(chatrooms);
}

export default ChatRoom;
