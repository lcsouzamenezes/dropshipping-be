class AppError extends Error {
  public readonly type: string;
  public readonly message: string;
  public readonly statusCode: number;

  constructor(message: string, statusCode = 400) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.statusCode = statusCode;
  }
}

export { AppError };
