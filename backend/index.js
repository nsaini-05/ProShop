import express from "express"
import cors from "cors"
import dotenv from "dotenv"
dotenv.config()
const app = express()
app.use(cors())

import products from "./products.js"

app.get("/products", (req, res) => {
  res.json(products)
})

app.get("/products/:id", (req, res) => {
  const product = products.find((product) => product._id === req.params.id)
  res.send(product)
})

app.listen(5000, (req, res) => {
  console.log("Server Started on  5000")
})
