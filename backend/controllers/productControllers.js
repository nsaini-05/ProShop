import Product from "../models/productModel.js"
import asyncHandler from "express-async-handler"

//@desc Fetch All Products
//@route GET /products
export const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find()

  res.json(products)
})

//@desc Fetch Specific Products
//@route GET /products/:id
export const getSpecificProducts = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (!product) {
    res.status(404)
    throw new Error("Product not found")
  }
  res.json(product)
})
