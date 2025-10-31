import type { Response, NextFunction } from "express"
import { UserService } from "../services/user.service"
import type { AuthRequest } from "../middlewares/auth.middleware"

export class UserController {
  private userService = new UserService()

  getAllUsers = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const users = await this.userService.getAllUsers()

      res.status(200).json({
        success: true,
        message: "Usuários recuperados com sucesso",
        data: users,
      })
    } catch (error) {
      next(error)
    }
  }

  getUserById = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params
      const user = await this.userService.getUserById(id)

      res.status(200).json({
        success: true,
        message: "Usuário recuperado com sucesso",
        data: user,
      })
    } catch (error) {
      next(error)
    }
  }

  updateUser = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params
      const data = req.body

      const user = await this.userService.updateUser(id, data)

      res.status(200).json({
        success: true,
        message: "Usuário atualizado com sucesso",
        data: user,
      })
    } catch (error) {
      next(error)
    }
  }

  deleteUser = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params
      const result = await this.userService.deleteUser(id)

      res.status(200).json({
        success: true,
        message: result.message,
      })
    } catch (error) {
      next(error)
    }
  }
}
