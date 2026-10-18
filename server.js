const express = require('express');
const path = require('node:path');

const app = express();
const port = Number(process.env.PORT) || 3000;
const publicDirectory = path.join(__dirname, 'public');

app.disable('x-powered-by');
app.use((_request, response, next) => {
  response.set({
    'Content-Security-Policy': [
      "default-src 'self'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
      "object-src 'none'",
      "img-src 'self' https://images.unsplash.com data:",
      "style-src 'self' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "script-src 'self'",
      'upgrade-insecure-requests',
    ].join('; '),
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  });
  next();
});
app.use(express.static(publicDirectory, { maxAge: '1h' }));

app.use((_request, response) => {
  response.status(404).sendFile(path.join(publicDirectory, '404.html'));
});

app.listen(port, () => {
  console.log(`Sean's Photography is running at http://localhost:${port}`);
});
