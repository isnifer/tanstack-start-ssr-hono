FROM oven/bun:1.2.0

WORKDIR /usr/src/app

COPY package*.json bun.lock ./
RUN bun install
COPY . .

RUN bun build:prod

ENV NODE_ENV production

CMD [ "bun", "start" ]