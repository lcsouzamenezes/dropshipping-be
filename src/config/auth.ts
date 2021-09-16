export default {
  token_secret: process.env.TOKEN_SECRET,
  token_expires_in: 900, // 15 seconds (15 * 60)
  refresh_token_secret: process.env.REFRESH_TOKEN_SECRET,
  refresh_token_expires_in: 86400, // 24 hours (24 * 60 * 60)
};
