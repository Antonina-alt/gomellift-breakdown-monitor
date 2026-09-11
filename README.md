# Gomellift Breakdown Monitor

A full-stack dashboard for importing, storing, and monitoring elevator breakdown data.

**Live Demo:** https://gomellift-breakdown-monitor.vercel.app/

## Overview

Gomellift Breakdown Monitor is a full-stack monitoring dashboard designed to display current elevator breakdowns.

The backend is prepared to receive data from an external business system through a protected HTTP API, validate and normalize incoming records, store import batches in Supabase, and expose the latest successful dataset to the frontend.

The React dashboard periodically checks for updated data and displays both the current breakdown list and the timestamp of the latest successful import.

## Features

### Breakdown Monitoring

* Current elevator breakdown dashboard
* Responsive data table
* Latest successful import timestamp
* Automatic data refresh every 5 minutes
* Initial loading state
* API error handling

### Data Import

* Protected HTTP import endpoint
* API key authentication
* Incoming data validation
* Data normalization
* Duplicate removal
* Import batch tracking
* Retrieval of the latest successful import
* Prepared for integration with external business systems such as 1C

## Architecture

```text
External Business System
          ↓ HTTP POST + API key
Node.js / Express API
          ↓
Supabase / PostgreSQL
          ↓
REST API
          ↓
React / Vite Dashboard
```

The backend handles imports and database access, while the frontend requests the latest successful dataset through the public breakdown API.

## Tech Stack

| Layer       | Technologies                                                      |
| ----------- | ----------------------------------------------------------------- |
| Frontend    | React, Vite, React Router, Bootstrap, React Bootstrap, DataTables |
| Backend     | Node.js, Express, CORS                                            |
| Database    | PostgreSQL, Supabase                                              |
| Integration | REST API, API key authentication                                  |
| Deployment  | Vercel, Render, Supabase                                          |

## API

### Get Current Breakdowns

```http
GET /api/breakdowns
```

Returns breakdown data from the latest successful import together with its timestamp.

### Import Breakdown Data

```http
POST /api/breakdowns/import
```

The import endpoint is protected using:

```http
x-api-key: <IMPORT_API_KEY>
```

It is intended for server-to-server integration with an external business system.

## Local Development

### Prerequisites

* Node.js and npm
* Supabase project

### Backend

```bash
cd server
npm install
```

Create `server/.env`:

```env
NODE_ENV=development
PORT=4000

SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

IMPORT_API_KEY=your_secret_import_api_key

CLIENT_URL=http://localhost:5173
```

Start the backend:

```bash
npm run dev
```

The API runs at:

```text
http://localhost:4000
```

### Frontend

```bash
cd client
npm install
```

Create `client/.env`:

```env
VITE_API_URL=http://localhost:4000
```

Start the frontend:

```bash
npm run dev
```

The dashboard runs at:

```text
http://localhost:5173
```

## Project Structure

```text
.
├── client
│   └── src
│       ├── api
│       ├── assets
│       ├── components
│       ├── config
│       ├── constants
│       ├── features
│       ├── hooks
│       ├── pages
│       └── utils
│
├── server
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── repositories
│   ├── routes
│   ├── services
│   └── utils
│
└── README.md
```

The backend is organized into routes, controllers, services, repositories, middleware, and configuration layers. The frontend separates API access, configuration, features, reusable components, and page-level UI.

## Deployment Notes

* Frontend: Vercel
* Backend: Render
* Database: Supabase PostgreSQL

The frontend refresh interval is configured to 5 minutes.

The backend uses Render's free tier, so the first request after a period of inactivity may take longer while the service starts.
