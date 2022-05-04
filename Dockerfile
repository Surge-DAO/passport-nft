# Pull Node 16 base image
FROM node:16-alpine

# Install Python 3 - latest
RUN apk update || : && apk add --no-cache python3

RUN apk add --no-cache git
RUN apk add g++ make

# Set working directory
WORKDIR /app

# Copy files to the working directory
COPY package.json ./
COPY package-lock.json ./
COPY . .

# Set env var
ARG REACT_APP_INFURA_PUBLIC_ID
ENV REACT_APP_INFURA_PUBLIC_ID=$REACT_APP_INFURA_PUBLIC_ID

ARG REACT_APP_INFURA_SECRET_KEY
ENV REACT_APP_INFURA_SECRET_KEY=$REACT_APP_INFURA_SECRET_KEY

ARG REACT_APP_CROSSMINT_CLIENT_ID
ENV REACT_APP_CROSSMINT_CLIENT_ID=$REACT_APP_CROSSMINT_CLIENT_ID

ARG TEST_ENV_VAR
ENV TEST_ENV_VAR=TEST

# Install project dependencies based on the package-lock.json file
RUN npm ci

# Start application
CMD ["npm", "run", "start"]
