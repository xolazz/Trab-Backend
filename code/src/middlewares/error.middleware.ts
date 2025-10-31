import type { Request, Response, NextFunction } from "express"

export class AppError extends Error {
  statusCode: number

  constructor(message: string, statusCode = 500) {
    super(message)
    this.statusCode = statusCode
    Error.captureStackTrace(this, this.constructor)
  }
}

export const errorHandler = (error: Error | AppError, req: Request, res: Response, next: NextFunction): void => {
  if (error instanceof AppError) {
    res.status(error.statusCode).json({
      success: false,
      message: error.message,
    })
    return
  }

  console.error("[v0] Error:", error)

  res.status(500).json({
    success: false,
    message: "Erro interno do servidor",
  })
}
