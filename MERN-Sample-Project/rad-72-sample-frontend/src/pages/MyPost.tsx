import { useEffect, useMemo, useRef, useState, type JSX } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

type Post = {
  id: number;
  title: string;
  content: string;
  date: string;
  likes: number;
};

export default function MyPost(): JSX.Element {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigate("/login");
  };

  // Sample posts data - replace with actual API data
  const posts: Post[] = [
    { id: 1, title: "My First Post", content: "This is my first blog post content...", date: "2025-11-15", likes: 24 },
    { id: 2, title: "React Tips", content: "Here are some useful React tips...", date: "2025-11-16", likes: 42 },
    { id: 3, title: "Tailwind CSS Guide", content: "A comprehensive guide to Tailwind...", date: "2025-11-17", likes: 35 },
  ];

  // derived stats
  const totalPosts = posts.length;
  const totalLikes = posts.reduce((s, p) => s + p.likes, 0);
  const avgLikes = totalPosts ? Math.round(totalLikes / totalPosts) : 0;

  // animated counters (UI-only)
  const [countPosts, setCountPosts] = useState(0);
  const [countLikes, setCountLikes] = useState(0);
  const [countAvg, setCountAvg] = useState(0);
  const mountedRef = useRef(false);

  useEffect(() => {
    // simple ease animation using requestAnimationFrame
    function animateValue(from: number, to: number, duration: number, setter: (v: number) => void) {
      const start = performance.now();
      const frame = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        // easeOutCubic
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(from + (to - from) * eased);
        setter(current);
        if (progress < 1) requestAnimationFrame(frame);
      };
      requestAnimationFrame(frame);
    }

    if (!mountedRef.current) {
      animateValue(0, totalPosts, 700, setCountPosts);
      animateValue(0, totalLikes, 900, setCountLikes);
      animateValue(0, avgLikes, 700, setCountAvg);
      mountedRef.current = true;
    }
  }, [totalPosts, totalLikes, avgLikes]);

  // small entrance for list items
  const [entered, setEntered] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 40);
    return () => clearTimeout(t);
  }, []);

  // nice initials for avatar
  const initials = useMemo(() => {
    if (!user?.email) return "G";
    return user.email.slice(0, 1).toUpperCase();
  }, [user]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 antialiased">
      {/* Topbar */}
      <nav className="bg-white/60 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold shadow-md transform transition-transform group-hover:-translate-y-1">
                  TR
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-slate-800">My Posts</h2>
                  <p className="text-xs text-gray-400">Manage and view all your posts</p>
                </div>
              </div>

              <button
                onClick={() => navigate("/home")}
                className="text-sm text-gray-600 hover:text-indigo-600 transition-colors"
              >
                ← Back to Dashboard
              </button>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-3 px-3 py-2 bg-white rounded-lg border border-gray-100 shadow-sm">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-sm font-medium">
                  {initials}
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-700 truncate max-w-[12rem]">{user?.email || "Guest"}</span>
                  <span className="text-xs text-gray-400">{user?.roles?.join?.(", ") || "Visitor"}</span>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white text-sm font-semibold rounded-lg hover:bg-red-600 transition-shadow shadow-sm hover:shadow-md"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header & action */}
        <div className={`mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition-all ${entered ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}`}>
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 mb-1">Your Posts</h1>
            <p className="text-sm text-gray-500">Manage and view all your posts, <span className="font-medium text-indigo-600">{user?.email || "User"}</span></p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/post")}
              className="inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Create New Post
            </button>

            {/* floating quick-action */}
            <button
              onClick={() => navigate("/post")}
              className="hidden md:inline-flex items-center gap-2 px-3 py-2 bg-white border border-gray-100 rounded-lg shadow-sm hover:shadow-md transition"
              title="Quick create"
            >
              <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 ${entered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <div className="bg-white/90 rounded-2xl p-6 border border-white/60 shadow-md hover:shadow-2xl transition transform hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Posts</p>
                <p className="mt-2 text-3xl font-bold text-slate-900">{countPosts}</p>
              </div>
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white/90 rounded-2xl p-6 border border-white/60 shadow-md hover:shadow-2xl transition transform hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Likes</p>
                <p className="mt-2 text-3xl font-bold text-slate-900">{countLikes}</p>
              </div>
              <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white/90 rounded-2xl p-6 border border-white/60 shadow-md hover:shadow-2xl transition transform hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Avg Likes / Post</p>
                <p className="mt-2 text-3xl font-bold text-slate-900">{countAvg}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Posts list */}
        <section className="space-y-6">
          {posts.map((post, idx) => (
            <article
              key={post.id}
              className={`bg-white/95 rounded-2xl p-6 border border-white/50 shadow-md hover:shadow-2xl transition transform ${
                entered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
              }`}
              style={{ transitionDelay: `${idx * 60}ms` }}
            >
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <h3 className="text-xl font-semibold text-slate-900">{post.title}</h3>
                      <p className="text-sm text-gray-500 mt-2">{post.content}</p>

                      <div className="flex items-center gap-4 text-xs text-gray-400 mt-3">
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10" />
                          </svg>
                          {post.date}
                        </span>

                        <span className="flex items-center gap-1 text-pink-600 font-medium">
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                          </svg>
                          {post.likes} likes
                        </span>
                      </div>
                    </div>

                    <div className="flex-shrink-0 flex gap-2">
                      <button
                        onClick={() => navigate(`/post/${post.id}/edit`)}
                        className="p-2 bg-white border border-gray-100 rounded-lg hover:bg-indigo-50 text-indigo-600 transition"
                        title="Edit"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5" />
                        </svg>
                      </button>

                      <button
                        onClick={() => alert("Delete action (UI-only)")}
                        className="p-2 bg-white border border-gray-100 rounded-lg hover:bg-red-50 text-red-600 transition"
                        title="Delete"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </section>
      </main>

      {/* Floating Create FAB (mobile) */}
      <button
        onClick={() => navigate("/post")}
        className="fixed bottom-6 right-6 md:hidden inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-2xl hover:scale-105 transform transition"
        aria-label="Create post"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </button>
    </div>
  );
}
