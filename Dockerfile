FROM node:16.14.0

WORKDIR /app
COPY . .

RUN npm i -g pnpm && pnpm install

CMD pnpm start