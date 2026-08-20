# PhysaFlow — Stranded Capacity Calculator

> **No-Country Simulation** — Team 12

---

## Overview

PhysaFlow is a web application that helps data center operators estimate how much computing capacity they are wasting ("stranded capacity") and how much it costs them annually.

The operator enters three pieces of information — facility size in MW, utilization percentage, and cooling type — and the system calculates the stranded capacity in both percentage and megawatts, along with an estimated annual financial loss range.

The project consists of two independent applications that work together:

- **Frontend** — A React single-page application that provides the user interface for inputting data and displaying results.
- **Backend** — A Node.js REST API that performs the calculations, persists results to a database, and generates PDF reports.

Both are in early development. The backend API is substantially built out with full CRUD operations, Swagger documentation, and PDF generation. The frontend is in initial scaffolding with placeholder components — no backend integration has been implemented yet.

---

## Features

### Backend (implemented)

- **Stranded Capacity Calculation** — Accepts facility parameters and computes stranded capacity and financial loss using configurable formulas with cooling-type factors.
- **REST API** — Full CRUD for calculations and lead registration.
- **PDF Generation** — Individual reports (executive summary + detailed analysis) and comparison reports for two scenarios, built with PDFKit.
- **Lead Management** — Register and link leads to calculations via email.
- **Swagger Documentation** — Interactive OpenAPI 3.0.3 docs at `/api-docs`.
- **Seed Scripts** — Populate the database with test data (3 leads, 10 calculations, 4 shared results).
- **Centralized Error Handling** — Consistent error responses across all endpoints.

### Frontend (scaffolded)

- **Landing Page** — Basic home page with placeholder content.
- **Routing** — React Router configured with a single route (`/` → Home).
- **Navigation Bar** — Placeholder fixed-position navbar.
- **Styling** — Tailwind CSS 4 configured and ready for use.

> The frontend does not currently communicate with the backend. Calculator functionality, result display, PDF downloads, lead registration, and all other interactive features are planned but not yet implemented.

### Intended User Flow

```
1. User arrives at the landing page
2. Enters facility data (MW, utilization %, cooling type)
3. System calculates stranded capacity and financial loss
4. Results displayed immediately (no login required)
5. Optional: user can share basic results or register/login
6. With login: full breakdown across 3 layers (Facility → IT → Workload),
   scenario comparison, PDF download, calculation history
```

Only steps 1-4 are partially scaffolded. Steps 5-6 are defined in the design specification but not yet implemented.

---

## Tech Stack

| Layer         | Technologies                                                |
| ------------- | ----------------------------------------------------------- |
| Frontend      | React 19, Vite 8, Tailwind CSS 4, React Router 7/8          |
| Backend       | Node.js, Express 5, Sequelize 6, ES Modules                 |
| Database      | PostgreSQL (via Neon or local)                              |
| API           | REST (JSON), CORS                                           |
| PDF           | PDFKit (backend)                                            |
| Documentation | Swagger (swagger-jsdoc + swagger-ui-express), OpenAPI 3.0.3 |
| Validation    | validator (backend DTOs)                                    |
| Development   | nodemon (backend), ESLint (frontend)                        |

---

## Architecture

### System Architecture

```
┌─────────────────────┐
│       Browser       │
│  React / Vite SPA   │
└─────────┬───────────┘
          │ HTTP (fetch)
          ▼
┌─────────────────────┐
│  Node.js / Express  │
│      REST API       │
└─────────┬───────────┘
          │
    ┌─────┴─────┐
    ▼           ▼
┌────────┐ ┌──────────┐
│Services│ │  PDFKit  │
│  Logic │ │ Generator│
└───┬────┘ └──────────┘
    ▼
┌────────────────┐
│  PostgreSQL    │
│ (via Sequelize)│
└────────────────┘
```

The frontend and backend are separate applications that communicate over HTTP. The frontend runs on Vite's dev server (port 5173) and the backend runs on Express (port 3000). In production, the frontend would be served as static files and the backend as an API server.

### Backend Architecture

The backend follows a layered architecture:

```
Request → Routes → DTO (validates) → Controller → Service → Repository → Sequelize → PostgreSQL
```

