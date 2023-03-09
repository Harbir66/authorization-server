FROM node:19-alpine

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 3010

ENTRYPOINT [ "npm","run","start" ]