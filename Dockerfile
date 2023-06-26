FROM node:18-alpine as build-stage

WORKDIR /vue-project

COPY package*.json ./

# install simple http server for serving static content
RUN npm install -g http-server

RUN npm install

COPY . .

RUN npm run build

EXPOSE 8080
CMD [ "http-server", "dist" ]