import prisma from "../../prisma/client";
import { CreateMessageInput } from "./message.schema";

// Helper function for delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const createMessage = async (data: CreateMessageInput) => {
  try {
    console.log("📩 Creating user message:", data);

    // Always save the user message
    const userMessage = await prisma.message.create({
      data: {
        content: data.content,
        conversationId: data.conversationId,
        isUser: true,
      },
    });
    console.log("✅ User message saved:", userMessage);

    // Optional delay for simulating AI
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
    console.log("🤖 AI message saved:", aiMessage);

    // Update conversation timestamp for activity
    await prisma.conversation.update({
      where: { id: data.conversationId },
      data: { updatedAt: new Date() },
    });
    console.log("🕒 Conversation updated with new timestamp");

    return {
      success: true,
      message: "Message created successfully",
      data: aiMessage,
    };
  } catch (error) {
    console.error("❌ Error creating message:", error);
    return {
      success: false,
      message: "Failed to create message",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};

export const getMessagesByConversation = async (conversationId: string) => {
  try {
    console.log("🔍 Fetching messages for conversation:", conversationId);

    const messages = await prisma.message.findMany({
      where: { conversationId },
      orderBy: { createdAt: "asc" },
    });

    console.log("✅ Messages fetched:", messages.length);

    return {
      success: true,
      message: "Messages fetched successfully",
      data: messages,
    };
  } catch (error) {
    console.error("❌ Error fetching messages:", error);
    return {
      success: false,
      message: "Failed to fetch messages",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};

export const deleteMessage = async (id: string) => {
  try {
    console.log("🗑️ Deleting message with ID:", id);

    const deleted = await prisma.message.delete({ where: { id } });
    console.log("✅ Message deleted:", deleted);

    return {
      success: true,
      message: "Message deleted successfully",
      data: deleted,
    };
  } catch (error) {
    console.error("❌ Error deleting message:", error);
    return {
      success: false,
      message: "Failed to delete message",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};
