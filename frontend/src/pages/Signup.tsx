import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { signupUser } from "../api/authApi"
import { useAuth } from "../context/AuthContext"

export default function Signup() {

  const navigate = useNavigate()
  const { login } = useAuth()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      alert("Passwords do not match")
      return
    }

    try {

      setLoading(true)

      const data = await signupUser(name, email, password)

      // login user through context
      login(data.token, data.user)

      navigate("/github-copilot")

    } catch (err) {

      alert("Signup failed")

    } finally {

      setLoading(false)

    }
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-200 flex items-center justify-center px-6">

      <div className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-xl p-8 shadow-xl">

        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold text-white">
            Create account
          </h1>

          <p className="text-gray-400 text-sm mt-2">
            Start using AI GitHub Copilot
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSignup} className="flex flex-col gap-4">

          {/* Name */}
          <div>
            <label className="text-sm text-gray-400 mb-1 block">
              Name
            </label>

            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-blue-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm text-gray-400 mb-1 block">
              Email
            </label>

            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-blue-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm text-gray-400 mb-1 block">
              Password
            </label>

            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-blue-500"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="text-sm text-gray-400 mb-1 block">
              Confirm Password
            </label>

            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-blue-500"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="mt-2 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg text-sm font-medium transition disabled:opacity-60"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>

        </form>

        {/* Footer */}
        <p className="text-m text-gray-500 text-center mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-400 hover:underline">
            Login
          </Link>
        </p>

        <p className="text-m text-gray-100 text-center mt-3">
          <Link to="/" className="hover:text-gray-400">
            ← Back to Home
          </Link>
        </p>

      </div>

    </div>
  )
}