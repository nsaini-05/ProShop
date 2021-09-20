import express from "express"
const router = express.Router()

router.get("/", (req, res) => {
  res.send("All products")
})

router.get("/:id", (req, res) => {
  // const product = products.find((product) => product._id === req.params.id)
  res.send("Single Product")
})
export default router
