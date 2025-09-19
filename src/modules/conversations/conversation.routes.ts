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


const router = Router();

/**
 * @openapi
 * /api/conversations:
 *   post:
 *     tags:
 *       - Conversations
 *     summary: Create a new conversation
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateConversationInput'
 *     responses:
 *       201:
 *         description: Conversation created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Conversation'
 *   get:
 *     tags:
 *       - Conversations
 *     summary: Get all conversations
 *     responses:
 *       200:
 *         description: A list of conversations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Conversation'
 */
router.post("/", createConversation);
router.get("/", getConversations);

/**
 * @openapi
 * /api/conversations/{id}:
 *   delete:
 *     tags:
 *       - Conversations
 *     summary: Delete a conversation by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The conversation ID
 *     responses:
 *       200:
 *         description: Conversation deleted successfully
 */
router.delete("/:id", deleteConversation);

/**
 * @openapi
 * /api/conversations/{conversationId}/messages:
 *   post:
 *     tags:
 *       - Messages
 *     summary: Create a new message in a conversation
 *     parameters:
 *       - in: path
 *         name: conversationId
 *         required: true
 *         schema:
 *           type: string
 *         description: The conversation ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Message created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *   get:
 *     tags:
 *       - Messages
 *     summary: Get all messages for a conversation
 *     parameters:
 *       - in: path
 *         name: conversationId
 *         required: true
 *         schema:
 *           type: string
 *         description: The conversation ID
 *     responses:
 *       200:
 *         description: A list of messages
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Message'
 */
router.post("/:conversationId/messages", createMessageHandler);
router.get("/:conversationId/messages", getMessagesHandler);

export default router;
