FROM oven/bun:1

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies with Bun
RUN bun install

# Copy source code
COPY . .

# Generate Prisma client
RUN bunx prisma generate

# Build TypeScript with bun
RUN bun run build

EXPOSE 8000

# Use bun to run the compiled JavaScript
CMD ["bun", "dist/server.js"]