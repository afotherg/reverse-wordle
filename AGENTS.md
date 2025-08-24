# Repository Guidelines

## Project Structure & Module Organization
- `reverse-wordle.html`: Single-page app entry point and UI.
- `words.js`: Word list and small helpers used by the UI.
- `README.md`: User-facing usage notes; keep in sync with UI changes.
- No build system or backend; all assets live at repo root.

## Build, Test, and Development Commands
- Run locally (static server): `python3 -m http.server 8000` then open `http://localhost:8000/reverse-wordle.html`.
- Quick open (file URL): double-click `reverse-wordle.html` (use a server if browser blocks local file access).
- Optional server alternatives: `npx serve` or `ruby -run -e httpd . -p 8000`.

## Coding Style & Naming Conventions
- JavaScript: 2-space indent, trailing semicolons, single quotes.
- Naming: `camelCase` for functions/vars, `SCREAMING_SNAKE_CASE` for constants.
- Files: kebab-case for HTML (`reverse-wordle.html`), lower-case for simple scripts (`words.js`).
- Keep code browser-friendly (no Node-only APIs). Prefer small, self-contained functions.

## Testing Guidelines
- Current state: no automated tests. Validate changes by exercising typical flows (enter guesses, apply colors, undo, edge cases like short/invalid words).
- Console: ensure no errors/warnings in DevTools.
- If adding tests: place unit tests under `tests/` with `*.spec.js`; UI tests via Playwright/Cypress are welcome but optional.

## Commit & Pull Request Guidelines
- Commit messages: imperative, concise subject (≤72 chars). Examples: "fix grading for duplicate letters", "refactor: extract scoring logic".
- Scope each commit to one change; include context in body when helpful.
- Pull requests: clear description, before/after screenshots or GIFs for UI changes, steps to reproduce and test, and link related issues.

## Security & Configuration Tips
- Keep the app fully static; avoid adding remote scripts or trackers.
- Validate any new word list sources; large diffs in `words.js` should explain provenance.
- Browser support: prioritize evergreen browsers; avoid features requiring transpilation.

## Architecture Overview
- Simple client-side app: DOM interactions in `reverse-wordle.html` with data from `words.js`.
- Prefer small utilities in `words.js` and minimal inline script in HTML for clarity.
