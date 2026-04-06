require("dotenv").config()

const express = require("express")
const cors = require("cors")

const connectDB = require("./config/db.js")

const repoRoutes = require("./routes/repoRoutes")
const chatRoutes = require("./routes/chatRoutes")
const authRoutes = require("./routes/authRoutes")

const app = express()

// middleware
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
)

app.use(express.json({ limit: "10mb" }))

// health check
app.get("/", (req, res) => {
  res.send("Server is running")
})

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" })
})

// routes
app.use("/api/repo", repoRoutes)
app.use("/api/chat", chatRoutes)
app.use("/api/auth", authRoutes)

// error handler
app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).json({ message: "Server Error" })
})

const PORT = process.env.PORT || 5000

const startServer = async () => {
  await connectDB()

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

startServer()