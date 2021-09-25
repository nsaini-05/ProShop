import express from "express"
import {
  authUser,
  getUserProfile,
  registerUser,
} from "../controllers/userControllers.js"
import { protect } from "../middlewares/authMiddleware.js"
const router = express.Router()
router.post("/login", authUser)
router.get("/profile", protect, getUserProfile)
router.post("/", registerUser)

export default router
