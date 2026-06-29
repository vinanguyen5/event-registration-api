# Security Configuration Justification

## Helmet.js Configuration

### Configuration Applied

This API uses a custom Helmet configuration in `config/helmetConfig.ts`.

The configuration includes:

- `contentSecurityPolicy: false`
- `hidePoweredBy: true`
- `noSniff: true`
- `hsts` disabled in development and enabled in production
- `frameguard: { action: "deny" }`
- `referrerPolicy: { policy: "no-referrer" }`

### Justification

`contentSecurityPolicy` is disabled because this project is a JSON API and does not serve HTML pages. Content Security Policy is mainly used to reduce browser-based injection risks for web pages. Since this API returns JSON responses, disabling CSP avoids unnecessary browser policy complexity while keeping other API security headers enabled.

`hidePoweredBy` is enabled so the API does not reveal Express as the server technology. Reducing exposed technology information helps limit what attackers can learn from response headers.

`noSniff` is enabled to prevent browsers from MIME sniffing API responses. This helps ensure that responses are treated as the content type the server declares.

`hsts` is disabled during development because the local API runs over HTTP. In production, HSTS is enabled for one year with subdomains and preload so browsers will prefer HTTPS connections.

`frameguard: { action: "deny" }` is enabled to prevent the API responses from being embedded in frames. This helps protect against clickjacking-style attacks.

`referrerPolicy: { policy: "no-referrer" }` is enabled to prevent referrer information from being shared with other sites.

### Sources

1. Helmet.js Official Documentation: https://helmetjs.github.io/
2. OWASP Secure Headers Project: https://owasp.org/www-project-secure-headers/
3. MDN Web Docs - HTTP Headers: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers

## CORS Configuration

### Configuration Applied

This API uses a custom CORS configuration in `config/corsConfig.ts`.

The configuration includes:

- Allowed origins from `ALLOWED_ORIGINS`
- Local development origins:
  - `http://localhost:3000`
  - `http://localhost:5173`
- `credentials: true`
- Allowed methods:
  - `GET`
  - `POST`
  - `PUT`
  - `DELETE`
  - `PATCH`
  - `OPTIONS`
- Allowed headers:
  - `Content-Type`
  - `Authorization`
- `optionsSuccessStatus: 204`

### Justification

The API does not use the default `cors()` configuration. Instead, it checks the request origin against an approved list. This is safer because it avoids allowing every website to access the API by default.

The local origins are included for development and testing. The `ALLOWED_ORIGINS` environment variable makes it possible to change allowed front-end URLs without editing source code.

`credentials: true` is configured so the API can support authenticated requests if needed. Because credentials are allowed, the API should not use a wildcard origin.

The allowed methods are limited to the HTTP methods used by the API. This follows the principle of only allowing what the application needs.

The allowed headers are limited to `Content-Type` and `Authorization` because JSON requests need `Content-Type`, and protected endpoints may need `Authorization`.

`optionsSuccessStatus: 204` is used for successful preflight requests.

### Sources

1. Express CORS Middleware Documentation: https://github.com/expressjs/cors
2. MDN Web Docs - Cross-Origin Resource Sharing: https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS
3. OWASP Cross Origin Resource Sharing Guidance: https://owasp.org/www-community/attacks/CORS_OriginHeaderScrutiny
