# AI Coding Agent Instructions

## Project overview

This is a small static website for `meyert — webdesign aus Köln`.

Files of interest:

- `index.html` — main page markup and page structure
- `style.css` — visual styling and theme variants
- `app.js` — client-side renderer that loads `config.json` and injects content
- `config.json` — site content and data used by `app.js`

## Key conventions

- The page is rendered client-side from `config.json`.
- `app.js` maps config fields into DOM content and handles the hero word rotator.
- `style.css` contains all visual theming, including mood, scale, and rotator styles.
- There is no build system or package manager in this repository; changes should work in a static environment.

## When making changes

- Update `config.json` for copy, links, hero text, services, work examples, and footer content.
- Modify `app.js` only when adding new content sections or changing how config values are rendered.
- Adjust `style.css` for layout, typography, color, spacing, and responsive behavior.
- Keep `index.html` minimal; it should mostly define section placeholders and markup IDs used by `app.js`.

## Useful notes for agents

- There is no separate backend, so all data changes are in `config.json` and front-end behavior is in `app.js`.
- `app.js` has default fallback values if `config.json` fails to load.
- The site is German-language by default and uses inline IDs for dynamic text replacement.
- For preview, open `index.html` in a browser or serve the folder as static files.
