import Product from '../models/productModel.js'
import asyncHandler from 'express-async-handler'

//@desc Fetch All Products
//@route GET /products
export const getAllProducts = asyncHandler(async (req, res) => {
  const pageSize = 2
  const page = Number(req.query.pageNumber) || 1
  const keyword = req.query.keyword
    ? { name: { $regex: req.query.keyword, $options: 'i' } }
    : {}

  const count = await Product.countDocuments({ ...keyword })

  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1))
  res.json({ products, page, pages: Math.ceil(count / pageSize) })
})

//@desc Fetch Specific Products
//@route GET /products/:id
export const getSpecificProducts = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (!product) {
    res.status(404)
    throw new Error('Product not found')
  }
  res.json(product)
})

//@desc DELETE Product By ID
//@route DELETE products/:id
export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    await product.remove()
    res.json({ message: 'Product removed Successfully.' })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

//@desc CREATE Product
//@route CREATE products/
export const createProduct = asyncHandler(async (req, res) => {
  const product = {
    user: req.user._id,
    name: 'sample',
    image: '/images/phone.jpg',
    brand: 'sample brand',
    description: 'sample description',
    category: 'sample category'
  }

  const createdProduct = await Product.create(product)
  res.status(201).json(createdProduct)
})

//@desc UPDATE Product
//@route PUT products/:id
export const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  const {
    name,
    price,
    description,
    category,
    image,
    countInStock,
    brand
  } = req.body

  if (product) {
    product.name = name || product.name
    product.category = category || product.category
    product.image = image || product.image
    product.price = price || product.price
    product.description = description || product.description
    product.countInStock = countInStock || product.countInStock
    product.brand = brand || product.brand
    product.save()

    res.status(200).json(product)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

//@desc POST Create a review
//@route POST products/:id/reviews
//@access Private
export const createProductReview = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  const { rating, comment } = req.body

  if (product) {
    const alreadyReviewed = product.reviews.find(
      r => r.user.toString() === req.user._id.toString()
    )
    if (alreadyReviewed) {
      res.status(400)
      throw new Error('Product Already Reviewed ')
    }

    const review = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment
    }

    product.reviews.push(review)
    product.numReviews = product.reviews.length
    product.rating = product.reviews.reduce(
      (acc, current) => current.rating + acc,
      0
    )
    product.rating = product.rating / product.reviews.length

    await product.save()
    res.status(201).json({ message: 'Review Added' })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})
