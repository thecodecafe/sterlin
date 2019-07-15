FROM node:10

# Create app directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Bundle source code
COPY . .

# Expose app to port 80 and run start command
EXPOSE 3000
CMD ["npm", "start"]