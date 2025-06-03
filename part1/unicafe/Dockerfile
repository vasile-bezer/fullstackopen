# Dockerfile
FROM node:20 AS builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Now use a minimal nginx container to serve it
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html

# Optional: replace default nginx config to handle routing correctly
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
