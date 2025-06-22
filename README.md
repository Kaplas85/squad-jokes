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



## Before you begin

For this step, it's important to obtain your Client ID and Client Secret from your Google Cloud account. You can use your own credentials by creating them if you don't have them using the [following tutorial.](https://www.youtube.com/watch?v=tgO_ADSvY1I)

When creating your credentials, you'll need an Authorized Origin URL and an Authorized Redirect URI.

- Authorized Origin: http://localhost:8000
- Authorized Redirect URI: http://localhost:8000/oauth/external/google/redirect

If you don't want to create credentials, they will be shared privately for testing and use.

It's important to note that without these credentials, OAuth endpoints won't work.

### Add credentials
To launch the container, it's important to use the credentials correctly. To do this, you can go to the [compose.yml](./compose.yml) file and change the API service's environment variables.
```yml
  api:
    build: .
    ports:
      - "8000:8000"
    environment:
      - DATABASE_URL=postgresql://postgres:postgres@db:5432/squadjokes
      - SECRET_KEY=f2d0078191f67940255cff2e5e500ab8e8f9e6ae2d0cdbd813a3ef4368804078
      - GOOGLE_CLIENT_ID=<insert-here> # Change this
      - GOOGLE_CLIENT_SECRET=<insert-here> # Change this
      - NOTIFIER_METHOD=email
    depends_on:
      - db
    volumes:
      - .:/opt/app
    command: yarn dev
```

## Getting Started with Docker and Docker Compose

### 1. Clone the repository

```sh
git clone <repo-url>
cd squad-jokes
```

### 2. Build the containers
```sh
docker compose build
```

### 3. Start the server

```sh
docker compose up -d
```

### 4. Run migrations

```sh
docker compose exec api yarn db:migrate
```

The API will be available at [http://localhost:8000](http://localhost:8000).

### 7. Run tests

```sh
docker compose exec api yarn tests
```

## Getting Started Local
If you want to launch the project without using Docker, you will need to make some modifications first.

### 1. Set environment variables
You'll need to rename the `.env.example` file to `.env`. Inside this file, you'll need to set all the variables for the project to work.

Make sure you have a Postgres database to connect to.

### 2. Apply migrations
```sh
yarn db:migrate
# or
npm run db:migrate
```

### 3. Up the server
```sh
yarn dev:local
# or
npm run dev:local
```

### 4. Run tests
```sh
yarn run tests
# or
npm run tests
```

## Test notes
During testing, I found that sometimes the Dadjokes and Chuckjokes APIs can take a long time to respond, resulting in tests using this API failing.

A pipeline was also added to ensure the functionality of the tests in the project.