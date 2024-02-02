FROM node:18.16.0

WORKDIR /app/consumer

COPY package.json ./

COPY yarn.lock ./

RUN yarn 

COPY . .

RUN yarn build

EXPOSE 8005

CMD yarn start
