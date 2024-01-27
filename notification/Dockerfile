FROM node:18.16.0

WORKDIR /app/notification

COPY package.json ./

COPY yarn.lock ./

RUN yarn 

COPY . .

EXPOSE 8003

CMD yarn db:push && yarn dev
