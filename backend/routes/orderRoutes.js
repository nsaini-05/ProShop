import express from "express"
import { protect } from "../middlewares/authMiddleware.js"
import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
} from "../controllers/orderControllers.js"

const router = express.Router()

//@desc Create Order
//@route Post /orders
//@acess Private
router.post("/", protect, addOrderItems)

//@desc GET Order Details
//@route GET /orders/:id
//@acess Private
router.get("/:id", protect, getOrderById)

//@desc Update Order to Paid
//@route PUT /orders/:id/pay
//@acess Private
router.put("/:id/pay", protect, updateOrderToPaid)

export default router
