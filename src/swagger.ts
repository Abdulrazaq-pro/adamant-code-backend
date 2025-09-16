/**
 * @swagger
 * components:
 *   schemas:
 *     Message:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the message
 *         content:
 *           type: string
 *           description: The content of the message
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date the message was created
 *         conversationId:
 *           type: string
 *           description: The id of the conversation this message belongs to
 *     Conversation:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the conversation
 *         title:
 *           type: string
 *           description: The title of the conversation
 *         messages:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Message'
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date the conversation was created
 *
 * tags:
 *   name: Conversations
 *   description: The conversation managing API
 *
 * /conversations:
 *   get:
 *     summary: Returns the list of all the conversations
 *     tags: [Conversations]
 *     responses:
 *       200:
 *         description: The list of the conversations
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Conversation'
 *       500:
 *         description: Some server error
 *
 *   post:
 *     summary: Create a new conversation
 *     tags: [Conversations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title for the new conversation
 *             example:
 *               title: "New Chat about Prisma"
 *     responses:
 *       200:
 *         description: The conversation was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Conversation'
 *       500:
 *         description: Some server error
 *
 * /conversations/{id}:
 *   delete:
 *     summary: Remove the conversation by id
 *     tags: [Conversations]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The conversation id
 *     responses:
 *       200:
 *         description: The conversation was deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Conversation'
 *       404:
 *         description: The conversation was not found
 *       500:
 *         description: Some server error
 */