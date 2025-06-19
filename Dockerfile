FROM node:22-alpine

WORKDIR /opt/app

COPY package.json yarn.lock ./

RUN yarn 

COPY . .

