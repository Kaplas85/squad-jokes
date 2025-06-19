# Squad Jokes API

A simple Node.js REST API for fetching, saving, updating, and deleting jokes, as well as performing basic math operations. Built with Express, Drizzle ORM, and PostgreSQL.

## Features

- Fetch random jokes from external APIs (Chuck Norris and Dad jokes)
- CRUD operations for jokes stored in a PostgreSQL database
- Math utilities: Least Common Multiple (LCM) and increment operations
- RESTful endpoints
- Docker and Docker Compose support

## Project Structure

```
src/
  controllers/   # Route handlers for jokes and math
  db/            # Database connection and schema
  routes/        # Express route definitions
  services/      # Business logic for jokes and math
  index.js       # App entrypoint
  server.js      # Express app setup
tests/           # Jest + Supertest API tests
drizzle/         # Drizzle ORM migrations and metadata
data/            # Database data (for Docker volume)
```

## Requirements

- Node.js 22+
- PostgreSQL (local or via Docker)
- Yarn or npm

## Getting Started

### 1. Clone the repository

```sh
git clone <repo-url>
cd squad-jokes
```

### 2. Install dependencies

```sh
yarn
# or
npm install
```

### 3. Configure the database

Set the `DATABASE_URL` environment variable. Example for local development:

```
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/squadjokes
```

### 4. Run database migrations

```sh
yarn db:migrate
# or
npm run db:migrate
```

### 5. Start the server

```sh
yarn dev
# or
npm run dev
```

The API will be available at [http://localhost:8000](http://localhost:8000).

### 6. Run tests

```sh
yarn tests
# or
npm run tests
```

## API Endpoints

### Jokes

- `GET /jokes` — Fetch a random joke (from Chuck Norris or Dad jokes)
- `GET /jokes?source=chuck` — Fetch a Chuck Norris joke
- `GET /jokes?source=dad` — Fetch a Dad joke
- `GET /jokes/emparejados` — Fetch 5 Chuck Norris and 5 Dad jokes, paired creatively
- `POST /jokes` — Save a new joke (`{ joke: "text" }`)
- `PUT /jokes/:id` — Update a joke by ID (`{ joke: "new text" }`)
- `DELETE /jokes/:id` — Delete a joke by ID

### Math

- `GET /math/lcm?numbers=2,3,5` — Calculate the LCM of numbers
- `GET /math/increment?number=41` — Increment a number

## Development with Docker

You can run the API and database using Docker Compose:

```sh
docker compose up
```

This will start both the API and a PostgreSQL database.

