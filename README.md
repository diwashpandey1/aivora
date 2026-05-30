# Spam Detector Frontend

React, Vite, Tailwind CSS, Axios, and Chart.js frontend for the local AI Spam
Detection System.

## Local Setup

```powershell
npm install
Copy-Item .env.example .env
npm run dev
```

Open http://localhost:5173.

## Environment

```env
VITE_API_BASE_URL=http://localhost:8000
```

The app generates a stable anonymous `client_id`, stores it in localStorage, and
uses it for `/analyze` and `/history/{client_id}`.

## Scripts

```powershell
npm run dev
npm run lint
npm run build
npm run preview
```

## Structure

```text
src/
  components/     UI, cards, sections, and chart components
  constants/      Navigation, placeholders, metrics, and static UI config
  context/        Shared scan result context
  hooks/          Backend-backed scan history hook
  pages/          Route-level screens
  services/       Axios API client and response normalization
  utils/          Formatting and browser client identity helpers
```
