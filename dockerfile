FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# COPY vite.config.js ./

EXPOSE 5173

CMD ["npm","run","dev"]
