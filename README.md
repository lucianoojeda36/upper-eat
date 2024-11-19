# Proyecto uppereat

Este proyecto consta de un backend y un frontend para gestionar las reservas de un restaurante, con una base de datos PostgreSQL. El entorno de desarrollo se maneja a través de Docker para facilitar el despliegue y la administración de los servicios.

# UpperEat - Docker Compose Setup

## Prerequisites
- Docker
- Docker Compose
- Git

## Project Structure
```
/
├── uppereat_back/     # Backend project
│   ├── Dockerfile
│   └── ...
├── uppereat_front/    # Frontend project
│   ├── Dockerfile
│   └── ...
├── docker-compose.yml  # Docker Compose configuration
└── README.md
```

## Setup Instructions

### 1. Clone Repository
```bash
git clone https://github.com/lucianoojeda36/upper-eat.git
cd upper-eat
```

### 2. Create Dockerfiles

#### Backend Dockerfile (./uppereat_back/Dockerfile)
```dockerfile
FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run generate
EXPOSE 4000
CMD ["npm", "start"]
```

#### Frontend Dockerfile (./uppereat_front/Dockerfile)
```dockerfile
FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]
```

### 3. Environment Configuration
Review and adjust `.env` files in backend and frontend as needed.

### 4. Start Services
```bash
docker-compose up --build
```

## Services
- Backend: `http://localhost:4000`
- Frontend: `http://localhost:3000`
- Database: `postgresql://localhost:5433`

## Database Management
- User: `lucianoojeda`
- Password: `Cosmefulanito12`
- Database: `restaurant_db`

## Development Workflow
- Code changes automatically sync via volumes
- Backend: Hot reloading with `ts-node`
- Frontend: Turbopack development server
- Database persists data between container restarts

## Stopping Services
```bash
docker-compose down
```

## Troubleshooting
- Ensure no conflicting services on ports 3000, 4000, 5433
- Check Docker and Docker Compose versions
- Verify network connectivity