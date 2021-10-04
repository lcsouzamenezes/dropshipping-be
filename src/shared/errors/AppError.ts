class AppError extends Error {
  public readonly type: string
  public readonly message: string
  public readonly code: string
  public readonly statusCode: number

  constructor(message: string, code: string, statusCode = 400) {
    super(message)
    this.name = this.constructor.name
    this.message = message
    this.code = code
    this.statusCode = statusCode
  }
}

export { AppError }
