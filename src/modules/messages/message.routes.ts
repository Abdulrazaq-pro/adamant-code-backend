import { Router } from "express";
import {
  createMessageHandler,
  getMessagesHandler,
  deleteMessageHandler,
} from "./message.controller";

const router = Router();

/**
 * @openapi
 * /api/messages:
 *   post:
 *     tags:
 *       - Messages
 *     summary: Create a new message
 *     description: This is an alternative to the nested route, you must provide a conversationId in the body.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateMessageInput'
 *     responses:
 *       201:
 *         description: Message created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 */
router.post("/", createMessageHandler);

/**
 * @openapi
 * /api/messages/{conversationId}:
 *   get:
 *     tags:
 *       - Messages
 *     summary: Get messages by conversation ID
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
router.get("/:conversationId", getMessagesHandler);

/**
 * @openapi
 * /api/messages/{id}:
 *   delete:
 *     tags:
 *       - Messages
 *     summary: Delete a message by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The message ID
 *     responses:
 *       200:
 *         description: Message deleted successfully
 */
router.delete("/:id", deleteMessageHandler);

export default router;
