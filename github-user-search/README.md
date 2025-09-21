# GitHub User Search (React + Vite)

A fast, responsive app to search GitHub users by username (basic) or with filters (advanced: location, min repos). Built with React, Axios, and Tailwind CSS. Ready to deploy on Vercel.

## Features
- Basic lookup: `/users/{username}` with loading/error states
- Advanced search: `/search/users?q=...` with
  - `location:"<city or country>"`
  - `repos:>=<n>`
  - optional free-text keyword
- Pagination & result augmentation (location + repo count via per-user fetch)
- Tailwind CSS UI

## Getting Started
```bash
npm install
npm run dev
```

## Environment
Copy `.env.example` to `.env` and (optionally) set:
```
VITE_APP_GITHUB_API_KEY=<your token>
```
Using a token increases rate limits for smoother searching.

## Build
```bash
npm run build
```

## Deploy (Vercel)
- Root directory (if monorepo): `github-user-search`
- Build command: `npm run build`
- Output directory: `dist`
- Env vars: set `VITE_APP_GITHUB_API_KEY` if used
