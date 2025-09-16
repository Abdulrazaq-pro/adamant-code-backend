import prisma from "../../prisma/client";
import { CreateMessageInput } from "./message.schema";

// import { CreateMessageInput } from "./message.schema";

// Helper function for delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const createMessage = async (data: CreateMessageInput) => {
  // Always save the user message
  await prisma.message.create({
    data: {
      content: data.content,
      conversationId: data.conversationId,
      isUser: true,
    },
  });

  // Wait for 2 seconds (simulate AI thinking) I commented this to speed up tests as their would be network latency anyway
  // await delay(2000);

  // Create the AI response
  const aiResponseText = "This is an AI generated response";

  const aiMessage = await prisma.message.create({
    data: {
      content: aiResponseText,
      conversationId: data.conversationId,
      isUser: false, // bot response
    },
  });

  // Update conversation timestamp for activity
  await prisma.conversation.update({
    where: { id: data.conversationId },
    data: { updatedAt: new Date() },
  });

  // Return just the AI message in the same shape as stored in DB
  return aiMessage;
};

export const getMessagesByConversation = async (conversationId: string) => {
  return prisma.message.findMany({
    where: { conversationId },
    orderBy: { createdAt: "asc" },
  });
};

export const deleteMessage = async (id: string) => {
  return prisma.message.delete({ where: { id } });
};
