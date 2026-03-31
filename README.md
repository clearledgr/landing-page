# Clearledgr Landing Page

Standalone marketing page for Clearledgr's Gmail-first AP workflow.

## Files

- `index.html`
- `styles.css`
- `script.js`
- `assets/`

## Assets

- `assets/demo-poster.png`
- `assets/demo-reel.gif`
- `assets/gmail-inbox-surface.png`
- `assets/gmail-thread-panel.png`
- `assets/ops-control-plane.png`
- `assets/favicon.png`

## Local Preview

From the project root:

```bash
python3 -m http.server 4173 --directory landing-page
```

Then open:

```text
http://127.0.0.1:4173
```

## Current Direction

- Streak-inspired page structure, adapted for Clearledgr's AP-from-Gmail positioning
- buyer-facing copy only; no fundraising or internal product language
- hero built around a short animated demo assembled from real product screens
- embedded `Book a demo` form with Netlify Forms markup for production
- local preview preserves a JS-only success state instead of requiring a live form backend
