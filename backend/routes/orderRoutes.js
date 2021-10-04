import express from "express"
import { protect } from "../middlewares/authMiddleware.js"
import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
} from "../controllers/orderControllers.js"

const router = express.Router()

//@desc Create Order
//@route Post /orders
//@acess Private
router.route("/").post(protect, addOrderItems)

//@desc GET USER ORDERS
//@route PUT /orders/myorders
//@acess Private
router.route("/myorders").get(protect, getMyOrders)

//@desc GET Order Details
//@route GET /orders/:id
//@acess Private
router.route("/:id").get(protect, getOrderById)

//@desc Update Order to Paid
//@route PUT /orders/:id/pay
//@acess Private
router.route("/:id/pay").put(protect, updateOrderToPaid)

export default router
