# Proyecto Uppeareat

Este proyecto consta de un backend y un frontend para gestionar las reservas de un restaurante, con una base de datos PostgreSQL. El entorno de desarrollo se maneja a través de Docker para facilitar el despliegue y la administración de los servicios.

## Estructura del Proyecto

- **Backend**: API RESTful que maneja las operaciones relacionadas con las reservas del restaurante.
- **Frontend**: Interfaz de usuario para interactuar con las reservas.
- **Base de Datos (DB)**: Un contenedor de PostgreSQL para almacenar los datos de las reservas.

## Tecnologías

- **Backend**: Node.js, Graphql, Prisma
- **Frontend**: React.js
- **Base de Datos**: PostgreSQL
- **Contenedores**: Docker, Docker Compose

## Requisitos

Para ejecutar este proyecto, necesitarás tener instalados los siguientes programas en tu máquina:

- **Docker**: Para crear y gestionar contenedores.
- **Docker Compose**: Para orquestar múltiples contenedores y servicios.

### Instalación de Docker y Docker Compose

1. **Docker**: [Instalar Docker](https://docs.docker.com/get-docker/)
2. **Docker Compose**: [Instalar Docker Compose](https://docs.docker.com/compose/install/)

## Configuración de la Base de Datos

El contenedor de la base de datos PostgreSQL está configurado con las siguientes variables de entorno:

- `POSTGRES_USER`: Usuario para la base de datos.
- `POSTGRES_PASSWORD`: Contraseña para el usuario.
- `POSTGRES_DB`: Nombre de la base de datos.

Estas variables se encuentran definidas en el archivo `docker-compose.yml` y se usan para crear la base de datos automáticamente cuando se levanta el contenedor.

### Variables de Entorno

Asegúrate de que las siguientes variables de entorno estén correctamente configuradas:

- **`DATABASE_URL`**: URL de la base de datos para el backend, configurada como:
  ```bash
  postgresql://lucianoojeda:Cosmefulanito12@db:5432/restaurant_db
