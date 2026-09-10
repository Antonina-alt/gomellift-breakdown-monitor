# Gomellift Breakdown Monitor

A full-stack dashboard for monitoring elevator breakdowns.

The backend is prepared to receive breakdown data from an external business system through a protected HTTP API, store it in Supabase, and expose the latest successful import to the frontend.

🔗 **Live Demo:** https://gomellift-breakdown-monitor.vercel.app/

## Architecture

```text
External system
      ↓ HTTP POST
Node.js / Express API
      ↓
Supabase / PostgreSQL
      ↓
REST API
      ↓
React Dashboard
```

The frontend checks for updated data every 5 minutes and displays the timestamp of the latest successful import.

## Features

* Elevator breakdown dashboard
* Protected data import API
* Data validation and normalization
* Duplicate removal
* Import batch tracking
* Latest successful import retrieval
* 5-minute frontend polling
* Initial loading state and error handling
* Responsive data table

## Tech Stack

**Frontend**

* React
* Vite
* Bootstrap
* DataTables

**Backend**

* Node.js
* Express

**Database**

* PostgreSQL
* Supabase

**Deployment**

* Vercel
* Render
* Supabase

## API

### Get current breakdowns

```http
GET /api/breakdowns
```

Returns data from the latest successful import together with its timestamp.

### Import breakdown data

```http
POST /api/breakdowns/import
```

Protected with:

```http
x-api-key: <IMPORT_API_KEY>
```

The endpoint is prepared for integration with an external business system such as 1C.

## Local Development

### Backend

```bash
cd server
npm install
npm run dev
```

Create `server/.env`:

```env
PORT=4000
CLIENT_URL=http://localhost:5173
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
IMPORT_API_KEY=your-secret-import-api-key
```

### Frontend

```bash
cd client
npm install
npm run dev
```

Create `client/.env`:

```env
VITE_API_URL=http://localhost:4000
```

Frontend:

```text
http://localhost:5173
```

Backend:

```text
http://localhost:4000
```

## Project Structure

```text
client/   React frontend
server/   Node.js / Express API
```

The backend is structured into routes, controllers, services, repositories, middleware, and database access layers.

## Demo Note

The backend is hosted on Render's free tier, so the first request after a period of inactivity may take longer while the service starts.
