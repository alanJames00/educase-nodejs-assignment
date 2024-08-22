FROM node:21.1

RUN npm i -g pnpm

workdir /app

COPY package.json /app
COPY pnpm-lock.yaml /app
RUN pnpm install

COPY . .

EXPOSE 3007

CMD ["node", "server.js"]
