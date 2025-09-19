import { Request, Response } from "express";
import * as service from "./message.service";
import { createMessageSchema } from "./message.schema";

export const createMessageHandler = async (req: Request, res: Response) => {
  try {
    const parsed = createMessageSchema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    });

    const message = await service.createMessage(parsed.body);
    res.status(201).json(message);
  } catch (err: any) {
    res.status(400).json({ error: err.errors ?? err.message });
  }
};

export const getMessagesHandler = async (
  req: Request<{ conversationId: string }>, 
  res: Response
) => {
  try {
    const { conversationId } = req.params; 
    const messages = await service.getMessagesByConversation(conversationId);
    res.json(messages);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteMessageHandler = async (
  req: Request<{ id: string }>, 
  res: Response
) => {
  try {
    const { id } = req.params;
    const message = await service.deleteMessage(id);
    res.json(message);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};
