import type { Context, Next } from 'hono';

// ─── Rate Limiter (in-memory, edge-friendly) ──────────────────────────────
const rateLimitStore = new Map<string, { count: number; reset: number }>();

export function rateLimit(maxRequests = 30, windowMs = 60000) {
  return async function(c: Context, next: Next) {
    const ip =
      c.req.header('CF-Connecting-IP') ||
      c.req.header('X-Forwarded-For')?.split(',')[0].trim() ||
      'unknown';

    const key = `rl:${ip}`;
    const now = Date.now();
    const entry = rateLimitStore.get(key);

    if (!entry || now > entry.reset) {
      rateLimitStore.set(key, { count: 1, reset: now + windowMs });
    } else {
      entry.count++;
      if (entry.count > maxRequests) {
        c.header('X-RateLimit-Limit', String(maxRequests));
        c.header('X-RateLimit-Remaining', '0');
        c.header('X-RateLimit-Reset', String(Math.ceil(entry.reset / 1000)));
        c.header('Retry-After', String(Math.ceil((entry.reset - now) / 1000)));
        return c.json({ error: 'Too Many Requests', retryAfter: Math.ceil((entry.reset - now) / 1000) }, 429);
      }
      c.header('X-RateLimit-Remaining', String(maxRequests - entry.count));
    }

    // Cleanup old entries periodically
    if (rateLimitStore.size > 10000) {
      const cutoff = now - windowMs;
      rateLimitStore.forEach((v, k) => { if (v.reset < cutoff) rateLimitStore.delete(k); });
    }

    await next();
  };
}

// ─── Security Headers ─────────────────────────────────────────────────────
export async function securityHeaders(c: Context, next: Next) {
  await next();
  c.header('X-Content-Type-Options', 'nosniff');
  c.header('X-Frame-Options', 'DENY');
  c.header('X-XSS-Protection', '1; mode=block');
  c.header('Referrer-Policy', 'strict-origin-when-cross-origin');
  c.header('Permissions-Policy', 'camera=(), microphone=(), geolocation=(self)');
  c.header(
    'Content-Security-Policy',
    [
      "default-src 'self'",
      "manifest-src 'self'",
      "script-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdn.tailwindcss.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com data:",
      "img-src 'self' data: https:",
      "connect-src 'self'",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'"
    ].join('; ')
  );
  c.header(
    'Strict-Transport-Security',
    'max-age=31536000; includeSubDomains; preload'
  );
}

// ─── CORS Middleware ──────────────────────────────────────────────────────
export async function corsMiddleware(c: Context, next: Next) {
  const origin = c.req.header('Origin');
  
  // Liste des domaines de confiance
  const trustedDomains = [
    'songre.bf',
    'songre.com',
    'songre.vercel.app',
    'localhost'
  ];

  const isTrusted = origin && trustedDomains.some(domain => origin.includes(domain));

  if (origin && isTrusted) {
    c.header('Access-Control-Allow-Origin', origin);
    c.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    c.header('Access-Control-Allow-Headers', 'Content-Type, Accept');
    c.header('Access-Control-Max-Age', '86400');
    c.header('Vary', 'Origin');
  }

  if (c.req.method === 'OPTIONS') {
    return c.text('', 204);
  }

  await next();
}
