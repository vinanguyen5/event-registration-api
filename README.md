# Event Registration API

## Project Overview

The Event Registration API is a backend service for managing events and event registration information. It allows users to create, view, update, and delete event records.

This API is designed for developers who need a simple event management backend. It includes request validation, security headers, custom CORS settings, and OpenAPI documentation.

## Installation Instructions

### Prerequisites

* Node.js 20 or newer
* npm
* Git

### Setup

Clone the repository:

```bash
git clone https://github.com/vinanguyen5/event-registration-api.git
cd event-registration-api
```

Install dependencies:

```bash
npm install
```

Create your environment file:

```bash
copy .env.example .env
```

Update `.env` with your local settings and Firebase configuration.

Start the development server:

```bash
npm run dev
```

Build the project:

```bash
npm run build
```

Run tests:

```bash
npm test
```

## Local Documentation

When the server is running locally, Swagger UI is available at:

http://localhost:3000/api-docs

## Public Documentation

The deployed GitHub Pages documentation will be added after deployment.

## API Request Examples

### Get All Events

Request:

```bash
curl -X GET http://localhost:3000/api/v1/events
```

Expected response:

```json
{
  "message": "Events retrieved successfully",
  "data": []
}
```

### Create Event

Request:

```bash
curl -X POST http://localhost:3000/api/v1/events \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Tech Workshop\",\"date\":\"2026-09-15T18:00:00.000Z\",\"capacity\":50,\"category\":\"workshop\"}"
```

Expected response:

```json
{
  "message": "Event created successfully",
  "data": {
    "id": "1",
    "name": "Tech Workshop",
    "date": "2026-09-15T18:00:00.000Z",
    "capacity": 50,
    "registrationCount": 0,
    "status": "active",
    "category": "workshop"
  }
}
```

### Get One Event

Request:

```bash
curl -X GET http://localhost:3000/api/v1/events/1
```

Expected response:

```json
{
  "message": "Event retrieved successfully",
  "data": {
    "id": "1",
    "name": "Tech Workshop"
  }
}
```

## Security

This API uses custom Helmet.js and CORS configurations. The security choices are explained in `SECURITY.md`.

## Documentation Build

Generate the OpenAPI JSON file:

```bash
npm run generate-openapi
```

Generate the static documentation site:

```bash
npm run generate-docs
```
