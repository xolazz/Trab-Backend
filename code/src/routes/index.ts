import { Router } from "express"
import authRoutes from "./auth.routes"
import userRoutes from "./user.routes"

const router = Router()

router.use("/auth", authRoutes)
router.use("/users", userRoutes)

/**
 * @swagger
 * /:
 *   get:
 *     summary: Health check
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: API está funcionando
 */
router.get("/", (req, res) => {
  res.json({
    success: true,
    message: "API está funcionando!",
    version: "1.0.0",
  })
})

export default router
