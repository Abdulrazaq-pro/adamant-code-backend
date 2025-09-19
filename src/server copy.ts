import express from "express";
import cors from "cors";
import { setupSwagger } from "./utils/swagger";

import conversationRoutes from "./modules/conversations/conversation.routes";
import messageRoutes from "./modules/messages/message.routes";

const app = express();

app.use(
  cors({
    origin: "*", // allow all origins
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

// Swagger
setupSwagger(app);

app.get("/", (req, res) => {
  res.send("✅ API is running...");
});

app.post("/", (req, res) => {
  const data = req.body;
  res.json({ message: "Data received!", data });
});

// Routes
app.use("/api/conversations", conversationRoutes);
app.use("/api/messages", messageRoutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  console.log(`📚 Docs available at http://localhost:8080/api-docs`);
});
