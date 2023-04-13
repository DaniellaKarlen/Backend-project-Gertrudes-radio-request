import express from "express";
import ChatRoom from "../../models/chatRoom.js";
import ChatMessage from "../../models/chatmessage.js";
import Broadcast from "../../models/broadcast.js";
import { isAdmin } from "../middleware/adminCheck.js";
import { login } from "../middleware/loginCheck.js";
const router = express.Router();

// fetch all channels
router.get("/channel", login, async (req, res) => {
  try {
    const channel = await ChatRoom.find({});
    res.status(200).json(channel);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

// fetch channel by ID
router.get("/channel/:id", login, async (req, res) => {
  try {
    const { id } = req.params;
    const channel = await ChatRoom.findById(id);
    res.status(200).json(channel);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

// Create channel
router.put("/channel", login, async (req, res) => {
  try {
    const channel = await ChatRoom.create(req.body);
    res.status(200).json(channel);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

// Create new message
router.post("/channel/:id", login, async (req, res) => {
  try {
    const { id } = req.params;
    const chatRoom = await ChatRoom.findById(id);
    if (!chatRoom) {
      return res.status(404).json({ message: "cannot find chatroom" });
    }

    const newMessage = new ChatMessage({
      name: req.user.username, // set name to logged in user's name
      message: req.body.message,
    });
    chatRoom.message.push(newMessage);
    await chatRoom.save();
    res
      .status(200)
      .json({ message: "New message was added to chatRoom " + id });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

// Delete channel by ID
router.delete("/channel/:id", login, async (req, res) => {
  try {
    const { id } = req.params;
    const channel = await ChatRoom.findByIdAndDelete(id);
    if (!channel) {
      return res.status(404).json({ message: "cannot find channel" });
    }
    res.status(200).json(channel);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

// Fetch emergency broadcast
router.get("/broadcast", login, async (req, res) => {
  try {
    const broadcast = await Broadcast.find({});
    res.status(200).json(broadcast);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

// Create emergency broadcast (admin only)
router.post("/broadcast", isAdmin, async (req, res) => {
  try {
    const broadcast = await Broadcast.create(req.body);
    res.status(200).json(broadcast);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

export default router;
