FROM node:14

WORKDIR /usr/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 5000

CMD bash -c "npm run migration:run && node ./dist/server.js"
