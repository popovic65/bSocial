FROM node:18.16.0

WORKDIR /app/consumer

COPY package.json ./

COPY yarn.lock ./

RUN yarn 

COPY . .

EXPOSE 8005

CMD yarn dev
