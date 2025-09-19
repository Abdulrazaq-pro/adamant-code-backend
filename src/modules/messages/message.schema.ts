import { z } from "zod";

/**
 * @openapi
 * components:
 *   schemas:
 *     Message:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: cuid
 *         content:
 *           type: string
 *         isUser:
 *           type: boolean
 *         conversationId:
 *           type: string
 *           format: cuid
 *         createdAt:
 *           type: string
 *           format: date-time
 *     CreateMessageInput:
 *       type: object
 *       required:
 *         - content
 *         - conversationId
 *       properties:
 *         content:
 *           type: string
 *         conversationId:
 *           type: string
 *           format: cuid
 */
export const createMessageSchema = z.object({
  body: z.object({
    content: z.string().min(1, "Message content is required"),
    sender: z.enum(["user", "bot"]),
    conversationId: z.string().cuid("Invalid conversation ID"),
  }),
});

export type CreateMessageInput = z.infer<typeof createMessageSchema>["body"];
