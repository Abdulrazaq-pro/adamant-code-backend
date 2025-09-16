import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create a sample conversation
  const conversation = await prisma.conversation.create({
    data: {
      title: 'Sample Conversation',
    },
  });

  // Create sample messages
  await prisma.message.createMany({
    data: [
      {
        content: 'How can I help you?',
        isUser: false,
        conversationId: conversation.id,
      },
      {
        content: 'I need help with my account',
        isUser: true,
        conversationId: conversation.id,
      },
      {
        content: 'This is an AI generated response',
        isUser: false,
        conversationId: conversation.id,
      },
    ],
  });

  console.log('Seed data created successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });