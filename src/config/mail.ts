export default {
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT ?? 465,
  secure: process.env.SMTP_TLS ?? true, // use TLS
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD,
  },
}
