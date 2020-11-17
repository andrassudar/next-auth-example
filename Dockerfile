FROM node:14-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV port=8080

EXPOSE 8080

CMD [ "npm", "run", "start" ]

