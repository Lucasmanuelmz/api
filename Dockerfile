FROM node:20.14.0
WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev
COPY . .

EXPOSE 1234
RUN mkdir -p /api/uploads
ENV NODE_OPTIONS=--max_old_space_size=1024

CMD ["node", "server.js"]

