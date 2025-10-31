import { DataSource } from "typeorm"
import { config } from "dotenv"

config()

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: Number.parseInt(process.env.DB_PORT || "5432"),
  username: process.env.DB_USERNAME || "postgres",
  password: process.env.DB_PASSWORD || "postgres",
  database: process.env.DB_DATABASE || "api_database",
  synchronize: process.env.NODE_ENV === "development",
  logging: process.env.NODE_ENV === "development",
  entities: ["src/entities/**/*.ts"],
  migrations: ["src/migrations/**/*.ts"],
  subscribers: [],
})

export const initializeDatabase = async (): Promise<void> => {
  try {
    await AppDataSource.initialize()
    console.log("[v0] Database connection established successfully")
  } catch (error) {
    console.error("[v0] Error connecting to database:", error)
    throw error
  }
}
