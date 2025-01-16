# Stage 1: Build the React application
FROM node:16 AS builder

# Set the working directory in the container
WORKDIR /app

# Copy only package.json and package-lock.json first to leverage Docker caching
COPY react-file-viewer/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY react-file-viewer/ ./

# Build the React application
RUN npm run build

# Stage 2: Serve the built files
FROM node:14

# Set the working directory
WORKDIR /server

# Copy the public server folder
COPY server/ ./

# Copy the React build artifacts to the public folder
COPY --from=builder /app/build ./public

# Install server dependencies if needed
RUN npm install

# Expose the port if the server runs on one (e.g., 3000)
EXPOSE 3000

# Command to start your server (replace with the actual start command)
CMD ["npm", "start"]