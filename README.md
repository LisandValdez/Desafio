# NotasApp

A simple application to create, edit, archive, and list notes with a NestJS + Prisma backend and a React + Vite frontend.

---

## Technologies Used

- **Backend:**

  - Node.js 20
  - NestJS 9
  - Prisma 5
  - PostgreSQL 15 (running in Docker)

- **Frontend:**

  - React 18
  - Vite 5
  - Axios 1.4

- **Others:**
  - Docker & Docker Compose (to orchestrate backend, frontend, and database)

---

## Requirements to Run

- Docker Desktop (Linux/macOS/Windows with WSL2 recommended)
- Node.js >= 18 (needed to run the startup script)
- Git

---

## How to Run

1. Clone the repository and navigate into it:

```bash
git clone <repository-URL>
cd <repository-folder>

2. Run the startup script to launch the app (backend, frontend, DB):

node start.js

Open your browser and access the app at:
http://localhost:5173

Backend API is available at: http://localhost:3000/api

Available Scripts
node start.js: Launches the environment with Docker Compose, runs migrations and seed data.

In backend/ and frontend/ folders, you can use npm scripts for local development.

Database
PostgreSQL 15 runs inside Docker.

Prisma manages schema and migrations.

The connection URL is set in docker-compose.yml and passed to backend via DATABASE_URL.

Notes
Currently, there is no login functionality.

The backend exposes REST endpoints to create, list, update, delete, and archive notes.

The frontend allows creating and viewing notes.

Tagging and filtering will be added in phase 2.

Contact
For any questions or suggestions, contact [martinvaldez735@gmail.com]
```
# Desafio
# Desafio
