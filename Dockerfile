# Single stage build - simpler approach
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies
RUN npm install

# Copy all source code
COPY . .

# Build the application
RUN npm run build

EXPOSE 3000

# Use the dev script which uses ts-node, or start:prod which uses bun
CMD ["npm", "run", "start:prod"]