| Layer            | Responsibility                                                          |
| ---------------- | ----------------------------------------------------------------------- |
| **Routes**       | Define endpoints and HTTP methods (Express Router)                      |
| **DTOs**         | Validate and transform incoming data                                    |
| **Controllers**  | Receive requests, delegate to services, send responses                  |
| **Services**     | Business logic, calculations, orchestration                             |
| **Repositories** | Abstract database queries from Sequelize                                |
| **Models**       | Define entity schema and relationships (Sequelize)                      |
| **Middlewares**  | Centralized error handling (`errorHandler.js`)                          |
| **Utils**        | Error classes (`AppError`), async wrapper (`catchAsync`), PDF utilities |

Key patterns:

- **catchAsync** — Wraps async controllers to eliminate repetitive try/catch blocks.
- **AppError** — Operational error class with `statusCode` and `isOperational` flag.
- **errorHandler** — Centralized middleware distinguishing Sequelize errors, validation errors, and application errors.

### Frontend Architecture

The frontend uses a component-based architecture with React:

```
Browser → main.jsx (BrowserRouter) → App.jsx → Navbar + Layout (Routes) → Pages
```

| Layer          | Description                                                |
| -------------- | ---------------------------------------------------------- |
| **main.jsx**   | Entry point, wraps app in `BrowserRouter` and `StrictMode` |
| **App.jsx**    | Root component rendering `Navbar` and `Layout`             |
| **Layout**     | Defines the route table using `react-router-dom`           |
| **Pages**      | Route-level components (currently only `Home`)             |
| **Components** | Reusable UI pieces (`Navbar`, `Layout`)                    |
| **index.css**  | Global styles with Tailwind CSS import                     |

**Planned architecture** (from design spec, not yet implemented):

- Feature-first directory structure (`features/auth`, `features/calculator`, etc.)
- Zustand for state management
- Framer Motion for layer visualization animations
- Recharts for comparison charts
- jsPDF for client-side PDF generation

### Database Schema

Three entities with the following relationships:

```
Lead (1) ────── hasMany ──────► Calculation (N)
   Calculation.lead_id is nullable (SET NULL on delete)

Calculation (1) ── hasMany ──► SharedResult (N)
   SharedResult.calculation_id is required (CASCADE on delete)
```

| Entity           | Key Fields                                                                                                                                                                                                         |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Lead**         | id (UUID), name, email (unique), source, status                                                                                                                                                                    |
| **Calculation**  | id (UUID), lead_id (UUID, nullable), facility_size_mw, utilization_percentage, cooling_type (array), stranded_capacity_percent, stranded_capacity_mw, annual_loss_min, annual_loss_max, formula_version, expiresAt |
| **SharedResult** | id (UUID), calculation_id (UUID, not null), view_count, share_token                                                                                                                                                |

The database is synced on server startup via `sequelize.sync({ alter: true })`, which creates or updates tables automatically. There are no formal migration files.

---

## Repository Structure

```text
.
├── backend/                    # REST API
│   ├── src/
│   │   ├── app.js              # Entry point
│   │   ├── config/             # database.js, swagger.js
│   │   ├── routes/             # Express Router definitions
│   │   ├── controllers/        # Request handlers
│   │   ├── services/           # Business logic
│   │   ├── repositories/       # Data access layer
│   │   ├── models/             # Sequelize entity definitions
│   │   ├── dto/                # Input validation
│   │   ├── middlewares/        # Error handling
│   │   └── utils/              # Helpers, PDF utilities
│   ├── scripts/                # seed.js, reset-calculations.js
│   ├── .env.example
│   └── package.json
├── frontend/                   # SPA
│   ├── src/
│   │   ├── components/         # Layout, Navbar
│   │   ├── pages/              # Home
│   │   ├── assets/             # Static images
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── public/                 # favicon.svg, icons.svg
│   ├── vite.config.js
│   ├── eslint.config.js
│   └── package.json
└── README.md
```

---

## Frontend

The frontend is a single-page application built with React 19 and Vite 8. It uses Tailwind CSS 4 for styling and React Router for client-side routing.

### Current State

The frontend is in initial development with placeholder components:

