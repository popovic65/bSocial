FROM node:18.16.0

WORKDIR /app/comment

COPY package.json ./

COPY yarn.lock ./

RUN yarn 

COPY . .

EXPOSE 8002

CMD yarn db:push && yarn dev
