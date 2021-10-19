declare module Express {
  interface Request {
    user?: {
      id: string
      account_id: string
    }
  }
}
