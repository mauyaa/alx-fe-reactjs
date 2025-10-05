# Recipe Sharing Platform

_Project by mauyaa_

A responsive recipe discovery SPA built with React, Vite, and Tailwind CSS. It showcases a curated list of dishes, lets visitors drill into full ingredient lists and steps, and includes a form for capturing new recipe ideas.

## Features
- Browse a responsive grid of recipe cards powered by Tailwind utility classes
- View full ingredient lists and preparation steps on the dedicated recipe detail page
- Capture new dishes through a client-side form with validation and instant state updates
- Global layout with sticky navigation, routing via React Router, and shared container utility classes
- Seed data stored as plain JSON for easy prototyping and replacement with a real API later

## Getting Started

### Prerequisites
- Node.js 18 or newer (includes npm)

### Installation
```bash
npm install
```

### Development Server
```bash
npm run dev
```
Vite will print a local URL (http://localhost:5173 by default). Open it in your browser to explore the app with hot module reloading.

### Production Build
```bash
npm run build
```
Generates the optimized production bundle in the `dist/` directory.

### Preview Production Build
```bash
npm run preview
```
Serves the contents of `dist/` locally so you can confirm the production output.

### Linting
```bash
npm run lint
```
Runs ESLint using the project configuration.

## Project Structure
```
.
|- index.html
|- package.json
|- postcss.config.js
|- tailwind.config.js
|- vite.config.js
|- src/
|  |- main.jsx            # App entry point and router bootstrap
|  |- App.jsx             # Top-level routes and state management
|  |- index.css           # Tailwind directives and shared utilities
|  |- data.json           # Seed recipe data for development
|  |- components/
|     |- Layout.jsx
|     |- HomePage.jsx
|     |- RecipeCard.jsx
|     |- RecipeDetail.jsx
|     |- AddRecipeForm.jsx
|- public/
```

## Tech Stack
- React 19 with functional components and hooks
- React Router DOM for client-side routing
- Tailwind CSS (v3) for styling
- Vite for lightning-fast dev server and builds

## Customization Tips
- Replace or extend `src/data.json` with your own recipes or wire the app to an API call inside `App.jsx`
- Tailwind utilities are defined globally in `src/index.css` and configured via `tailwind.config.js`
- Navigation links live in `Layout.jsx`; add more routes or external links as needed
- The add recipe form currently updates in-memory state; connect its `onAdd` handler to your persistence layer to store submissions

## Deployment
Any static hosting provider that can serve the `dist/` directory (Vercel, Netlify, GitHub Pages, etc.) will work. Build with `npm run build`, then upload the generated files.
