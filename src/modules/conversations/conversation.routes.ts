import { Router } from "express";
import {
  createConversation,
  getConversations,
  deleteConversation,
} from "./conversation.controller";

import {
  createMessageHandler,
  getMessagesHandler,
} from "../messages/message.controller";

// import { createMessageHandler } from

const router = Router();

// Conversations
router.post("/", createConversation);
router.get("/", getConversations);
router.delete("/:id", deleteConversation);

// Messages nested under a conversation
router.post("/:conversationId/messages", createMessageHandler);
router.get("/:conversationId/messages", getMessagesHandler);

export default router;
