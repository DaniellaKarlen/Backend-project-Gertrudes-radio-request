import express from "express";
import ChatRoom from "../../models/chatRoom.js";
import ChatMessage from "../../models/chatmessage.js";
import Broadcast from "../../models/broadcast.js";
import jwt from "jsonwebtoken";
import User from "../../models/user.js";
const router = express.Router();

// fetch all channels
router.get("/channel", async (req, res) => {
  const authHeader = req.headers["authorization"];
  if (authHeader == undefined) {
    res.status(403); //bad request
    res.send("sign in required");
  } else {
    const token = authHeader.replace("Bearer ", "");
    try {
      jwt.verify(token, process.env.JWT_SIGN_KEY);
      // const decoded =
      // const username = decoded.username; // Ger en jwt token till det inloggade namnet och sparar det i en variabel
      // const role = decoded.role;

      // Do something with the username and role, e.g., retrieve user data from the database
      // const user = await User.findOne({ username });

      const channel = await ChatRoom.find({}); // find({}) <-- tomt betyder alla produkter
      res.status(200).json(channel);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
  }
});

// fetch channel by ID
router.get("/channel/:id", async (req, res) => {
  const authHeader = req.headers["authorization"];
  if (authHeader == undefined) {
    res.status(403); //bad request
    res.send("sign in required");
  } else {
    const token = authHeader.replace("Bearer ", "");
    try {
      jwt.verify(token, process.env.JWT_SIGN_KEY);
      const { id } = req.params;
      const channel = await ChatRoom.findById(id);
      res.status(200).json(channel);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
  }
});

// Create channel
router.put("/channel", async (req, res) => {
  const authHeader = req.headers["authorization"];
  if (authHeader == undefined) {
    res.status(403); //bad request
    res.send("sign in required");
  } else {
    const token = authHeader.replace("Bearer ", "");
    try {
      jwt.verify(token, process.env.JWT_SIGN_KEY);
      const channel = await ChatRoom.create(req.body);
      res.status(200).json(channel);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
  }
});

// Create new message
router.post("/channel/:id", async (req, res) => {
  const authHeader = req.headers["authorization"];
  if (authHeader == undefined) {
    res.status(403); //bad request
    res.send("sign in required");
  } else {
    const token = authHeader.replace("Bearer ", "");
    try {
      jwt.verify(token, process.env.JWT_SIGN_KEY);
      const { id } = req.params;
      const { name, message } = req.body;
      const chatRoom = await ChatRoom.findById(id);
      if (!chatRoom) {
        return res.status(404).json({ message: "cannot find chatroom" });
      }

      const newMessage = new ChatMessage({ name, message });
      chatRoom.message.push(newMessage);
      await chatRoom.save();
      res
        .status(200)
        .json({ message: "New message was added to chatRoom" + id });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
  }
});

// Delete channel by ID
router.delete("/channel/:id", async (req, res) => {
  const authHeader = req.headers["authorization"];
  if (authHeader == undefined) {
    res.status(403); //bad request
    res.send("sign in required");
  } else {
    const token = authHeader.replace("Bearer ", "");
    try {
      jwt.verify(token, process.env.JWT_SIGN_KEY);
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
  }
});

// Fetch emergency broadcast
router.get("/broadcast", async (req, res) => {
  const authHeader = req.headers["authorization"];
  if (authHeader == undefined) {
    res.status(403); //bad request
    res.send("sign in required");
  } else {
    const token = authHeader.replace("Bearer ", "");
    try {
      jwt.verify(token, process.env.JWT_SIGN_KEY);
      const channel = await Broadcast.find({});
      res.status(200).json(channel);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
  }
});

// middlewares
// filter
// authorization vs authentication
// Create emergency broadcast (admin only)
router.post("/broadcast", async (req, res) => {
  const authHeader = req.headers["authorization"];
  if (authHeader == undefined) {
    res.status(403); //bad request
    res.send("sign in required");
  } else {
    const token = authHeader.replace("Bearer ", "");
    try {
      jwt.verify(token, process.env.JWT_SIGN_KEY);
      const channel = await Broadcast.create(req.body);
      res.status(200).json(channel);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
  }
});

export default router;
