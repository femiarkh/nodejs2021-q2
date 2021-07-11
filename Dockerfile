FROM node:16.3-alpine3.13

WORKDIR /app
COPY package*.json .
RUN npm install -d
COPY . .

CMD npm run start:dev