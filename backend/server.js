require("dotenv").config()

const express = require("express")
const cors = require("cors")

const connectDB = require("./config/db.js")

const repoRoutes = require("./routes/repoRoutes")
const chatRoutes = require("./routes/chatRoutes")
const authRoutes = require("./routes/authRoutes")

const app = express()

// CORS (allow local + deployed frontend)
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://ai-github-repo-copilot.vercel.app"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
)

app.use(express.json())

// routes
app.use("/api/repo", repoRoutes)
app.use("/api/chat", chatRoutes)
app.use("/api/auth", authRoutes)

// health route
app.get("/", (req, res) => {
  res.send("Server is running")
})

// connect DB
connectDB()

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
