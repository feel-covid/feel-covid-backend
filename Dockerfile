FROM node:12

WORKDIR /usr/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

WORKDIR ./dist

EXPOSE 5000

CMD ["node", "server.js"]
