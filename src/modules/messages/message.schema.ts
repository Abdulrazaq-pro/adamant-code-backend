import { z } from "zod";

export const createMessageSchema = z.object({
  body: z.object({
    content: z.string().min(1, "Message content is required"),
    sender: z.enum(["user", "bot"]),
    conversationId: z.string().cuid("Invalid conversation ID"),
  }),
});

export type CreateMessageInput = z.infer<typeof createMessageSchema>["body"];
