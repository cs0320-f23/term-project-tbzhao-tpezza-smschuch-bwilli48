# Use the official Node.js image as the base image
FROM node:14

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install

# Install additional dependencies required by Puppeteer
RUN apt-get update && apt-get install -y \
    chromium \
    libgtk-3-0 \
    libgbm-dev

# Copy the rest of the application code to the container
COPY . .

# Expose the port your app runs on
EXPOSE 4000

# Command to run your application
CMD [ "npm", "start" ]
