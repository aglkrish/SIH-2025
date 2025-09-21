module.exports = {
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:3000',
  JWT_SECRET: process.env.JWT_SECRET || (() => {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('JWT_SECRET must be set in production');
    }
    return 'dev-secret-key-only-for-development';
  })(),
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/ayursutra',
  RATE_LIMIT_WINDOW_MS: 15 * 60 * 1000, // 15 minutes
  RATE_LIMIT_MAX_REQUESTS: 100, // limit each IP to 100 requests per windowMs
  CORS_ORIGIN: process.env.CORS_ORIGIN || process.env.FRONTEND_URL || 'http://localhost:3000'
};

