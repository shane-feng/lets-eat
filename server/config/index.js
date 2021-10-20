module.exports = {
  port: process.env.PORT || 8000,
  dbURL: process.env.DATABASE_URL,
  secret: process.env.SECRET || 'secret',
  tokenExpiresInHours: process.env.TOKEN_EXPIRES_IN_HOURS || '24h',
  requestSizeLimit: process.env.REQUEST_SIZE_LIMIT || 3,
};
