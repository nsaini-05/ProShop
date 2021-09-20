import bcrypt from "bcryptjs"

const users = [
  {
    name: "admin",
    email: "admin@example.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "Ankush",
    email: "ankush@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "neer",
    email: "neer@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
]

export default users
