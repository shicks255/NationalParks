FROM node:16-alpine

WORKDIR /home/node/app

COPY server ./server

WORKDIR /home/node/app/server

RUN npm ci

ENV NODE_ENV=production

EXPOSE 8383
CMD ["node", "index.js"]