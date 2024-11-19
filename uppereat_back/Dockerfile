FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4000

CMD ["sh", "-c", "npx prisma generate && npx prisma migrate dev && npx prisma db seed && npm run start"]
