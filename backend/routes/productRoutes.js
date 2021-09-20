import express from "express"
import {
  getAllProducts,
  getSpecificProducts,
} from "../controllers/productControllers.js"
const router = express.Router()

//@desc Fetch All Products
//@route GET /products
//@acess Public
router.get("/", getAllProducts)

//@desc Fetch Specific Products
//@route GET /products/:id
//@acess Public
router.get("/:id", getSpecificProducts)
export default router
