FROM node:alpine As development

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./
COPY tsconfig.json tsconfig.json

RUN yarn install

COPY apps/reservations apps/reservations
COPY libs libs

RUN yarn build

FROM node:alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./

RUN yarn install --prod

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/apps/reservations/main"]