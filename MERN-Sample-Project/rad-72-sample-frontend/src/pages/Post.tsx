import React, { useEffect, useState } from "react"
import { getAllPost } from "../services/post"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/authContext"

export default function Post() {
  const [page, setPage] = useState(1)
  const [posts, setPosts] = useState<any[]>([])
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { user, setUser } = useAuth()

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshToken")
    navigate("/login")
  }

  const fetchPost = async () => {
    try {
      setLoading(true)
      const data = await getAllPost(page, 10)
      setPosts(data.data || [])
      setTotalPages(data.totalPages || 1)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPost()
  }, [page])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-6">
              <h2 className="text-xl font-semibold text-gray-800">All Posts</h2>
              <button
                onClick={() => navigate('/home')}
                className="text-gray-600 hover:text-indigo-600 transition-colors text-sm font-medium"
              >
                ← Back to Dashboard
              </button>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-lg hover:bg-red-600 transition-colors shadow-sm"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Discover Posts</h1>
          <p className="text-gray-600">Explore amazing content from our community</p>
        </div>

        {loading ? (
          <div className="flex flex-col justify-center items-center h-64">
            <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
            <p className="text-gray-600 font-medium">Loading posts...</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-md">
            <svg className="w-24 h-24 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-xl text-gray-500 font-medium">No posts available</p>
            <p className="text-gray-400 mt-2">Check back later for new content</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group"
              >
                {post?.imageURL && (
                  <div className="relative overflow-hidden h-48">
                    <img
                      src={post.imageURL}
                      alt={post?.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                )}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors line-clamp-2">
                    {post?.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3 flex-grow text-sm leading-relaxed">
                    {post?.content}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {post?.tags?.slice(0, 3).map((tag: string, i: number) => (
                      <span
                        key={i}
                        className="text-xs bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 px-3 py-1 rounded-full font-medium border border-indigo-200"
                      >
                        #{tag}
                      </span>
                    ))}
                    {post?.tags?.length > 3 && (
                      <span className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full font-medium">
                        +{post.tags.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {!loading && posts.length > 0 && (
          <div className="flex justify-center items-center gap-4 mt-12">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                page === 1
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white text-gray-700 shadow-md hover:shadow-lg hover:-translate-y-0.5 border border-gray-200"
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Previous
            </button>

            <div className="bg-white px-6 py-3 rounded-xl shadow-md border border-gray-200">
              <span className="text-gray-600 text-sm">
                Page <span className="font-bold text-indigo-600 text-lg mx-1">{page}</span> 
                <span className="text-gray-400 mx-1">of</span>
                <span className="font-bold text-gray-900 text-lg mx-1">{totalPages}</span>
              </span>
            </div>

            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                page === totalPages
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white text-gray-700 shadow-md hover:shadow-lg hover:-translate-y-0.5 border border-gray-200"
              }`}
            >
              Next
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}