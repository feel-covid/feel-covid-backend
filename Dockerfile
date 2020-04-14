FROM node:12

WORKDIR /usr/app

COPY package*.json ./

RUN npm install

COPY . .

RUN ls

RUN npm run build

WORKDIR ./dist

RUN ls

EXPOSE 5000

CMD ["node", "server.js"]
