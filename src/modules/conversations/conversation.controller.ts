import { Request, Response } from "express";
import * as conversationService from "./conversation.service";

export const createConversation = async (req: Request, res: Response) => {
  const conversation = await conversationService.createConversation(req.body);
  res.status(201).json(conversation);
};

export const getConversations = async (req: Request, res: Response) => {
  const conversations = await conversationService.getConversations();
  res.json(conversations);
};

export const deleteConversation = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  const { id } = req.params;
  const result = await conversationService.deleteConversation(id);
  res.json(result);
};
