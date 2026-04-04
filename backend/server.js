const dotenv = require("dotenv")

const connectDB = require("./config/db.js")

require("dotenv").config()

const express = require("express")
const cors = require("cors")

const repoRoutes = require("./routes/repoRoutes")
const chatRoutes = require("./routes/chatRoutes")

const authRoutes = require("./routes/authRoutes")
const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/repo", repoRoutes)
app.use("/api/chat", chatRoutes)

app.use("/api/auth", authRoutes)

app.get("/", (req, res) => {
  res.send("Server is running on NODEMON")
})

console.log(typeof cloneRepo, "Hi")
console.log(typeof scanFiles)

const PORT = 5000


dotenv.config()

connectDB()

app.listen(PORT, () => {
 console.log(`Server is running O_O`)
})
