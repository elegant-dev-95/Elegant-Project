# Elegant Group IT Asset Control – Frontend (prototype)

Static HTML, CSS and JavaScript. No framework, no build step, no server needed.

## Run it

Open `index.html` in any modern browser (Chrome, Edge, Firefox). Every page works offline except the web font, which falls back to the system font.

## Files

| File | Purpose |
|---|---|
| `index.html` | Dashboard: headline figures, spend vs budget, spend by sister concern, assets by category, lifecycle, verification gauge, alerts, renewals |
| `assets.html` | Asset register: search, company / category / site filters, quick-filter chips, table |
| `asset-detail.html` | Asset record: repair-vs-replace banner, tabs for overview, assignments, service history, documents, activity log |
| `subscriptions.html` | Subscriptions & renewals: 30/60/90-day windows, seat usage, filters |
| `css/styles.css` | All styles. Colours and sizes are variables at the top (`:root`) |
| `js/data.js` | Sample data. **Replace with API calls** when the backend is ready |
| `js/app.js` | Sidebar, mobile menu, charts (plain SVG), filters, tabs, page logic |

## Connecting a backend

Each page reads from `window.DATA` in `js/data.js`. Swap each block for a fetch, keeping the same shape:

| Data block | Suggested endpoint |
|---|---|
| `DATA.dashboard` | `GET /api/dashboard?company=&period=` |
| `DATA.assets`, `DATA.assetCounts` | `GET /api/assets?q=&company=&category=&site=&status=&page=` |
| `DATA.assetDetail` | `GET /api/assets/:tag` |
| `DATA.subscriptions` | `GET /api/subscriptions` |

With a real backend, the asset list filtering and pagination should move to the server; the client-side filtering here is for the demo.

## Notes

- Sidebar links to screens not built yet (Assignments, Service tickets, Expenses, Vendors, Budget, Onboarding, Reports, Settings) point to `#`.
- All names, figures and sister-concern names are sample data.
- The QR code on the asset record is a placeholder; generate real codes server-side or with a QR library.
- Amounts use the Bangladeshi lakh format (`৳1,85,000`) via `toLocaleString('en-IN')`.
- Responsive: below 900 px the sidebar becomes a slide-out menu.
