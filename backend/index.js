import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import productRoutes from "./routes/productRoutes.js"

dotenv.config()
const app = express()
app.use(cors())
connectDB()

app.use("/products", productRoutes)

const port = process.env.PORT || 5000

app.listen(port, (req, res) => {
  console.log(`Server Started on ${port} `)
})
