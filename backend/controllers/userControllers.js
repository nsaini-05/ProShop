import User from "../models/userModel.js"
import asyncHandler from "express-async-handler"
import generateToken from "../utils/generateToken.js"
//@desc Auth User & get Token
//@route POST /users/login
//@access Public
export const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email: email })
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else {
    res.status(401)
    throw new Error("Invalid Email or Password")
  }
})

//@desc GET USER PROFILE
//@route GET /users/profile
//@access PRIVATE

export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error("User not found ")
  }
})

//@desc POST REGISTER NEW USER
//@route POST /users
//@access PUBLIC

export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body
  const userExists = await User.findOne({ email })
  if (userExists) {
    res.status(400)
    throw new Error("User Already Exists")
  }

  const user = await User.create({ name, email, password })
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error("Invalid User Data")
  }
})

//@desc  UPDATE USER PROFILE
//@route PUT /users/profile
//@access PRIVATE

export const updateUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body
  const userExists = await User.findById(req.user._id)

  if (userExists) {
    userExists.name = name || userExists.name
    userExists.password = password || userExists.password
    userExists.email = email || userExists.email

    const updateUser = await userExists.save()
    res.json({
      _id: updateUser._id,
      name: updateUser.name,
      email: updateUser.email,
      isAdmin: updateUser.isAdmin,
      token: generateToken(updateUser._id),
    })
  } else {
    res.status(404)
    throw new Error("User not found ")
  }
})






//@desc GET ALL USERS 
//@route GET /users
//@access PRIVATE/ADMIN 

export const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({})

  res.status(200).json(users)

})