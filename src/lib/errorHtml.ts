/**
 * Returns a branded HTML error page as a Response.
 * Used by API routes (/api/download-token, /api/download) when a download
 * cannot proceed, so the user sees a readable message instead of raw JSON.
 */
export function errorHtml(message: string, status = 400): Response {
  // Basic HTML escaping to prevent any XSS if message is ever dynamic
  const escaped = message
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Download Unavailable — The First Resident of Briar Glen</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; }
    body {
      margin: 0;
      background: #151512;
      color: #f3ead8;
      font-family: system-ui, -apple-system, sans-serif;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem;
    }
    .card {
      max-width: 560px;
      width: 100%;
      padding: 3rem 3.5rem;
      border: 1px solid rgba(198, 167, 92, 0.25);
      background: #20281f;
      border-radius: 2px;
    }
    .label {
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.25em;
      color: #c6a75c;
      margin: 0 0 1rem;
    }
    h1 {
      font-size: 1.75rem;
      font-weight: 400;
      margin: 0 0 1.25rem;
    }
    p { color: #dfcfb0; line-height: 1.7; margin: 0 0 1rem; }
    a { color: #c6a75c; text-decoration: underline; }
    a:hover { color: #f3ead8; }
    .links { margin-top: 2rem; display: flex; flex-direction: column; gap: 0.5rem; font-size: 0.875rem; }
  </style>
</head>
<body>
  <div class="card">
    <p class="label">Download Unavailable</p>
    <h1>We&rsquo;re sorry</h1>
    <p>${escaped}</p>
    <div class="links">
      <a href="/">Return to thefirstresident.com</a>
      <a href="mailto:partn54digital@gmail.com">Contact support: partn54digital@gmail.com</a>
    </div>
  </div>
</body>
</html>`;

  return new Response(html, {
    status,
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
