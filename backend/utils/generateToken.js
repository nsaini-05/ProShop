import jwt from "jsonwebtoken"

const generateToken = (id) => {

  console.log(process.env.JWT_TOKEN_SECRET)
  const secret = process.env.JWT_TOKEN_SECRET;
  return jwt.sign({ id }, secret, {
    expiresIn: "30d",
  })
}

export default generateToken
