import { Routes, Route } from "react-router-dom"
import { useEffect } from "react"

import Home from "./pages/Home"
import GitHubCopilot from "./pages/GitHubCopilot"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import About from "./pages/About"

import ProtectedRoute from "./components/ProtectedRoute"
import { wakeServer } from "./api/serverWake"

function App() {

  useEffect(() => {
    wakeServer()
  }, [])

  return (
    <Routes>

      <Route path="/" element={<Home />} />

      <Route
        path="/github-copilot"
        element={
          <ProtectedRoute>
            <GitHubCopilot />
          </ProtectedRoute>
        }
      />

      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/about" element={<About />} />

    </Routes>
  )
}

export default App