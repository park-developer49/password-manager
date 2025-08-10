FROM node:22

# Set working directory inside container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if exists)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all other source files
COPY app.js ./
COPY utils ./utils
COPY package*.json ./

# Default command to run your app
CMD ["node", "app.js"]

