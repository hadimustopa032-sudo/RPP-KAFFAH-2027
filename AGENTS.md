# AGENTS.md — RPP Pramuka Kaffah

Single-page Vue 3 + Tailwind CSS app for managing Pramuka lesson plans (RPP).
All code in `index.html` — no build, no npm, no tests. Google Apps Script for cloud sync.

## Key facts

- **Single file** (576 lines): HTML + Tailwind CDN (`@tailwindcss/browser@4`) + Vue 3 CDN (`vue.global.js`). Open in browser directly.
- **Cloud sync**: `gscriptUrl` at line 380. `loadDataOnline` (line 486) and `tambahJadwal` (line 509) both skip if `gscriptUrl` matches the hardcoded URL — so **cloud sync is effectively disabled** unless you change both the URL and the check strings.
- **Users**: 12 accounts in `dataUser` (lines 451–464). All password `123456789`. IDs are lowercase slugs (`hamidi`, `bellamonalisa`, etc.).
- **Materials**: 22 Siaga + 23 Penggalang SKU items in `bankMateri` (lines 398–448). Pick golongan + index to auto-fill the form.
- **Auto-refresh**: `setInterval(loadDataOnline, 10000)` after login (line 503).
- **Print**: `#print-area` div via `@media print` (lines 13–33). Triggered by `window.print()` (line 554).
- **Language**: Indonesian throughout (UI, comments, data).

## Data source of truth

`index.html` is the **single source of truth** for users, materials, and settings. The `.txt` files (`users.txt`, `materi-siaga.txt`, `materi-penggalang.txt`) are documentation copies only — edit `index.html` to make real changes.

## Gotchas

- `mode: 'no-cors'` used for POST (line 528) — responses are opaque; success assumed unless request throws.
- Adding users → edit `dataUser` array (~line 451); adding materials → edit `bankMateri` (~line 398); changing pangkalan data → edit `pengaturan` (~line 467).
- To enable real cloud sync: replace `gscriptUrl` value AND update both URL checks (lines 487, 510) to point to your deployed Apps Script URL.
- No dev server, no test runner, no formatter or linter config.
