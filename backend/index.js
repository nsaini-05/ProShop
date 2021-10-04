import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import {
  notFoundErrorHandler,
  errorHandler,
} from "./middlewares/errorHandler.js"
import productRoutes from "./routes/productRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import orderRoutes from "./routes/orderRoutes.js"
dotenv.config()
const app = express()
app.use(express.json())
app.use(cors())
connectDB()

app.get("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
)

app.use("/products", productRoutes)
app.use("/users", userRoutes)
app.use("/orders", orderRoutes)

//Error Handling Middlewares
app.use(notFoundErrorHandler)
app.use(errorHandler)

const port = process.env.PORT || 5000

app.listen(port, (req, res) => {
  console.log(`Server Started on ${port} in ${process.env.NODE_ENV} mode`)
})
