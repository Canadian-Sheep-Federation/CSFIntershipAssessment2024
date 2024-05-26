# Use the official Node.js image.
FROM node:16

# Create and change to the app directory.
WORKDIR /usr/src/app

# Install app dependencies.
COPY package*.json ./
RUN npm install || npm install || npm install

# Copy the app files.
COPY . .

# Build the app.
RUN npm run build

# Use the official Nginx image to serve the app.
FROM nginx:1.19-alpine

# Copy the build files to the Nginx HTML directory.
COPY --from=0 /usr/src/app/build /usr/share/nginx/html

# Expose the port Nginx runs on.
EXPOSE 80

# Run Nginx.
CMD ["nginx", "-g", "daemon off;"]
