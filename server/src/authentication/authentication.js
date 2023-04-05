import jwt from "jsonwebtoken";
import express from "express";

const app = express();
app.use(express());

const userDb = [
  {
    username: "William",
    password: "123",
    role: "USER",
  },
  {
    username: "Admin",
    password: "admin123",
    role: "ADMIN",
  },
];

app.post("/auth/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  let user = userDb.find(
    (user) => user.username == username && user.password == password
  );

  const token = jwt.sign(payload);
});
