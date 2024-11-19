FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm install -g ts-node

COPY . .

EXPOSE 4000

CMD ["sh", "-c", "npx prisma migrate deploy && npx prisma db seed && npm run start"]
