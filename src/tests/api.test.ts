import request from "supertest";
import app from "../app"; // your Express app
import prisma from "../prisma/client";

beforeAll(async () => {
  await prisma.$connect();
  await prisma.message.deleteMany();
  await prisma.conversation.deleteMany();
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe("Conversations API", () => {
  let conversationId: string;

  it("should create a new conversation", async () => {
    const res = await request(app)
      .post("/api/conversations")
      .send({ title: "Integration Test Conversation" });

    expect(res.status).toBe(201); // <-- fixed
    expect(res.body.success).toBe(true);
    expect(res.body.data.title).toBe("Integration Test Conversation");

    conversationId = res.body.data.id;
    expect(conversationId).toBeDefined(); // safety check
  });

  it("should fetch all conversations", async () => {
    const res = await request(app).get("/api/conversations");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it("should delete a conversation", async () => {
    expect(conversationId).toBeDefined(); // ensure ID exists
    const res = await request(app).delete(
      `/api/conversations/${conversationId}`
    );
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });
});

describe("Messages API", () => {
  let conversationId: string;
  let messageId: string;

  beforeAll(async () => {
    const conv = await prisma.conversation.create({
      data: { title: "Message Test Conversation" },
    });
    conversationId = conv.id;
    expect(conversationId).toBeDefined();
  });

  it("should create a message in a conversation", async () => {
    const res = await request(app)
      .post(`/api/conversations/${conversationId}/messages`)
      .send({ content: "Hello world", sender: "user" });

    expect(res.status).toBe(201); // <-- fixed
    expect(res.body.success).toBe(true);
    expect(res.body.data.content).toBeDefined();

    messageId = res.body.data.id;
    expect(messageId).toBeDefined();
  });

  it("should fetch all messages in a conversation", async () => {
    const res = await request(app).get(
      `/api/conversations/${conversationId}/messages`
    );
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it("should delete a message", async () => {
    expect(messageId).toBeDefined();
    const res = await request(app).delete(`/api/messages/${messageId}`);
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });
});
