# Pastebin-Lite Frontend

A React frontend for creating and sharing text pastes with optional expiration.

## Features
- Create text pastes
- Optional TTL (time-to-live) and view limits
- Share pastes via unique URLs
- Copy URL to clipboard

## Tech Stack
- React 18
- Axios (HTTP client)
- React Router (routing)

## Local Setup

### Prerequisites
- Node.js 16+
- Backend API running

### Installation

1. Clone and install:
```bash
git clone <your-repo-url>
cd pastebin-frontend
npm install
```

2. Configure environment (create `.env`):
```
REACT_APP_API_URL=http://localhost:8000
```

3. Start server:
```bash
npm run dev
```

Application runs at `http://localhost:3000`

## Project Structure
```
src/
├── components/
│   ├── CreatePaste.jsx    # Create paste form
│   └── ViewPaste.jsx      # View paste page
├── services/
│   └── api.js             # API calls
└── App.js                 # Main app with routing
```

## API Endpoints Used
- `POST /api/pastes` - Create paste
- `GET /api/pastes/:id` - Fetch paste

## Deployment

**Platform**: Railway

**Steps**:
1. Push to GitHub
2. Connect repository to Railway
3. Add environment variable: `REACT_APP_API_URL=https://your-backend-url.railway.app`
4. Railway auto-detects React and deploys

**Live URLs**:
- Frontend: https://independent-adaptation-production.up.railway.app/
- Backend: https://pastebin-api-production.up.railway.app/

## Environment Variables

| Variable | Example |
|----------|---------|
| `REACT_APP_API_URL` | `http://localhost:8000` |
