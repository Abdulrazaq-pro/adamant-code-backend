import { z } from "zod";

/**
 * @openapi
 * components:
 *   schemas:
 *     Conversation:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: cuid
 *         title:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *         isDeleted:
 *           type: boolean
 *     CreateConversationInput:
 *       type: object
 *       required:
 *         - title
 *       properties:
 *         title:
 *           type: string
 *           default: 'New Conversation'
 */
export const createConversationSchema = z.object({
  body: z.object({
    title: z.string().min(1, "Title is required"),
  }),
});