- **`main.jsx`** — Renders the app inside `BrowserRouter` and `StrictMode`.
- **`App.jsx`** — Renders `Navbar` and `Layout`.
- **`Layout.jsx`** — Defines a single route (`/` → `Home`).
- **`Navbar.jsx`** — Fixed-position placeholder navigation bar.
- **`Home.jsx`** — Landing page with static placeholder text.

### Routing

```text
/ → Home (placeholder)
```

Only the root route is defined. Additional routes (calculator, profile, auth) are planned but not yet implemented.

### Styling

Tailwind CSS 4 is configured via the `@tailwindcss/vite` plugin. Global styles are defined in `src/index.css` with `@import "tailwindcss"`. No custom theme or color palette has been configured yet.

### Design Specification

A detailed design specification exists at `frontend/README frontend.md`. It defines the planned feature-first architecture, the three-moment user flow (input → basic result → login), the 3-layer visualization concept (Facility → IT → Workload), and the color palette (forest green `#2d6a4f` + gold `#d4a017`). This is a planning document — the codebase does not yet reflect these designs.

---

## Backend

The backend is a REST API built with Express 5 and Sequelize 6, using ES Modules throughout.

### Swagger

Interactive API documentation:

```
http://localhost:3000/api-docs
```

Generated from `@swagger` JSDoc comments in route files via `swagger-jsdoc`. The spec includes reusable schemas for `Lead`, `Calculation`, and `SharedResult`, plus common error responses.

> **Note:** Authentication (`securitySchemes`) and production server URL are marked as TODO in the code.

### Error Handling

All errors are caught by `catchAsync` and processed by `errorHandler.js`, which distinguishes between:

- **AppError** — Operational errors (400, 404, 422, etc.)
- **SequelizeValidationError** — Model validation failures
- **SequelizeUniqueConstraintError** — Duplicate constraint violations
- **Unhandled errors** — 500 Internal Server Error

In `development` mode, error responses include stack traces. In `production`, they return generic messages.

---

## Frontend ↔ Backend Integration

**The frontend does not currently communicate with the backend.** There are no API client files, HTTP calls (`fetch`, `axios`), or service modules in the frontend codebase.

When integration is implemented, the frontend will call the backend REST API using:

- Backend URL: configurable via `VITE_API_URL` environment variable (not yet implemented)
- Default backend port: `http://localhost:3000`
- All API routes are prefixed with `/api`

---

## Prerequisites

