FROM node:18-alpine AS builder
WORKDIR /app
RUN apk add --no-cache python3 make g++
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /app
RUN npm install --global serve
RUN npm install -g serve json-server
COPY --from=builder /app/dist ./dist
COPY db.json .
EXPOSE 3000
CMD sh -c "json-server --watch db.json --port 3001 & serve -s dist -l $PORT"
