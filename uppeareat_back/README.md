# UpperEat Backend

## Project Overview
UpperEat is a backend application built with TypeScript, Express, Apollo Server, and Prisma ORM for database management.

## Prerequisites
- Node.js (v14 or higher)
- PostgreSQL
- npm or yarn

## Environment Setup

### 1. Clone the Repository
```bash
git clone <your-repository-url>
cd uppeareat_back
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Variables
Create a `.env` file in the project root with the following variables:
```
DATABASE_URL="postgresql://user:password@localhost:5432/restaurant_db"
PORT=4000
```

### 4. Database Setup
```bash
# Generate Prisma client
npm run generate

# Run database migrations
npm run migrate
```

### 5. Seed Database (Optional)
```bash
npx prisma db seed 

also can use npm start to seed the database
```

## Available Scripts
- `npm start`: Start the application
- `npm test`: Run test suite
- `npm run prisma`: Run Prisma CLI commands
- `npm run migrate`: Run database migrations
- `npm run generate`: Generate Prisma client

## Technologies Used
- TypeScript
- Express
- Apollo Server
- GraphQL
- Prisma ORM
- Jest (Testing)
- PostgreSQL

## Project Structure
```
/
├── prisma/             # Prisma schema and migrations
├── src/                # Source code
│   ├── index.ts        # Application entry point
│   ├── resolvers/      # GraphQL resolvers
│   └── models/         # Data models
├── tests/              # Test files
└── package.json
```

## Testing
The project uses Jest for unit and integration testing. Run tests with:
```bash
npm test
```

## Logging
Winston is configured for application logging.

