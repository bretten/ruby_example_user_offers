FROM node:18.11.0-alpine

WORKDIR /usr/src/app

# package.json and package-lock.json
COPY app/package*.json ./

# Install react
RUN npm install --silent
#RUN npm install react-scripts -g --silent # Used to create the initial create-react-app

# Install bash
RUN apk update && apk add bash

# Copy the app
COPY app ./

CMD ["npm", "start"]
