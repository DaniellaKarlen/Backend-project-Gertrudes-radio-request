import * as env from "dotenv";
env.config();

import express from "express";
import router from "./src/router/router.js";
import connectDB from "./src/mongoose/mongoDb.js";
import session from "express-session";
import authRouter from "./src/authentication/authentication.js";

const port = process.env.PORT;
const DB = process.env.MONGO_URI;
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.json());
app.use(
  session({
    secret: "bestsecretever",
    resave: true,
    saveUninitialized: true,
  })
);

app.get("/", (req, res) => {
  res.render("login.ejs");
});

// Register page
app.get("/register", (req, res) => {
  res.render("register.ejs");
});

// Login page
app.get("/login", (req, res) => {
  res.render("login.ejs");
});

// routes
app.get("/", (req, res) => {
  res.send("Home page");
});

app.use("/duck/api", router);

// authentication middleware
app.use(authRouter);

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
