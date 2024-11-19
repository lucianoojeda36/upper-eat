# UpperEat Frontend

## Project Overview
UpperEat is a modern web application built with Next.js, React, and TypeScript, utilizing GraphQL for data fetching and Redux for state management.

## Prerequisites
- Node.js (v18 or higher)
- npm or yarn

## Setup and Installation

### 1. Clone the Repository
```bash
git clone <your-repository-url>
cd uppereat_front
```

### 2. Install Dependencies
```bash
npm install
```

## Available Scripts
- `npm run dev`: Start development server with Turbopack
- `npm run build`: Create production build
- `npm start`: Run production build
- `npm run lint`: Run ESLint
- `npm test`: Run Jest test suite

## Key Technologies
- Next.js 15
- React 18
- TypeScript
- GraphQL
- Apollo Client
- Redux Toolkit
- TailwindCSS
- Jest (Testing)

## State Management
Utilizes Redux Toolkit for global state management with Redux Thunk for async actions.

## API Integration
Uses Apollo Client for GraphQL queries and mutations.

## Testing
Configured with Jest and React Testing Library. Run tests using:
```bash
npm test
```

## Styling
Uses TailwindCSS for rapid UI development and responsive design.

## Project Structure
```
/
├── components/         # Reusable React components
├── pages/              # Next.js page components
├── redux/              # Redux store and slices
├── graphql/            # GraphQL queries and mutations
├── styles/             # Global and Tailwind styles
└── __tests__/          # Test files
```


