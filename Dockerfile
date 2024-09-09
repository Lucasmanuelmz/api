FROM node:20.14.0
WORKDIR /app
COPY package*.json ./

RUN npm install --omit=dev
COPY . .
EXPOSE 1234

CMD ["node", "server.js"]
