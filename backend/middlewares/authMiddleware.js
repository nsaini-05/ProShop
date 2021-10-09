import jwt from "jsonwebtoken"
import User from "../models/userModel.js"
import asyncHandler from "express-async-handler"

export const protect = asyncHandler(async (req, res, next) => {
  let token = req.headers.authorization

  if (token && token.startsWith("Bearer")) {
    token = token.split(" ")[1]
    try {
      const decoded = jwt.verify(token, process.env.JWT_TOKEN_SECRET)
      req.user = await User.findById(decoded.id).select("-password")
      next()
    } catch (error) {
      res.status(401)
      throw new Error("Not Authorized , No Token")
    }
  }

  if (!token) {
    res.status(401)
    throw new Error("Not Authorized , No Token")
  }
})



export const admin = (req, res , next) => {
  
  if(req.user && req.user.isAdmin) {
    next()
  }
  else
  {
    res.status(401)
    throw new Error("Not authorized as Admin")
  }
}