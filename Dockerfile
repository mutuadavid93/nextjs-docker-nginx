# Base on offical Node.js Alpine image
FROM node:alpine

# Set working directory
WORKDIR /usr/app

# Install PM2 globally
# PM2 restarts our NodeJs App to make sure it's always up instead of it crashing
RUN npm install --global pm2

# Copy package.json and package-lock.json before other files
# Utilise Docker cache to save re-installing dependencies if unchanged
COPY ./package*.json ./

# Install dependencies
RUN npm install --production

# Copy all files
COPY ./ ./

# Build app
RUN npm run build

# Expose the listening port
EXPOSE 3000

# Create a pm2 group and add node(from Node.js Alpine base image) user 
# into it to avoid EACCESS error. Unfornately you can only run those commands 
# if you are root user
USER root
RUN addgroup pm2 && chgrp -R pm2 /usr/app && addgroup node pm2

# Later switch back to run rest of commands and container as node non-root user 
# which will be ok since they already belong to pm2 group
USER node

# Run npm start script with PM2 when container starts
CMD [ "pm2-runtime", "npm", "--", "start" ]
