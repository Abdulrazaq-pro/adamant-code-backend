# ChatBot API

## Overview
This is the backend API for a chatbot application, built with Express.js and TypeScript. It uses Prisma as an ORM to interact with a PostgreSQL database for managing conversations and messages.

## Features
- **Express.js**: For building the RESTful API server and handling routing.
- **Prisma**: Serves as the ORM for type-safe database access and schema management with PostgreSQL.
- **TypeScript**: Provides static typing to enhance code quality and maintainability.
- **Zod**: Used for schema declaration and validation to ensure data integrity.
- **Swagger**: Generates interactive API documentation automatically from code annotations.

## Getting Started
### Installation
1.  **Clone the repository**
    ```bash
    git clone https://github.com/your-username/custom-gpt-backend.git
    cd custom-gpt-backend
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Set up the database**
    Create a `.env` file and add your PostgreSQL connection string (see below). Then, run the migration to create the database schema.
    ```bash
    npx prisma migrate dev --name init
    ```

4.  **Seed the database (Optional)**
    To populate the database with initial sample data, run:
    ```bash
    npx prisma db seed
    ```

5.  **Start the development server**
    ```bash
    npm run dev
    ```
    The server will be running at `http://localhost:8080`.

### Environment Variables
Create a `.env` file in the root directory and add the following variables:

| Variable       | Description                  | Example                                                    |
| -------------- | ---------------------------- | ---------------------------------------------------------- |
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:password@localhost:5432/mydatabase`     |
| `PORT`         | Port for the server to run on | `8080`                                                     |


## API Documentation
### Base URL
`/api`

### Endpoints
#### **Conversations**
---
#### POST /api/conversations
Creates a new conversation.

**Request**:
```json
{
  "title": "New Project Discussion"
}
```

**Response**:
```json
{
    "success": true,
    "message": "Conversation created successfully",
    "data": {
        "id": "clxkztv2w0000txpm75f6e8g9",
        "title": "New Project Discussion",
        "createdAt": "2024-07-30T15:00:00.123Z",
        "updatedAt": "2024-07-30T15:00:00.123Z",
        "isDeleted": false,
        "messages": []
    }
}
```

**Errors**:
- `400 Bad Request`: If the `title` field is missing or invalid.

---
#### GET /api/conversations
Retrieves a list of all conversations.

**Request**:
No payload required.

**Response**:
```json
{
    "success": true,
    "message": "Conversations fetched successfully",
    "data": [
        {
            "id": "clxkztv2w0000txpm75f6e8g9",
            "title": "New Project Discussion",
            "createdAt": "2024-07-30T15:00:00.123Z",
            "updatedAt": "2024-07-30T15:00:00.123Z",
            "isDeleted": false,
            "messages": []
        }
    ]
}
```

**Errors**:
- `500 Internal Server Error`: If there is a problem fetching data from the database.

---
#### DELETE /api/conversations/:id
Deletes a specific conversation and all its associated messages by its ID.

**Request**:
No payload required. The conversation `id` is passed as a URL parameter.

**Response**:
```json
{
    "success": true,
    "message": "Conversation deleted successfully",
    "data": {
        "id": "clxkztv2w0000txpm75f6e8g9",
        "title": "New Project Discussion",
        "createdAt": "2024-07-30T15:00:00.123Z",
        "updatedAt": "2024-07-30T15:00:00.123Z",
        "isDeleted": false
    }
}
```

**Errors**:
- `404 Not Found`: If a conversation with the specified `id` does not exist.

#### **Messages**
---
#### POST /api/conversations/:conversationId/messages
Creates a new message within a specific conversation and triggers an AI response.

**Request**:
The `conversationId` is passed as a URL parameter.
```json
{
  "content": "Hello, how does this work?",
  "sender": "user"
}
```

**Response**:
The API returns the generated AI response message.
```json
{
    "success": true,
    "message": "Message created successfully",
    "data": {
        "id": "clxkzyu8r0003txpmhfg745k6",
        "content": "This is an AI generated response",
        "isUser": false,
        "conversationId": "clxkztv2w0000txpm75f6e8g9",
        "createdAt": "2024-07-30T15:05:02.456Z"
    }
}
```

**Errors**:
- `400 Bad Request`: If the request body is invalid (e.g., missing `content`).
- `404 Not Found`: If the `conversationId` does not exist.

---
#### GET /api/conversations/:conversationId/messages
Retrieves all messages for a specific conversation, ordered by creation date.

**Request**:
No payload required. The `conversationId` is passed as a URL parameter.

**Response**:
```json
{
    "success": true,
    "message": "Messages fetched successfully",
    "data": [
        {
            "id": "clxkzyt3p0001txpmabcd1234",
            "content": "Hello, how does this work?",
            "isUser": true,
            "conversationId": "clxkztv2w0000txpm75f6e8g9",
            "createdAt": "2024-07-30T15:05:00.123Z"
        },
        {
            "id": "clxkzyu8r0003txpmhfg745k6",
            "content": "This is an AI generated response",
            "isUser": false,
            "conversationId": "clxkztv2w0000txpm75f6e8g9",
            "createdAt": "2024-07-30T15:05:02.456Z"
        }
    ]
}
```

**Errors**:
- `404 Not Found`: If a conversation with the specified `id` does not exist.

---
#### POST /api/messages
An alternative endpoint to create a message. The `conversationId` must be provided in the request body.

**Request**:
```json
{
  "content": "Can you help me with billing?",
  "sender": "user",
  "conversationId": "clxkztv2w0000txpm75f6e8g9"
}
```

**Response**:
The same response structure as `POST /api/conversations/:conversationId/messages`.

**Errors**:
- `400 Bad Request`: If the request body is invalid (e.g., missing `content` or `conversationId`).

---
#### DELETE /api/messages/:id
Deletes a specific message by its ID.

**Request**:
No payload required. The message `id` is passed as a URL parameter.

**Response**:
```json
{
    "success": true,
    "message": "Message deleted successfully",
    "data": {
        "id": "clxkzyt3p0001txpmabcd1234",
        "content": "Hello, how does this work?",
        "isUser": true,
        "conversationId": "clxkztv2w0000txpm75f6e8g9",
        "createdAt": "2024-07-30T15:05:00.123Z"
    }
}
```

**Errors**:
- `404 Not Found`: If a message with the specified `id` does not exist.

## Contributing
Contributions are welcome! If you have suggestions for improvements, please follow these steps:
-   🍴 Fork the repository.
-   ✨ Create a new branch (`git checkout -b feature/AmazingFeature`).
-   🚀 Commit your changes (`git commit -m 'Add some AmazingFeature'`).
-   📤 Push to the branch (`git push origin feature/AmazingFeature`).
-   🎉 Open a Pull Request.

## License
This project is unlicensed and is free to be used by anyone.

## Author
Connect with me on social media:

-   **LinkedIn**: [Your LinkedIn Profile](https://linkedin.com/in/your-username)
-   **Twitter**: [@YourTwitterHandle](https://twitter.com/your-username)

---
<p align="center">
  <img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"/>
  <img src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js"/>
  <img src="https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB" alt="Express.js"/>
  <img src="https://img.shields.io/badge/prisma-%232D3748.svg?style=for-the-badge&logo=prisma&logoColor=white" alt="Prisma"/>
  <img src="https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL"/>
</p>
