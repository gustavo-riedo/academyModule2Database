FROM node:14-alpine

WORKDIR /app

COPY package*.json ./
RUN yarn install

COPY . .

EXPOSE 5000

CMD ["yarn", "dev"]