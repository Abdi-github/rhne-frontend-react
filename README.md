# RHNe Frontend

Public website for the **RHNe** (Réseau hospitalier neuchâtelois) hospital network. Lists hospital sites, medical services, doctors, events, job postings, patient info, and online appointment booking — all in four languages.

Built with React 18, Vite 5, TypeScript, MUI 6, Redux Toolkit, and i18next.

## Getting started

```bash
cp .env.production.example .env   # adjust API URL for local dev
npm install
npm run dev                        # http://localhost:5174
```

The API must be running at the URL configured in `VITE_API_URL` (default: `http://localhost:5000/api/v1`).

## Scripts

```
npm run dev             # dev server (port 5174)
npm run build           # production build
npm run preview         # preview production build
npm run lint            # ESLint
npm test                # Vitest
npm run test:ui         # Vitest with UI
npm run test:coverage   # coverage report
```

## Environment

| Variable | Description |
| --- | --- |
| `VITE_API_URL` | Backend API base URL |
| `VITE_APP_NAME` | App name (shown in title) |
| `VITE_DEFAULT_LANGUAGE` | Default language (`fr`) |

## Languages

Supports FR, EN, DE, IT. Default is French. Language is detected from the browser and can be switched in the UI.

## Docker

```bash
docker compose -f docker-compose.prod.yml up -d --build
```

Production URL: https://rhne.swiftapp.ch

## License

Private — All rights reserved.
