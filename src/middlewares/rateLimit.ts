import rateLimit from 'express-rate-limit';

// ponytail: in-memory per-process store — adequate for single-instance dev.
// Upgrade path: replace store with RateLimitRedis or similar for clustered deployments.

export const apiLimiter = rateLimit({
  windowMs: 60_000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

export const authLimiter = rateLimit({
  windowMs: 60_000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { status: 'error', message: 'Too many auth attempts' },
});

export const qrGenerateLimiter = rateLimit({
  windowMs: 60_000,
  max: 3,
  standardHeaders: true,
  legacyHeaders: false,
  message: { status: 'error', message: 'Too many QR generation attempts' },
});
