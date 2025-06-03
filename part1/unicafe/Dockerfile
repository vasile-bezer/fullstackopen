# ----------------------------
# Stage 1: Build static assets
# ----------------------------
FROM node:18-alpine AS builder

WORKDIR /app

# 1. Install the small Alpine build tools (needed by Vite/esbuild for certain dependencies)
RUN apk add --no-cache python3 make g++

# 2. Copy only package.json & package-lock.json (for better layer caching)
COPY package*.json ./

# 3. Install your React + Vite dev dependencies
#    (Since "serve" and "express" are NOT in package.json, only React + Vite come in here)
RUN npm install

# 4. Copy the rest of your repo (source code)
COPY . .

# 5. Let Vite build the production bundle into "dist/"
RUN npm run build


# ----------------------------------
# Stage 2: Production image to serve
# ----------------------------------
FROM node:18-alpine

WORKDIR /app

# 1. Globally install the "serve" binary (no need to modify package.json)
#    This ensures /usr/local/bin/serve exists in the final image.
RUN npm install --global serve

# 2. Copy the built "dist/" folder from the builder stage
COPY --from=builder /app/dist ./dist

# 3. Expose the port that Heroku (or any container platform) will map to $PORT
EXPOSE 3000

# 4. In the CMD, run "serve -s dist" and let it pick up the $PORT environment variable.
#    (Heroku sets $PORT for you at runtime, so you don't need to hardcode any number.)
CMD ["sh", "-c", "serve -s dist -l $PORT"]
