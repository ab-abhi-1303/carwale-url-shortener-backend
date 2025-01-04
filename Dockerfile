# Use an official Node.js image as the base
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project into the working directory
COPY . .

# Expose the port your app runs on
EXPOSE 5000

# Define the default command to run your app
CMD ["npm", "start"]
