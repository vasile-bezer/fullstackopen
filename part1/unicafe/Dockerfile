FROM node:18-alpine
WORKDIR /app

COPY . .

RUN npm install
RUN npm install express
RUN npm run build

EXPOSE 3000
CMD ["node", "server.js"]