import mongoose from "mongoose";
import connectDB from "../mongoose/mongoose.js";

export function fetchAllChatRooms() {
  const db = mongoose.connection;
  const chatRooms = db.collection("chatRooms");
  return chatRooms.find().toArray();
}
export async function createChatRoom(req, res) {
  const db = mongoose.connection;
  const chatRooms = db.collection("chatRooms");

  const newChatRoom = {
    name: req.body.name,
    description: req.body.description,
    members: req.body.members,
  };

  chatRooms.insertOne(newChatRoom, function (err, result) {
    if (err) {
      console.error(err);
      res
        .status(500)
        .send({ error: "An error occurred while inserting chatroom." });
    } else {
      console.log(result);
      res.status(201).send(result.ops[0]);
    }
  });
}
