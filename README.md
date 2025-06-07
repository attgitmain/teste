# Docker Setup

This repository provides Docker configurations for the backend and frontend.

## Building the images

Use [docker-compose](https://docs.docker.com/compose/) to build and run all services:

```bash
docker-compose up --build
```

This command will start the following containers:

- **db** – PostgreSQL database storing application data
- **redis** – Redis instance used by the backend
- **backend** – Node.js API available on port `8081`
- **frontend** – React application served on port `3000`

To stop the containers run:

```bash
docker-compose down
```

The backend and frontend images are defined in their respective `Dockerfile`s located inside the `backend` and `frontend` folders.

