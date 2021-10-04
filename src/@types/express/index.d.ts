declare module Express {
  interface Request {
    user?: {
      id: string
    }
  }
}
