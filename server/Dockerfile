FROM node:alpine

WORKDIR /usr/app

RUN npm install npm@latest -g

COPY . .

RUN npm install

EXPOSE 5000

CMD ["npm", "run", "start:dev"]
