import { Router } from "express";
import {
  createMessageHandler,
  getMessagesHandler,
  deleteMessageHandler,
} from "./message.controller";

const router = Router();

// POST /messages
router.post("/", createMessageHandler);

// GET /messages/:conversationId
router.get("/:conversationId", getMessagesHandler);

// DELETE /messages/:id
router.delete("/:id", deleteMessageHandler);

export default router;