- **Node.js** 18+
- **npm**
- **PostgreSQL** — local installation or a cloud provider such as [Neon](https://neon.tech)

---

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/No-Country-simulation/-S07-26-Team-12-PhysaFlow.git
cd -S07-26-Team-12-PhysaFlow
```

### 2. Backend

```bash
cd backend
npm install
cp .env.example .env    # Edit with your PostgreSQL credentials
```

### 3. Frontend

```bash
cd frontend
npm install
```

---

## Environment Variables

### Backend

Copy `backend/.env.example` to `backend/.env` and configure:

| Variable          | Description                  | Required | Example                             |
| ----------------- | ---------------------------- | -------- | ----------------------------------- |
| `NODE_ENV`        | Runtime environment          | Yes      | `development`                       |
| `PORT`            | Server listening port        | Yes      | `3000`                              |
| `DATABASE_URL`    | PostgreSQL connection string | Yes      | `postgres://user:pass@host:5432/db` |
| `FRONTEND_URL`    | Frontend URL for CORS        | No       | `http://localhost:5173`             |
| `SWAGGER_ENABLED` | Enable/disable Swagger docs  | No       | `true`                              |

> Variables without a default in the code are optional. Variables marked with no reference in the application code are placeholders for future features. **Never commit the `.env` file.**

The backend connects to PostgreSQL with SSL forced (`ssl.require: true`, `rejectUnauthorized: false`), designed for cloud providers like Neon. If you use a local database without SSL, adjust `src/config/database.js`.

### Frontend

The frontend does not currently use any environment variables. When backend integration is implemented, a `VITE_API_URL` variable will need to be configured in a `frontend/.env` file.

---

## Running the Application

The project requires two separate processes — one for the backend and one for the frontend.

### Terminal 1 — Backend

```bash
cd backend
npm run dev
```

The server starts at `http://localhost:3000`. On startup, Sequelize syncs models with the database automatically.

Verify the backend is running:

```bash
curl http://localhost:3000/health
```

### Terminal 2 — Frontend

```bash
cd frontend
npm run dev
```

Vite starts the dev server at `http://localhost:5173` (default port).

### Database

The backend handles database setup automatically on startup via `sequelize.sync({ alter: true })`. No manual migration or schema creation is needed.

To populate the database with sample data:

```bash
cd backend
npm run seed
```

This creates 3 leads, 10 calculations, and 4 shared results.

---

## Using the Application

The frontend is currently a placeholder with no interactive functionality. Here is what exists and what is planned:

### Currently Available

1. Open `http://localhost:5173` in your browser.
2. You see the `Home` page with placeholder text ("Physaflow — Bienvenido a Physaflow").
3. The `Navbar` is visible at the top of the page.

### Planned User Experience (not yet implemented)

1. User lands on the landing page and clicks "Calculate my capacity".
2. User fills in the calculator form (facility size MW, utilization %, cooling type).
3. Frontend sends a `POST` request to `POST /api/calculations/calculate`.
4. Backend computes stranded capacity and financial loss, returns the result.
5. Frontend displays the result immediately (stranded capacity %, MW, annual loss range).
6. User can optionally share the result or log in/register for advanced features.
7. With login: 3-layer visualization, scenario comparison, PDF download, calculation history.

### Backend API (available directly)

The API can be used directly via Swagger UI or HTTP client:

1. Open `http://localhost:3000/api-docs`.
2. Use the `POST /api/calculations/calculate` endpoint to compute stranded capacity.
3. Use `GET /api/calculations/:id/pdf` to generate a PDF report.
4. Use `POST /api/leads/register` to link a calculation to a lead.

---

## Scripts

| Area     | Command           | Description                             |
| -------- | ----------------- | --------------------------------------- |
| Backend  | `npm run dev`     | Start backend with hot-reload (nodemon) |
| Backend  | `npm start`       | Start backend in production mode        |
| Backend  | `npm run seed`    | Populate database with test data        |
| Frontend | `npm run dev`     | Start Vite dev server                   |
| Frontend | `npm run build`   | Generate production build in `dist/`    |
| Frontend | `npm run preview` | Preview production build locally        |
| Frontend | `npm run lint`    | Run ESLint                              |

---

## Development

### Separation of Concerns

- **Backend** and **frontend** are fully independent applications with separate `package.json` files and dependencies.
- They communicate via HTTP — the frontend makes requests to the backend API.
- During development, both run simultaneously on different ports (3000 and 5173).
- CORS is enabled on the backend to allow cross-origin requests from the frontend dev server.

### Database Management

- Schema is defined in Sequelize models (`backend/src/models/`).
- Tables are synced automatically on server startup (`sequelize.sync({ alter: true })`).
- There are no formal migration files — the schema lives in the model definitions.
- Use `npm run seed` to populate test data, or `node scripts/reset-calculations.js` to drop and recreate the calculations table.

### API Documentation

- Swagger comments are written in `@swagger` JSDoc blocks directly in route files.
- The spec is configured in `backend/src/config/swagger.js`.
- Available at `http://localhost:3000/api-docs` when the backend is running.

---

## Troubleshooting

### Backend cannot connect to PostgreSQL

The backend requires a valid `DATABASE_URL` in `backend/.env`. The connection uses SSL by default (`ssl.require: true`). If connecting to a local database without SSL, edit `backend/src/config/database.js` and set `ssl.require: false`.

### Frontend cannot reach the API

The frontend is not yet configured to communicate with the backend. When integration is implemented, ensure:

- The backend is running on `http://localhost:3000`
- `VITE_API_URL` is set correctly in `frontend/.env`
- CORS allows the frontend origin

### Port already in use

- Backend defaults to port `3000`. Change it via the `PORT` variable in `backend/.env`.
- Frontend defaults to port `5173`. Vite will automatically use the next available port if 5173 is occupied.

### Database sync errors

If `sequelize.sync({ alter: true })` fails due to schema conflicts (e.g., ENUM type mismatches), run:

```bash
node scripts/reset-calculations.js
```

Then restart the backend to let Sequelize recreate the table.

---

## License

MIT
