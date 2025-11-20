import { useEffect, useMemo, useState, type JSX } from "react";
import { getAllPost } from "../services/post";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

export default function Post(): JSX.Element {
  const [page, setPage] = useState<number>(1);
  const [posts, setPosts] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);

  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigate("/login");
  };

  const fetchPost = async () => {
    try {
      setLoading(true);
      const data = await getAllPost(page, 10);
      setPosts(data.data || []);
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  // Entrance animation
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 30);
    return () => clearTimeout(t);
  }, []);

  const totalPostsCount = useMemo(() => posts.length, [posts]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 antialiased">
      {/* Header */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-6">
              <h2 className="text-xl font-semibold text-gray-800">All Posts</h2>
              <button
                onClick={() => navigate("/home")}
                className="text-gray-600 hover:text-indigo-600 transition-colors text-sm font-medium"
              >
                ← Back to Dashboard
              </button>
              <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-100">
                {totalPostsCount} on this page
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate("/post")}
                className="px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition transform hover:-translate-y-0.5 text-sm text-gray-700"
              >
                Create Post
              </button>

              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-lg hover:bg-red-600 transition-colors shadow-sm"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <header className={`text-center mb-10 transition-all duration-400 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}`}>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Discover Posts</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">Explore amazing content from our community — curated, fresh and interactive.</p>
        </header>

        {/* Loading skeleton */}
        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="animate-pulse bg-white/90 rounded-2xl p-4 shadow border border-white/40">
                <div className="h-40 bg-gray-200 rounded-md mb-4" />
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                <div className="h-3 bg-gray-200 rounded w-1/2 mb-4" />
                <div className="flex gap-2">
                  <div className="h-8 w-20 bg-gray-200 rounded" />
                  <div className="h-8 w-12 bg-gray-200 rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-md">
            <svg className="w-28 h-28 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="text-xl font-medium text-gray-700">No posts available</h3>
            <p className="text-gray-400 mt-2">Check back later for new content or create the first post.</p>
            <div className="mt-6">
              <button onClick={() => navigate("/post")} className="px-5 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition">Create Post</button>
            </div>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, index) => (
              <article
                key={post?.id ?? index}
                className={`bg-white/90 rounded-2xl shadow-md overflow-hidden flex flex-col group transition-transform duration-300 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                {/* Image (if available) */}
                {post?.imageURL ? (
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={post.imageURL}
                      alt={post?.title}
                      className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                ) : (
                  <div className="h-48 bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                  </div>
                )}

                {/* Body */}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">{post?.title}</h3>
                  <p className="text-sm text-gray-600 mb-4 flex-1 overflow-hidden" style={{ display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical" }}>
                    {post?.content}
                  </p>

                  <div className="flex items-center justify-between gap-3 mt-4">
                    <div className="flex items-center gap-2 flex-wrap">
                      {(post?.tags || []).slice(0, 3).map((tag: string, i: number) => (
                        <span key={i} className="text-xs bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 px-3 py-1 rounded-full font-medium border border-indigo-100">
                          #{tag}
                        </span>
                      ))}

                      {post?.tags && post.tags.length > 3 && (
                        <span className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full">+{post.tags.length - 3}</span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500 flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-xs">{post?.date}</span>
                      </span>

                      <span className="inline-flex items-center gap-1 text-sm text-pink-600 font-medium">
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                        <span className="text-xs">{post?.likes ?? 0}</span>
                      </span>
                    </div>
                  </div>

                  {/* Card actions */}
                  <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => navigate(`/post/${post?.id}`)}
                        className="text-sm text-indigo-600 px-3 py-1 rounded-lg hover:bg-indigo-50 transition"
                      >
                        View
                      </button>
                      <button
                        onClick={() => navigate(`/post/${post?.id}/edit`)}
                        className="text-sm text-gray-700 px-3 py-1 rounded-lg hover:bg-gray-50 transition"
                      >
                        Edit
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => alert("Like (UI)")}
                        className="p-2 rounded-md bg-white border border-gray-100 shadow-sm hover:shadow-md transition"
                        title="Like"
                      >
                        <svg className="w-4 h-4 text-pink-600" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                      </button>

                      <button
                        onClick={() => alert("Share (UI)")}
                        className="p-2 rounded-md bg-white border border-gray-100 shadow-sm hover:shadow-md transition"
                        title="Share"
                      >
                        <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 8a3 3 0 11-2.83-4H7a2 2 0 00-2 2v9" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Pagination */}
        {!loading && posts.length > 0 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-12">
            <div className="flex items-center gap-3">
              <button
                disabled={page === 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition ${
                  page === 1
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-white text-gray-700 shadow hover:shadow-md hover:-translate-y-0.5 border border-gray-200"
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Previous
              </button>

              <div className="bg-white px-4 py-2 rounded-lg shadow border border-gray-200 text-sm">
                Page <span className="font-semibold text-indigo-600 mx-2">{page}</span> of <span className="font-semibold">{totalPages}</span>
              </div>

              <button
                disabled={page === totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition ${
                  page === totalPages
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-white text-gray-700 shadow hover:shadow-md hover:-translate-y-0.5 border border-gray-200"
                }`}
              >
                Next
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            <div className="text-sm text-gray-600">
              Showing <span className="font-medium">{posts.length}</span> posts • Total pages: <span className="font-medium">{totalPages}</span>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
