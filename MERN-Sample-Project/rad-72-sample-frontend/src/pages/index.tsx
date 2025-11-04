import { Link } from "react-router-dom"

export default function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="text-center bg-white p-8 rounded-xl shadow-lg mb-8 transform transition-all hover:shadow-xl">
          <h1 className="text-5xl font-bold mb-4 text-gray-800 tracking-tight">
            Welcome GDSE 72!
          </h1>
          <h3 className="text-2xl font-semibold mb-3 text-gray-700">
            Rapid Application Development Demo
          </h3>
          <p className="text-gray-600 text-lg">
            Experience the power of modern web development
          </p>
        </div>
        
        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Login Card */}
          <div className="bg-white p-8 rounded-xl shadow-lg text-center transform transition-all hover:shadow-xl">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Login</h2>
            <Link 
              to="/login"
              className="block w-full bg-blue-500 text-white py-3 px-6 rounded-lg font-semibold 
                       transform transition-all duration-200 
                       hover:bg-blue-600 hover:scale-105 
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Sign In
            </Link>
          </div>
          
          {/* Register Card */}
          <div className="bg-white p-8 rounded-xl shadow-lg text-center transform transition-all hover:shadow-xl">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Register</h2>
            <Link 
              to="/register"
              className="block w-full bg-green-500 text-white py-3 px-6 rounded-lg font-semibold 
                       transform transition-all duration-200 
                       hover:bg-green-600 hover:scale-105
                       focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
            >
              Create Account
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12">
          <p className="text-sm text-gray-600">
            RAD GDSE 72 | React + Tailwind Demo
          </p>
        </div>
      </div>
    </div>
  )
}