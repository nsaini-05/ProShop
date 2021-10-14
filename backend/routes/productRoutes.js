import express from 'express'
import {
  getAllProducts,
  getSpecificProducts,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts
} from '../controllers/productControllers.js'

import { protect, admin } from '../middlewares/authMiddleware.js'

const router = express.Router()
router.route('/top').get(getTopProducts)

//@desc Fetch All Products
//@route GET /products
//@acess Public
router.get('/', getAllProducts)
router.post('/', protect, admin, createProduct)

//@desc Fetch Specific Products
//@route GET /products/:id
//@acess Public
router.get('/:id', getSpecificProducts)
router.delete('/:id', protect, admin, deleteProduct)
router.put('/:id', protect, admin, updateProduct)

router.post('/:id/reviews', protect, createProductReview)

export default router
