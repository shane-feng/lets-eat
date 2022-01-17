FROM node:16.13.2-alpine3.14

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

CMD [ "npm", "start" ]
