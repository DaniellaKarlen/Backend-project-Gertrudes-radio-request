// import mongoose from "mongoose";
// import connectDB from "../mongoose/mongoose.js";
// import ChatRoom from "../../models/chatRoom.js";

// export function fetchAllChatRooms() {
//   const db = mongoose.connection;
//   const chatRooms = db.collection("chatRooms");
//   return chatRooms.find().toArray();
// }

// export async function createChatRoom(req, res) {
//   connectDB();
//   const db = mongoose.connection;
//   const chatRooms = db.collection("chatRooms");

// chatRooms.insertOne({
//   name: req.body.name,
//   description: req.body.description,
//   members: req.body.members,
// });

// save a product

// const newChatRoom = {
//   name: req.body.name,
//   description: req.body.description,
//   members: req.body.members,
// };

// let newChatRoom = {
//   name: "",
//   description: "",
//   members: [""],
// };

// chatRooms.insertOne(newChatRoom);

// chatRooms.insertOne({ name: "hej", description: "hejhej" });
// chatRooms.insertOne(newChatRoom, function (err, result) {
//   if (err) {
//     console.error(err);
//     res
//       .status(500)
//       .send({ error: "An error occurred while inserting chatroom." });
//   } else {
//     console.log(result);
//     res.status(201).send(result.ops[0]);
//   }
// });
// }
