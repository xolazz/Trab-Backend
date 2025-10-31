import { AppDataSource } from "../config/database"
import { User } from "../entities/User"
import { AppError } from "../middlewares/error.middleware"
import { validate } from "class-validator"

export class UserService {
  private userRepository = AppDataSource.getRepository(User)

  async getAllUsers() {
    const users = await this.userRepository.find({
      order: { createdAt: "DESC" },
    })

    return users.map((user) => user.toJSON())
  }

  async getUserById(id: string) {
    const user = await this.userRepository.findOne({ where: { id } })

    if (!user) {
      throw new AppError("Usuário não encontrado", 404)
    }

    return user.toJSON()
  }

  async updateUser(id: string, data: { name?: string; email?: string; isActive?: boolean }) {
    const user = await this.userRepository.findOne({ where: { id } })

    if (!user) {
      throw new AppError("Usuário não encontrado", 404)
    }

    if (data.email && data.email !== user.email) {
      const existingUser = await this.userRepository.findOne({
        where: { email: data.email },
      })

      if (existingUser) {
        throw new AppError("Email já está em uso", 400)
      }
    }

    if (data.name && data.name !== user.name) {
      const existingUser = await this.userRepository.findOne({
        where: { name: data.name },
      })

      if (existingUser) {
        throw new AppError("Nome já está em uso", 400)
      }
    }

    Object.assign(user, data)

    const errors = await validate(user)
    if (errors.length > 0) {
      const messages = errors.map((err) => Object.values(err.constraints || {}).join(", "))
      throw new AppError(messages.join("; "), 400)
    }

    await this.userRepository.save(user)

    return user.toJSON()
  }

  async deleteUser(id: string) {
    const user = await this.userRepository.findOne({ where: { id } })

    if (!user) {
      throw new AppError("Usuário não encontrado", 404)
    }

    await this.userRepository.remove(user)

    return { message: "Usuário deletado com sucesso" }
  }
}
