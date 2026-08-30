# MyLoginApp Backend

Express.js backend, written in TypeScript, for the MyLoginApp login/registration system. Serves as the API layer for the [MyLoginFrontend](https://github.com/PersonalDevWorks/MyLoginFrontend) React application.

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express 5
- **Language:** TypeScript
- **Dev tooling:** ts-node-dev (hot reload)

## Project Structure

```
Backend/
├── src/
│   └── index.ts       # Entry point
├── dist/               # Compiled output (git-ignored)
├── package.json
├── tsconfig.json
└── .gitignore
```

## Getting Started

### Prerequisites

- Node.js (v22+ recommended)
- npm

### Installation

```bash
npm install
```

### Running in development

Starts the server with hot reload on file changes:

```bash
npm run dev
```

Server runs at `http://localhost:8080` by default.

### Building for production

Compiles TypeScript to JavaScript in the `dist/` folder:

```bash
npm run build
```

### Running the production build

```bash
npm start
```

## Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Run the server in development mode with hot reload |
| `npm run build` | Compile TypeScript to `dist/` |
| `npm start` | Run the compiled production build |

## API Endpoints

_Document endpoints here as they're built, e.g._

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Health check |

## License

MIT