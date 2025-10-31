import { AppDataSource } from "../config/database"
import { User } from "../entities/User"
import { generateToken } from "../utils/jwt"
import { AppError } from "../middlewares/error.middleware"
import { validate } from "class-validator"

export class AuthService {
  private userRepository = AppDataSource.getRepository(User)

  async register(name: string, email: string, password: string) {
    const existingUser = await this.userRepository.findOne({
      where: [{ email }, { name }],
    })

    if (existingUser) {
      throw new AppError("Usuário já existe com este email ou nome", 400)
    }

    const user = this.userRepository.create({
      name,
      email,
      password,
    })

    const errors = await validate(user)
    if (errors.length > 0) {
      const messages = errors.map((err) => Object.values(err.constraints || {}).join(", "))
      throw new AppError(messages.join("; "), 400)
    }

    await this.userRepository.save(user)

    const token = generateToken({
      userId: user.id,
      email: user.email,
    })

    return {
      user: user.toJSON(),
      token,
    }
  }

  async login(email: string, password: string) {
    const user = await this.userRepository.findOne({ where: { email } })

    if (!user) {
      throw new AppError("Credenciais inválidas", 401)
    }

    const isPasswordValid = await user.comparePassword(password)

    if (!isPasswordValid) {
      throw new AppError("Credenciais inválidas", 401)
    }

    if (!user.isActive) {
      throw new AppError("Usuário inativo", 403)
    }

    const token = generateToken({
      userId: user.id,
      email: user.email,
    })

    return {
      user: user.toJSON(),
      token,
    }
  }
}
