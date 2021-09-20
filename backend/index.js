import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
dotenv.config()
const app = express()
app.use(cors())
connectDB()
import products from "./products.js"

app.get("/products", (req, res) => {
  res.json(products)
})

app.get("/products/:id", (req, res) => {
  const product = products.find((product) => product._id === req.params.id)
  res.send(product)
})

const port = process.env.PORT || 5000

app.listen(port, (req, res) => {
  console.log(`Server Started on ${port} `)
})
