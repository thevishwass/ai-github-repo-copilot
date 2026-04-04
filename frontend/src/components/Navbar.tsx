import { Link, useLocation } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { useState } from "react"

export default function Navbar() {

  const location = useLocation()
  const { isAuthenticated, logout } = useAuth()
  const [open, setOpen] = useState(false)

  const linkStyle = (path: string) =>
    `text-m font-medium transition ${
      location.pathname === path
        ? "text-white"
        : "text-gray-400 hover:text-gray-200"
    }`

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-800  backdrop-blur-md">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-white font-semibold"
        >
          <div className="w-7 h-7 bg-yellow-400 text-black rounded-md flex items-center justify-center font-bold">
            io
          </div>

          GitHub Copilot
        </Link>


        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">

          <Link to="/" className={linkStyle("/")}>
            Home
          </Link>

          <Link to="/github-copilot" className={linkStyle("/github-copilot")}>
            Copilot
          </Link>

          <Link to="/about" className={linkStyle("/about")}>
            About
          </Link>

        </div>


        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center gap-4 font-bold">

          {!isAuthenticated ? (
            <>
              <Link
                to="/login"
                className="text-white text-sm px-4 py-2 rounded-lg border border-blue-500"
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg"
              >
                Signup
              </Link>
            </>
          ) : (
            <button
              onClick={logout}
              className="bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-2 rounded-lg"
            >
              Logout
            </button>
          )}

        </div>


        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-300"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>

      </div>


      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden border-t border-gray-800 bg-black/80 backdrop-blur">

          <div className="flex flex-col gap-4 px-6 py-4">

            <Link to="/" className={linkStyle("/")}>
              Home
            </Link>

            <Link to="/github-copilot" className={linkStyle("/github-copilot")}>
              Copilot
            </Link>

            <Link to="/about" className={linkStyle("/about")}>
              About
            </Link>

            {!isAuthenticated ? (
              <>
                <Link
                  to="/login"
                  className="text-white text-sm px-4 py-2 rounded-lg border border-blue-500 w-fit"
                >
                  Login
                </Link>

                <Link
                  to="/signup"
                  className="bg-blue-600 text-white text-sm px-4 py-2 rounded-lg w-fit"
                >
                  Signup
                </Link>
              </>
            ) : (
              <button
                onClick={logout}
                className="bg-red-600 text-white text-sm px-4 py-2 rounded-lg w-fit"
              >
                Logout
              </button>
            )}

          </div>

        </div>
      )}

    </nav>
  )
}