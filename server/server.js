import * as env from "dotenv";
env.config();

import express from "express";
import router from "./src/router/router.js";
import connectDB from "./src/mongoose/mongoose.js";

const addr = "127.0.0.1";
const port = process.env.PORT;
const DB = process.env.MONGO_URI;
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true })); // for html forms (extended is true by default, allows for form to json)
app.use(express.json()); // transform request (data in) data to json

app.use(express.json());

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
