const dotenv = require("dotenv")
dotenv.config()

const express = require("express")
const cors = require("cors")

const connectDB = require("./config/db.js")

const repoRoutes = require("./routes/repoRoutes")
const chatRoutes = require("./routes/chatRoutes")
const authRoutes = require("./routes/authRoutes")

const app = express()

// CORS
app.use(cors({
  origin: "*"
}))

app.use(express.json())

// routes
app.use("/api/repo", repoRoutes)
app.use("/api/chat", chatRoutes)
app.use("/api/auth", authRoutes)

app.get("/", (req, res) => {
  res.send("Server is running")
})

connectDB()

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log("Server is running O_O")
})
