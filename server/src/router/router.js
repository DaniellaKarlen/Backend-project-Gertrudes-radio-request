import express from "express";
import ChatRoom from "../../models/chatRoom.js";
import ChatMessage from "../../models/chatmessage.js";
import Broadcast from "../../models/broadcast.js";
import adminToken from "../authentication/authentication.js";
const router = express.Router();

// fetch all channels
router.get("/channel", async (req, res) => {
  try {
    const channel = await ChatRoom.find({}); // find({}) <-- tomt betyder alla produkter
    res.status(200).json(channel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// fetch channel by ID
router.get("/channel/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const channel = await ChatRoom.findById(id);
    res.status(200).json(channel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create channel
router.put("/channel", async (req, res) => {
  try {
    const channel = await ChatRoom.create(req.body);
    res.status(200).json(channel);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

// Create new message
// router.post("/channel/:id", async (req, res) => {
//   try {
//     const message = await ChatMessage.create(req.body);
//     res.status(200).json(message);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
// }
// });

// Delete channel by ID
router.delete("/channel/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const channel = await ChatRoom.findByIdAndDelete(id);
    if (!channel) {
      return res.status(404).json({ message: "cannot find channel" });
    }
    res.status(200).json(channel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Fetch emergency broadcast
router.get("/broadcast", async (req, res) => {
  try {
    const channel = await Broadcast.find({});
    res.status(200).json(channel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create emergency broadcast (admin only)
router.post("/broadcast", async (req, res) => {
  if (!adminToken) {
    res.status(403);
  } else {
    try {
      const channel = await Broadcast.create(req.body);
      res.status(200).json(channel);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
  }
});

export default router;
