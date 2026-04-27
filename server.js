// Minimal static-file server for clearledgr.com on Railway.
//
// Why a Node server (instead of pure static hosting): Railway needs a
// process that binds a port. ~30 lines of Express is the simplest
// way to serve the html/css/js with proper Cache-Control + a /healthz
// for the Railway healthcheck.

const express = require('express');
const path = require('path');

const PORT = Number(process.env.PORT || 3000);
const STATIC_DIR = __dirname;

const app = express();

// Trust the Railway proxy so req.protocol and req.ip reflect the
// client, not the internal hop.
app.set('trust proxy', 1);

// Force www → apex. The marketing site lives at clearledgr.com; the
// www variant is preserved for cert flexibility but redirects.
app.use((req, res, next) => {
  const host = String(req.headers.host || '').toLowerCase();
  if (host === 'www.clearledgr.com') {
    return res.redirect(301, `https://clearledgr.com${req.originalUrl}`);
  }
  return next();
});

// Healthcheck for Railway (must return 200 fast, no asset access).
app.get('/healthz', (_req, res) => {
  res.set('Cache-Control', 'no-store');
  res.json({ status: 'ok' });
});

// Static assets: short cache for HTML, long cache for fingerprintable
// assets. Since this site has no build hashing today, all assets get
// the modest cache to keep deploys feeling instant.
app.use(express.static(STATIC_DIR, {
  index: 'index.html',
  extensions: ['html'],
  setHeaders(res, filePath) {
    if (filePath.endsWith('.html')) {
      res.set('Cache-Control', 'public, max-age=300, must-revalidate');
    } else if (/\.(css|js|svg|png|jpg|jpeg|webp|woff2?)$/i.test(filePath)) {
      res.set('Cache-Control', 'public, max-age=86400');
    }
  },
}));

// Pretty URLs: /pricing → pricing.html (covered by `extensions` above
// when the path doesn't include a dot). 404 falls through to the
// default Express response, which is fine for a marketing site.

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`[clearledgr.com] static server listening on :${PORT}`);
});
