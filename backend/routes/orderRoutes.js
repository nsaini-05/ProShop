import express from "express"
import { protect } from "../middlewares/authMiddleware.js"
import { addOrderItems, getOrderById } from "../controllers/orderControllers.js"

const router = express.Router()

//@desc Create Order
//@route Post /orders
//@acess Private
router.post("/", protect, addOrderItems)
router.get("/:id", protect, getOrderById)

export default router
