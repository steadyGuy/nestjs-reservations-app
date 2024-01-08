FROM node:alpine As development

WORKDIR /usr/src/app

COPY package.json ./
COPY pnpm-lock.yaml ./
COPY nest-cli.json nest-cli.json
COPY tsconfig.json tsconfig.json

RUN npm i -g pnpm

COPY apps/gateway apps/gateway
COPY libs libs

RUN pnpm install -r

RUN pnpm run build gateway

FROM node:alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package.json ./
COPY pnpm-lock.yaml ./
RUN npm i -g pnpm

RUN pnpm install --prod

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/apps/gateway/main"]