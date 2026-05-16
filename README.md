# To-Do List MERN App

A full-stack To-Do application built with:

- MongoDB (database)
- Express + Node.js (backend API)
- React + Vite (frontend)

This repository contains two main projects:

- `server/` - Express + Mongoose API
- `To-DO-App-Mern/` - React frontend (Vite)

## Project Structure

```text
toDoList/
  server/
    index.js
    models/
      Todo.js
    package.json
  To-DO-App-Mern/
    src/
    package.json
    vite.config.js
```

## Features

- Create a task
- List all tasks
- Mark a task as done
- Delete a task

## API Endpoints

Base URL (default): `http://localhost:3001`

- `GET /get` - fetch all todos
- `POST /add` - create todo
  - body: `{ "task": "Your task" }`
- `PUT /update/:id` - mark todo as done
- `DELETE /delete/:id` - delete todo

## Prerequisites

- Node.js 18+
- npm
- MongoDB Atlas (or a MongoDB instance)

## Environment Variables

The backend reads one of these variables:

- `CONN_STR` (preferred in current code)
- `MONGODB_URI` (fallback)

Create a `.env` file in `server/`:

```env
CONN_STR=your_mongodb_connection_string
PORT=3001
```

## Installation

Install backend dependencies:

```bash
cd server
npm install
```

Install frontend dependencies:

```bash
cd ../To-DO-App-Mern
npm install
```

## Run in Development

Use two terminals.

Terminal 1 (backend):

```bash
cd server
npm start
```

Terminal 2 (frontend):

```bash
cd To-DO-App-Mern
npm run dev
```

Frontend runs on Vite dev server (commonly `http://localhost:5173` or `http://localhost:5174`).

## Frontend API Configuration

Frontend API base URL is configured in `To-DO-App-Mern/src/config.js`:

```js
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";
```

If needed, create `To-DO-App-Mern/.env`:

```env
VITE_API_BASE_URL=http://localhost:3001
```

## Build Notes

The frontend uses Vite (`dist/` output), while the backend currently includes a static serve block that points to `client/build`.

For local development, run frontend and backend separately as shown above.

## Scripts

Backend (`server/package.json`):

- `npm start` - start backend with nodemon

Frontend (`To-DO-App-Mern/package.json`):

- `npm run dev` - start Vite dev server
- `npm run build` - production build
- `npm run preview` - preview production build
- `npm run lint` - run ESLint

## Troubleshooting

- Backend fails at startup with env var error:
  - Ensure `CONN_STR` or `MONGODB_URI` is set in `server/.env`.
- Frontend cannot reach backend:
  - Confirm backend is running on port `3001`.
  - Confirm `VITE_API_BASE_URL` matches backend URL.
- Mongo connection timeout:
  - Verify Atlas IP allowlist and credentials in connection string.

