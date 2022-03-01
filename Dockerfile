# Pull Node 16 base image
FROM node:16-alpine

# Install Python 3 - latest
RUN apk update || : && apk add --no-cache python3

# Set working directory
WORKDIR /app

# Copy files to the working directory
COPY package.json ./
COPY package-lock.json ./
COPY . .

# Install project dependencies based on the package-lock.json file
RUN npm ci

# Start application
CMD ["npm", "run", "start"]
