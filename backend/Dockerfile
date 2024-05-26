# Stage 1: Build the TypeScript code
FROM node:16 AS builder

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the TypeScript code
RUN npm run build

# Stage 2: Run the application
FROM node:16

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the compiled JavaScript code from the builder stage
COPY --from=builder /usr/src/app/dist ./dist

# Copy the node_modules from the builder stage
COPY --from=builder /usr/src/app/node_modules ./node_modules

# Expose the port the app runs on
EXPOSE 8008

# Run the app
CMD ["node", "dist/index.js"]
