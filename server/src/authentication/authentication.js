import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../../models/user.js";

const authRouter = express.Router();

// Register User
authRouter.post("/register", async (req, res) => {
  const { password, username } = req.body;

  // Kollar efter redan registrerade användarnamn
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    res.status(400).send("Username already exists");
    return;
  }
  // Skapar användare om "username" är unikt
  const user = new User({ username, password });
  await user.save();
  req.session.user_id = User._id;
  res.status(201).send("User Created Successfully");
});

// Login
authRouter.post("/login", async (req, res) => {
  const { password, username } = req.body;
  const foundUser = await User.findOne({ username: username });

  if (foundUser == null) {
    res.status(401).send("Invalid Username or password!");
  } else {
    const isPasswordValid = await bcrypt.compare(password, foundUser.password);
    if (isPasswordValid) {
      const payload = {
        id: foundUser._id,
        username: foundUser.username,
        role: foundUser.role,
      };
      const payloadOptions = {
        expiresIn: "15m",
      };
      const token = jwt.sign(payload, process.env.JWT_SIGN_KEY, payloadOptions);
      // res.send(token).redirect(`/duck/api/channel?token=${token}`);
      res.status(200).send(token);
    } else {
      res.status(401).send("Invalid Username or password");
    }
  }
});

export default authRouter;
