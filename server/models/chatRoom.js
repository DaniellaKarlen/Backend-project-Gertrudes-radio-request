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
  message: {
    type: Array,
  },
});

const ChatRoom = mongoose.model("ChatRoom", chatRoomSchema);

export async function createChatroom(req, res) {
  const name = req.body;

  // const chatRoomExists = await ChatRoom.findOne(name);

  // if (chatRoomExists) throw "Chatroom alredy exists";

  const newChatRoom = new ChatRoom(name);
  await newChatRoom.save();

  res.json({ message: "New chatroom added" });
}
export async function allChatrooms(req, res) {
  const chatrooms = await ChatRoom.find({});
  res.json(chatrooms);
}

export default ChatRoom;
