import express from "express"
import {
  authUser,
  getUserProfile,
  registerUser,
  updateUser,
} from "../controllers/userControllers.js"
import { protect } from "../middlewares/authMiddleware.js"
const router = express.Router()
router.post("/login", authUser)
router.get("/profile", protect, getUserProfile)
router.put("/profile", protect, updateUser)
router.post("/", registerUser)

export default router
