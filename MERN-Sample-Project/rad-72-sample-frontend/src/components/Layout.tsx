import Header from "./Header"
import { Outlet } from "react-router-dom"

function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      
      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="text-sm font-semibold text-gray-700">GDSE 72 RAD Project</span>
            </div>
            
            <div className="flex items-center gap-6 text-sm text-gray-600">
              <span>© 2025 All rights reserved</span>
              <span className="hidden md:inline">•</span>
              <span className="hidden md:inline">Built with React & Tailwind CSS</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Layout