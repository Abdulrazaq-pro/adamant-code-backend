import prisma from "../../prisma/client";

export const createConversation = async (data: { title: string }) => {
  try {
    const conversation = await prisma.conversation.create({
      data,
      include: {
        messages: true, // include messages relation
      },
    });

    return {
      success: true,
      message: "Conversation created successfully",
      data: conversation,
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to create conversation",
      error,
    };
  }
};


export const getConversations = async () => {
  try {
    const conversations = await prisma.conversation.findMany({
      include: { messages: true },
    });
    return {
      success: true,
      message: "Conversations fetched successfully",
      data: conversations,
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to fetch conversations",
      error,
    };
  }
};

export const deleteConversation = async (id: string) => {
  try {
    // Delete messages first
    await prisma.message.deleteMany({
      where: { conversationId: id },
    });

    // Then delete the conversation
    const deleted = await prisma.conversation.delete({
      where: { id },
    });

    return {
      success: true,
      message: "Conversation deleted successfully",
      data: deleted,
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to delete conversation",
      error,
    };
  }
};
