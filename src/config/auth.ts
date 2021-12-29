export default {
  token_secret: process.env.TOKEN_SECRET,
  // token_expires_in: 5, //15 minutes
  token_expires_in: 15 * 60, //15 minutes
  refresh_token_secret: process.env.REFRESH_TOKEN_SECRET,
  // refresh_token_expires_in: 5, //24 hours
  refresh_token_expires_in: 60 * 60 * 24, //24 hours
}
