import type { Request, Response, NextFunction } from "express"
import { verifyToken } from "../utils/jwt"

export interface AuthRequest extends Request {
  user?: {
    userId: string
    email: string
  }
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction): void => {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader) {
      res.status(401).json({
        success: false,
        message: "Token não fornecido",
      })
      return
    }

    const parts = authHeader.split(" ")

    if (parts.length !== 2) {
      res.status(401).json({
        success: false,
        message: "Formato de token inválido",
      })
      return
    }

    const [scheme, token] = parts

    if (!/^Bearer$/i.test(scheme)) {
      res.status(401).json({
        success: false,
        message: "Token mal formatado",
      })
      return
    }

    const decoded = verifyToken(token)
    req.user = decoded

    next()
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Token inválido ou expirado",
    })
  }
}
