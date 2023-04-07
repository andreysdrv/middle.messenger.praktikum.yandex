FROM node:16.17.0-alpine

WORKDIR /var/www/app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build; exit 0

EXPOSE 3000

CMD ["node", "./src/server.js"]