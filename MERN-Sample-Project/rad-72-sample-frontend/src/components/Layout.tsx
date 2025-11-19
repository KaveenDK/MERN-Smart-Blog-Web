import Header from "./Header"
import { Outlet } from "react-router-dom"

function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-indigo-50 to-purple-50">

      {/* Animated Header */}
      <Header />

      {/* Main Content Wrapper */}
      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6 animate-fadeIn">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="backdrop-blur-md bg-white/70 border-t border-white/40 shadow-inner mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">

            {/* Footer Logo */}
            <div className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center shadow-md group-hover:shadow-xl transition-all duration-300">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="text-sm font-semibold text-gray-700 tracking-wide">
                GDSE 72 RAD Project
              </span>
            </div>

            {/* Footer Text */}
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span className="hover:text-gray-800 transition-colors">© 2025 All rights reserved</span>
              <span className="hidden md:inline">•</span>
              <span className="hidden md:inline hover:text-gray-800 transition-colors">
                Built with React + Tailwind
              </span>
            </div>

          </div>
        </div>
      </footer>
    </div>
  )
}

export default Layout
