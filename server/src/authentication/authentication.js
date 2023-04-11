import * as env from "dotenv";
env.config();

import jwt from "jsonwebtoken";
import express from "express";

const app = express();
app.use(express());

// app.post("/auth/login", (req, res) => {
//   const username = req.body.username;
//   const password = req.body.password;
// });

// app.post("/auth/login", (req, res) => {
//   const username = req.body.username;
//   const password = req.body.password;

//   if (username == undefined || password == undefined) {
//     res.status(400); //bad request
//     res.send("Missing login details");
//   } else {
//     let token = jwtUtil.generate(username);

//     res.status(200);
//     res.send(token);
//   }
// });

// function generate(username) {
//   const adminDb = [
//     {
//       username: "Admin",
//       password: "admin123",
//       role: "ADMIN",
//     },
//   ];

//   let payloadOptions = {
//     issuer: "chat-app",
//     subject: "send and recieve access token",
//     expiresIn: "15m",
//   };

//   let payload = {
//     username: adminDb[0].username,
//     password: adminDb[0].password,
//     role: "ADMIN", //hämtas från datbas ist?
//   };

//   let token = jwt.sign(payload, JWT_SIGN_KEY, payloadOptions);

//   return token;
// }

// function verify(token) {
//   try {
//     return jwt.verify(token, JWT_SIGN_KEY);
//   } catch (err) {
//     let verfError = new Error();

//     if (err.name == "JsonWebTokenError") {
//       verfError.clientMessage = "Digital signing is invalid, request new token";
//       verfError.serverMessage = "Token verification failed";
//     }

//     if (err.name == "TokenExpiredError") {
//       verfError.clientMessage = "Digital signing is invalid, request new token";
//       verfError.serverMessage = "Token verification failed";
//     }

//     throw verfError;
//   }
// }

// async function adminToken() {
//   const adminDb = [
//     {
//       username: "Admin",
//       password: "admin123",
//       role: "ADMIN",
//     },
//   ];

//   let user = adminDb.find(
//     (user) => user.username == username && user.password == password
//   );

//   if (user == undefined) {
//     res.status(401);
//     res.send("invalid authentication");
//   } else {
//     const payload = {
//       username: user.username,
//       role: user.role,
//     };
//     const payloadOptions = {
//       expiresIn: "15m",
//     };
//     const token = jwt.sign(payload, process.env.JWT_SIGN_KEY, payloadOptions);
//     console.log(token);
//     response.status(200);
//     response.send(token);
//   }
// }

export default {};
