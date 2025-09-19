// tests/conversation.test.ts

import request from "supertest";
import app from "../app"; // your Express app
import prisma from "../prisma/client";

beforeAll(async () => {
  await prisma.$connect();
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe("Conversations API", () => {
  it("should create a new conversation", async () => {
    const res = await request(app)
      .post("/api/conversations")
      .send({ title: "Test Conversation" });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.title).toBe("Test Conversation");
  });

  it("should fetch all conversations", async () => {
    const res = await request(app).get("/api/conversations");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
  });
});
