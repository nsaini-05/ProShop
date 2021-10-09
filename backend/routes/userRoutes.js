import express from "express"
import {
  authUser,
  getUserProfile,
  registerUser,
  updateUser,
  getUsers
} from "../controllers/userControllers.js"
import { protect , admin } from "../middlewares/authMiddleware.js"
const router = express.Router()
router.post("/login", authUser)
router.get("/profile", protect, getUserProfile)
router.put("/profile", protect, updateUser)
router.post("/", registerUser)
router.get("/", protect ,admin, getUsers)

export default router
