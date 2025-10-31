import "reflect-metadata"
import express from "express"
import cors from "cors"
import { config } from "dotenv"
import swaggerUi from "swagger-ui-express"
import { initializeDatabase } from "./config/database"
import { swaggerSpec } from "./config/swagger"
import routes from "./routes"
import { errorHandler } from "./middlewares/error.middleware"

config()

const app = express()
const PORT = process.env.PORT || 3000

// Middlewares
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*",
    credentials: true,
  }),
)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Swagger Documentation
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    customCss: ".swagger-ui .topbar { display: none }",
    customSiteTitle: "API Documentation",
  }),
)

// Routes
app.use("/api", routes)

// Error Handler (deve ser o último middleware)
app.use(errorHandler)

// Initialize Database and Start Server
const startServer = async () => {
  try {
    await initializeDatabase()

    app.listen(PORT, () => {
      console.log(`[v0] Server is running on port ${PORT}`)
      console.log(`[v0] API Documentation: http://localhost:${PORT}/api-docs`)
      console.log(`[v0] Environment: ${process.env.NODE_ENV || "development"}`)
    })
  } catch (error) {
    console.error("[v0] Failed to start server:", error)
    process.exit(1)
  }
}

startServer()
