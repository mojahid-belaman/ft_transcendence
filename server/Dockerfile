FROM node:17-alpine

WORKDIR /usr/app

RUN npm install --location=global --force yarn

COPY . .

RUN yarn

EXPOSE 5000

CMD ["npm", "run", "start:dev"]