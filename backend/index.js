import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import morgan from "morgan"
import connectDB from "./config/db.js"
import {
  notFoundErrorHandler,
  errorHandler,
} from "./middlewares/errorHandler.js"
import productRoutes from "./routes/productRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import orderRoutes from "./routes/orderRoutes.js"
import uploadRoutes from "./routes/uploadRoutes.js"
import path from "path"
dotenv.config()
const app = express()

if(process.env.NODE_ENV === 'DEVELOPMENT'){
  app.use(morgan('dev'))
}

app.use(express.json())
app.use(cors())
connectDB()

app.get("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
)

app.use("/products", productRoutes)
app.use("/users", userRoutes)
app.use("/orders", orderRoutes)
app.use("/upload", uploadRoutes)
const __dirname = path.resolve()
app.use("/uploads", express.static(path.join(__dirname, "/uploads")))

//Error Handling Middlewares
app.use(notFoundErrorHandler)
app.use(errorHandler)

const port = process.env.PORT || 5000

app.listen(port, (req, res) => {
  console.log(`Server Started on ${port} in ${process.env.NODE_ENV} mode`)
})
