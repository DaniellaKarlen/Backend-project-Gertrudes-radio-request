import express from "express";
import { fetchAllChatRooms } from "../service/service";

const router = express.Router();

router.get("/channel", (req, res) => {
  res.send(req.body);

  fetchAllChatRooms().then(() => res.render("chatRoom"));
}); //Hämta alla chatter

router.get("/channel:id", (req, res) => {}); // Hämta ett specifikt cattrum

router.put("/channel", (req, res) => {
  res.send(req.body);
}); // Skapa chattrum

router.post("/channel:id", (req, res) => {}); // SKicka nytt meddelande i en specifik chatt

router.delete("/channel:id", (req, res) => {}); // Ta bort ett chattrum

router.get("/broadcast", (req, res) => {}); // Hämta nödhändelser

router.post("/broadcast", (req, res) => {}); // Skapa ny nödhändelse (Bara "Admin" ska kunna skapa)

export default router;
