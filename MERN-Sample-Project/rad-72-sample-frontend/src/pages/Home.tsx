import { useAuth } from "../context/authContext"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

export default function Home() {
  const { user, setUser } = useAuth()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  const handleLogout = async () => {
    setIsLoading(true)
    try {
      setUser(null)
      localStorage.removeItem("accessToken")
      navigate("/login")
    } catch (error) {
      console.error("Logout failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <h1 className="text-4xl font-bold mb-4 text-gray-800">
            Welcome, {user?.email || "User"}!
          </h1>
          
          <p className="mb-8 text-gray-600 text-lg">
            You are now logged in. This is your Home page.
          </p>

          <div className="flex justify-center space-x-4">
            <button
              onClick={handleLogout}
              disabled={isLoading}
              className={`
                px-6 py-3 rounded-lg font-medium
                transition-all duration-200
                ${isLoading 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-red-500 hover:bg-red-600 hover:shadow-lg active:transform active:scale-95'
                }
                text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50
              `}
            >
              {isLoading ? "Logging out..." : "Logout"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}