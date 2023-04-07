import * as env from "dotenv";
env.config();

import express from "express";
import router from "./src/router/router.js";
import connectDB from "./src/mongoose/mongoDb.js";
import ChatRoom from "./models/chatRoom.js";
import jwt from "jsonwebtoken";
import User from "./models/user.js";
import session from "express-session";

const addr = "127.0.0.1";
const port = process.env.PORT;
const DB = process.env.MONGO_URI;
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true })); // for html forms (extended is true by default, allows for form to json)
app.use(express.json()); // transform request (data in) data to json

app.use(express.json());
app.use(
  session({
    secret: "bestsecretever",
    resave: true,
    saveUninitialized: true,
  })
);

//JWT_TOKEN
const token = jwt.sign({ username: "ADMIN" }, process.env.JWT_SIGN_KEY);
console.log(token);

// register page
app.post("/register", async (req, res) => {
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
  req.session.user_id = user._id;
  res.send(201);
});

// Koppla login till databas!!
app.post("/auth/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  let user = adminDb.find(
    (user) => user.username == username && user.password == password
  );

  if (user == undefined) {
    res.status(401);
    res.send("invalid authentication");
  } else {
    const payload = {
      username: user.username,
      role: user.role,
    };
    const payloadOptions = {
      expiresIn: "15m",
    };
    const token = jwt.sign(payload, process.env.JWT_SIGN_KEY, payloadOptions);
    console.log(token);
    res.status(200);
    res.send(token);
  }
});

// routes
app.get("/", (req, res) => {
  res.send("Home page");
});

app.use("/duck/api", router);

// server connection
const start = async () => {
  try {
    await connectDB(DB);
    console.log("db connected");
    app.listen(port, console.log(`server is listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
