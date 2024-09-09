FROM node:20.14.0
WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev
COPY . .
COPY .env ./

EXPOSE 1234

ENV NODE_OPTIONS=--max_old_space_size=1024

CMD ["node", "server.js"]

