FROM node:17-alpine

WORKDIR /usr/app

RUN npm install -g npm@latest

COPY . .

RUN npm install

EXPOSE 3000

CMD ["npm", "run", "dev"]