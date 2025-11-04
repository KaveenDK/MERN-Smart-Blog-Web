import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/authContext"
import { login, getMyDetails } from "../services/auth"

interface LoginError {
  message: string;
}

export default function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { setUser } = useAuth()
  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setError(null)
    
    if (!username.trim() || !password.trim()) {
      setError("Please enter both username and password.")
      return
    }

    setIsLoading(true)
    try {
      const data = await login(username, password)

      if (data?.data?.accessToken) {
        await localStorage.setItem("accessToken", data.data.accessToken)
        const resData = await getMyDetails()
        setUser(resData.data)
        navigate("/home")
      } else {
        setError("Invalid credentials")
      }
    } catch (err) {
      const error = err as LoginError
      console.error("Login error:", error)
      setError(error.message || "Login failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 py-12 px-4">
      <div className="max-w-md mx-auto">
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Welcome Back
          </h1>

          {error && (
            <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
              {error}
            </div>
          )}

          <form className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border rounded-lg focus:ring-2 
                         focus:ring-blue-500 focus:border-blue-500"
                disabled={isLoading}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border rounded-lg focus:ring-2 
                         focus:ring-blue-500 focus:border-blue-500"
                disabled={isLoading}
              />
            </div>

            <button
              onClick={handleLogin}
              disabled={isLoading}
              className={`w-full py-3 px-4 rounded-lg font-medium text-white
                       transition-all duration-200
                       ${isLoading 
                         ? 'bg-blue-400 cursor-not-allowed' 
                         : 'bg-blue-600 hover:bg-blue-700 active:transform active:scale-95'
                       }`}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="mt-6 text-center text-gray-600">
            Don't have an account?{" "}
            <button
              onClick={() => navigate("/register")}
              className="text-blue-600 font-semibold hover:underline"
              disabled={isLoading}
            >
              Register here
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}