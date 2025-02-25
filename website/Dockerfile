# filepath: /path/to/website/Dockerfile
# Use the official Node.js image
FROM node:22-slim

# Create and change to the ns directory
WORKDIR /frontend

# TBD: Need to add this to dev container only
RUN apt-get update && apt-get install -y xdg-utils

# Copy package files
COPY package*.json pnpm-lock.yaml ./

# Install pnpm
RUN npm install -g pnpm

# Install dependencies
RUN pnpm i

# Copy the rest of the application code
COPY . .

# Build the TypeScript code
RUN pnpm run build

# Start the React app
CMD ["pnpm", "start" ]
