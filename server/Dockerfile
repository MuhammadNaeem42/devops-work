# Use the official Node.js image as the base image
FROM node:14

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install Node.js dependencies
RUN npm install 

# Copy the rest of the backend code to the container
COPY . .




# Start the Node.js application
CMD ["npm", "start"]
