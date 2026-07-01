# AGENTS.md — RPP Pramuka Kaffah

## Overview

Single-page Vue 3 + Tailwind CSS app for managing scout (Pramuka) lesson plans (RPP). All code is in `index.html` — no build step, no package manager, no tests. Backend is Google Apps Script for cross-device sync.

## Key facts

- **Single file**: `index.html` contains HTML, CSS (Tailwind CDN), and Vue 3 app (CDN, `vue.global.js`). No npm/node.
- **Google Apps Script**: Cloud sync URL is hardcoded at line 292. The app checks if it's the placeholder URL — if so, it shows a warning and runs locally only.
- **Users**: 12 hardcoded accounts (lines 363–376). All share password `123456789`. IDs are lowercase name slugs (e.g. `hamidi`, `bellamonalisa`).
- **Material bank**: 22 Siaga + 23 Penggalang SKU materials hardcoded in `bankMateri` (lines 311–360). Select a golongan + index to auto-fill the form.
- **Auto-sync**: After login, fetches cloud data every 10 seconds (`setInterval(loadDataOnline, 10000)`).
- **Print**: Uses `@media print` CSS (lines 12–17). The `#print-area` div is hidden on screen, visible when printing. Triggered by `window.print()`.
- **Language**: Indonesian throughout (UI, comments, data).

## Commands

None — this is a static HTML file opened directly in a browser. No dev server, no build, no tests.

## Gotchas

- `mode: 'no-cors'` is used for POST to Google Apps Script (line 435) — responses are opaque, so success is assumed unless the request throws.
- Adding new users requires editing the `dataUser` array; adding materials requires editing `bankMateri`.
- If deploying, update the `gscriptUrl` at line 292 to your deployed Google Apps Script web app URL.
