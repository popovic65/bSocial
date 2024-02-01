FROM node:18.16.0

WORKDIR /app/post

COPY package.json ./

COPY yarn.lock ./

RUN yarn 

COPY . .

EXPOSE 8000

CMD yarn db:push && yarn dev

