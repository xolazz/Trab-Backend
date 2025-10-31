import type { Request, Response, NextFunction } from "express"
import { AuthService } from "../services/auth.service"

export class AuthController {
  private authService = new AuthService()

  register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { name, email, password } = req.body

      if (!name || !email || !password) {
        res.status(400).json({
          success: false,
          message: "Nome, email e senha são obrigatórios",
        })
        return
      }

      const result = await this.authService.register(name, email, password)

      res.status(201).json({
        success: true,
        message: "Usuário registrado com sucesso",
        data: result,
      })
    } catch (error) {
      next(error)
    }
  }

  login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { email, password } = req.body

      if (!email || !password) {
        res.status(400).json({
          success: false,
          message: "Email e senha são obrigatórios",
        })
        return
      }

      const result = await this.authService.login(email, password)

      res.status(200).json({
        success: true,
        message: "Login realizado com sucesso",
        data: result,
      })
    } catch (error) {
      next(error)
    }
  }
}
