FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4000

CMD ["sh", "-c", "npm run generate && npm run migrate && npm run prisma && npm run start"]
