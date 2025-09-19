import prisma from "../../prisma/client";

export const createConversation = async (data: { title: string }) => {
  try {
    console.log("📩 Creating conversation with data:", data);

    const conversation = await prisma.conversation.create({
      data,
      include: {
        messages: true, 
      },
    });

    console.log("✅ Conversation created:", conversation);

    return {
      success: true,
      message: "Conversation created successfully",
      data: conversation,
    };
  } catch (error) {
    console.error("❌ Failed to create conversation:", error);
    return {
      success: false,
      message: "Failed to create conversation",
      error,
    };
  }
};

export const getConversations = async () => {
  try {
    console.log("🔍 Fetching all conversations...");

    const conversations = await prisma.conversation.findMany({
      include: { messages: true },
    });

    console.log("✅ Conversations fetched:", conversations);

    return {
      success: true,
      message: "Conversations fetched successfully",
      data: conversations,
    };
  } catch (error) {
    console.error("❌ Failed to fetch conversations:", error);
    return {
      success: false,
      message: "Failed to fetch conversations",
      error,
    };
  }
};

export const deleteConversation = async (id: string) => {
  try {
    console.log("🗑️ Deleting conversation with ID:", id);

    // Delete messages first
    const deletedMessages = await prisma.message.deleteMany({
      where: { conversationId: id },
    });
    console.log("🗑️ Deleted messages count:", deletedMessages.count);

    // Then delete the conversation
    const deleted = await prisma.conversation.delete({
      where: { id },
    });
    console.log("✅ Conversation deleted:", deleted);

    return {
      success: true,
      message: "Conversation deleted successfully",
      data: deleted,
    };
  } catch (error) {
    console.error("❌ Failed to delete conversation:", error);
    return {
      success: false,
      message: "Failed to delete conversation",
      error,
    };
  }
};
  