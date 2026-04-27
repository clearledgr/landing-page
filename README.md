# Clearledgr Marketing Site

The static site that lives at `clearledgr.com`. Separate from the
workspace SPA at `workspace.clearledgr.com` — only shares the brand.

## Pages

| Path | File | Purpose |
|---|---|---|
| `/` | `index.html` | Hero + features + integrations + demo CTA |
| `/security` | `security.html` | Security overview + how to request the evidence packet |
| `/about` | `about.html` | Mission, beliefs, team |
| `/contact` | `contact.html` | Demo / sales / support contact form |

There is intentionally no public pricing page — this matches the AI-native
finance peer pattern (Stacks.ai, getbasis.ai, etc.). Every commercial
inquiry routes through `/contact` until pricing is validated against
real customer conversations. Privacy policy and Terms live on the
workspace SPA at `workspace.clearledgr.com/privacy` and `/terms`.

## Stylesheets

- `styles.css` — design system + the homepage layout
- `pages.css` — companion-page primitives (subpage hero, pricing
  tiles, contact form, prose, stat row, footer links)

Both are loaded on every page so layout primitives stay in one place.

## Local preview

From the project root:

```bash
python3 -m http.server 4173 --directory landing-page
```

Then open `http://127.0.0.1:4173`. To preview a specific page, append
the filename — `/pricing.html`, `/security.html`, etc.

## Deploy

The site is fully static. Three deploy paths from cleanest to fastest:

1. **Cloudflare Pages** — point at this directory, no build step.
   Fastest CDN, free, includes free TLS for `clearledgr.com`.
2. **Netlify** — same as above. Form submissions on `contact.html`
   already use the `data-netlify="true"` attribute, so Netlify Forms
   captures leads automatically.
3. **Railway / Vercel** — also work; static sites only need an HTTP
   server.

### DNS at the apex

For `clearledgr.com` (apex), point to the Cloudflare/Netlify provided
IP (or use ALIAS/ANAME). For `www.clearledgr.com`, CNAME to the
provider's hostname. Redirect `www` → apex.

## Direction

- Streak-inspired structure adapted for finance teams
- Buyer-facing copy only; no internal product language or fundraising
- Hero is a short animated demo assembled from real product screens
- Mint `#00D67E` + navy `#0A1628` per the design system
- Forms use Netlify Forms markup; local preview keeps a JS-only
  success state so the form is testable without a backend
