import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import GitHubCopilot from "./pages/GitHubCopilot"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import About from "./pages/About"

import ProtectedRoute from "./components/ProtectedRoute"
// import GitHubCopilot from "./pages/GitHubCopilot"

function App() {
  return (
    <Routes>



      <Route path="/" element={<Home />} />

      {/* <Route
        path="/github-copilot"
        element={<GitHubCopilot />}
      /> */}
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