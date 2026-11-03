# CareConnect

React + Vite healthcare app: landing page, auth, Patient Dashboard, AI Results, Medical Reports and Hospital Analytics (pure-SVG charts, no extra dependencies).

## Run
```bash
npm install
npm run dev
```
Open http://localhost:5173

## Structure
- `src/pages` – Home, Login/Register, Dashboard
- `src/components` – Navbar, Footer
- `src/context/AuthContext.jsx` – demo auth (localStorage). Connect your real API here.
- `src/index.css` – all styling (colors in `:root` variables at the top)
- `src/assets/hero.jpg` – hero photo (replace with your own)

To change the theme, edit `--primary` and `--accent` in `src/index.css`.

## Demo login
Any valid email + a password of 6+ characters (auth is localStorage-only).

## Added structure
- `src/data/sampleData.js` – all sample data (replace with API calls)
- `src/components/Charts.jsx` – LineChart, BarChart, Donut, Meter
- `src/components/Modal.jsx`, `AppTabs.jsx` – reusable UI
- `src/hooks/useCountUp.js` – animated KPI numbers
- `src/pages/AIResults.jsx`, `Reports.jsx`, `Analytics.jsx`

## Build
```bash
npm run build && npm run preview
```
