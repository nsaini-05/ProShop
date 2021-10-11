import express from "express"
import {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser
} from "../controllers/userControllers.js"
import { protect , admin } from "../middlewares/authMiddleware.js"
const router = express.Router()
router.post("/login", authUser)
router.get("/profile", protect, getUserProfile)
router.put("/profile", protect, updateUserProfile)
router.post("/", registerUser)


// ADMIN ROUTES 
router.get("/", protect ,admin, getUsers)
router.delete("/:id", protect ,admin, deleteUser)
router.put("/:id", protect ,admin, updateUser)
router.get("/:id", protect ,admin, getUserById)




export default router
