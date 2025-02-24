# filepath: /path/to/website/Dockerfile
# Use the official Node.js image
FROM node:18-slim

# Create and change to the ns directory
WORKDIR /frontend

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN  npm install

# Copy the rest of the application code
COPY . .

# Start the React app
CMD ["npm", "start"]
