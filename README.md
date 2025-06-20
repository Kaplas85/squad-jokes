# Squad Jokes API

A simple Node.js REST API for fetching, saving, updating, and deleting jokes, as well as performing basic math operations. Built with Express, Drizzle ORM, and PostgreSQL.

## Features

- Fetch random jokes from external APIs (Chuck Norris and Dad jokes)
- CRUD operations for jokes stored in a PostgreSQL database
- Math utilities: Least Common Multiple (LCM) and increment operations
- Notifications via email or SMS
- OAuth2 authentication with Google
- RESTful endpoints
- Docker and Docker Compose support

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

### 5. Configure Google Credentials
It is important to use a Google ClientID and ClientSecret to make OAuth endpoints work.

### 6. Start the server

```sh
yarn dev
# or
npm run dev
```

The API will be available at [http://localhost:8000](http://localhost:8000).

### 7. Run tests

```sh
yarn test
# or
npm run test
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

### Notifications

- `POST /notifications` — Send a notification (`{ recipient: "email_or_phone", message: "text" }`)

### Authentication

- `POST /auth/login` — Login with email and password (`{ email, password }`)
- `GET /api/usuario` — Access user-protected route
- `GET /api/admin` — Access admin-protected route
- `GET /oauth/external/google` — Start Google OAuth2 login
- `GET /oauth/external/google/redirect` — Google OAuth2 callback
- `GET /auth/external/callback` — Handle external login callback

## Development with Docker

You can run the API and database using Docker Compose:

```sh
docker compose up
```

This will start both the API and a PostgreSQL database.

## Testing

Run the tests to ensure everything is working correctly:

```sh
yarn test
# or
npm run test
```
