# Install dependencies
FROM ubuntu:16.04
# Clean and update
RUN apt-get clean && apt-get update
RUN apt-get -y install curl && \
    apt-get -y install wget && \
    apt-get -y install apt-utils && \
    apt-get autoremove -y
# Node app
FROM node:carbon
# The base node image sets a very verbose log level.
ENV NPM_CONFIG_LOGLEVEL warn
# Set working dir
WORKDIR /srv/www
# Bundle app source
COPY . .
# To mitigate issues with npm saturating the network interface we limit the number of concurrent connections
RUN npm config set maxsockets 5 && npm config set progress false
# Install pm2
RUN npm install -g pm2
RUN npm install -g yarn
RUN yarn install
RUN yarn run build
WORKDIR /srv/www/build
# Actual script to start can be overridden from `docker run`
CMD pm2 start --no-daemon index.js
# Expose ports
EXPOSE 5000