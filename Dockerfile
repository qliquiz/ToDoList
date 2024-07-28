# todolist/Dockerfile
# Use the official Node.js 14 image.
FROM node:latest

# Create and change to the app directory.
WORKDIR /src/app

# Install app dependencies.
COPY package*.json ./
RUN npm install

# Copy app files.
COPY . .

# Expose the port the app runs on.
EXPOSE 3000

# Start the application.
CMD ["npm", "run", "start:dev"]
