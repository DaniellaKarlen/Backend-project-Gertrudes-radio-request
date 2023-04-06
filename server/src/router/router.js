import express from "express";
import { fetchAllChatRooms, createChatRoom } from "../service/service.js";

const router = express.Router();

router.get("/channel", (req, res) => {
  return fetchAllChatRooms().then((chatRooms) => res.send(chatRooms));
}); //Hämta alla chatter

router.get("/channel:id", (req, res) => {}); // Hämta ett specifikt cattrum

router.put("/channel", async (req, res) => {
  const chatRoom = req.body;
  const result = await createChatRoom(chatRoom);
  res.status(201).send(result);
}); // Skapa chattrum

router.post("/channel:id", (req, res) => {}); // SKicka nytt meddelande i en specifik chatt

router.delete("/channel:id", (req, res) => {}); // Ta bort ett chattrum

router.get("/broadcast", (req, res) => {}); // Hämta nödhändelser

router.post("/broadcast", (req, res) => {}); // Skapa ny nödhändelse (Bara "Admin" ska kunna skapa)

export default router;
