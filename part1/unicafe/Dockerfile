# Stage 1: Build
FROM node:18-alpine AS builder

WORKDIR /app
RUN apk add --no-cache python3 make g++

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Production
FROM node:18-alpine

WORKDIR /app

# Copy only build artifacts and server.js from builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/server.js ./
COPY package*.json ./
RUN npm install --production

EXPOSE 3000
CMD ["node", "server.js"]
