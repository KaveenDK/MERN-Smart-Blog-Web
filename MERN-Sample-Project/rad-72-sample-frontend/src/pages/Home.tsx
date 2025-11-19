import React, { useEffect, useState, type JSX } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

export default function Home(): JSX.Element {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    // trigger entrance animations
    const t = setTimeout(() => setMounted(true), 40);
    return () => clearTimeout(t);
  }, []);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 antialiased">
      {/* Top bar */}
      <nav className="bg-white/60 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <div
                className={`w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg transform transition-all duration-400 ${
                  mounted ? "scale-100" : "scale-95 opacity-0"
                }`}
              >
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Dashboard</h3>
                <p className="text-xs text-gray-400">Welcome to your workspace</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate("/post")}
                className="inline-flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition transform hover:-translate-y-0.5 text-sm text-gray-700"
              >
                Create Post
              </button>

              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-2 px-4 py-2 bg-red-500 text-white text-sm font-semibold rounded-lg hover:bg-red-600 transition-shadow shadow-sm hover:shadow-lg"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main */}
      <main className="flex-1 px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div
            className={`grid grid-cols-1 lg:grid-cols-3 gap-8 items-start
              ${mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-6"} transition-all duration-500`}
          >
            {/* Welcome / Hero */}
            <section className="lg:col-span-2">
              <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 md:p-10 shadow-xl border border-white/40">
                <div className="flex flex-col md:flex-row md:items-center gap-6">
                  <div
                    className={`flex-none w-28 h-28 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white text-2xl font-bold shadow-2xl transform transition duration-500 ${
                      mounted ? "scale-100" : "scale-95"
                    }`}
                    aria-hidden
                  >
                    {user?.email ? user.email.charAt(0).toUpperCase() : "U"}
                  </div>

                  <div className="flex-1">
                    <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">
                      Welcome back{user?.email ? `, ${user.email.split("@")[0]}` : ""} 👋
                    </h1>
                    <p className="mt-2 text-sm text-gray-500 max-w-prose">
                      You're successfully logged in. Manage your profile, create posts, and explore the activity on the platform.
                    </p>

                    <div className="mt-6 flex flex-wrap gap-3">
                      <button
                        onClick={() => navigate("/post")}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold shadow hover:shadow-lg transform hover:-translate-y-1 transition"
                      >
                        New Post
                      </button>

                      <button
                        onClick={() => navigate("/my-post")}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition"
                      >
                        My Posts
                      </button>

                      <button
                        onClick={() => navigate("/posts")}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition"
                      >
                        Browse Posts
                      </button>
                    </div>
                  </div>
                </div>

                {/* Quick stats */}
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { title: "Saved Plans", value: "12" },
                    { title: "Your Posts", value: "8" },
                    { title: "Followers", value: "254" },
                  ].map((s) => (
                    <div
                      key={s.title}
                      className="p-4 rounded-xl bg-gradient-to-br from-white to-white/80 border border-gray-100 hover:shadow-2xl transition transform hover:-translate-y-1"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-500">{s.title}</p>
                          <p className="mt-1 text-2xl font-bold text-slate-900">{s.value}</p>
                        </div>
                        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600">
                          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action / Feature cards */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-50 to-white border border-blue-100 shadow transition transform hover:-translate-y-2 hover:shadow-2xl">
                  <h4 className="text-lg font-semibold text-blue-900">Profile</h4>
                  <p className="mt-1 text-sm text-blue-600">Update your profile information, avatar, and roles.</p>
                </div>

                <div className="p-5 rounded-2xl bg-gradient-to-br from-purple-50 to-white border border-purple-100 shadow transition transform hover:-translate-y-2 hover:shadow-2xl">
                  <h4 className="text-lg font-semibold text-purple-900">Settings</h4>
                  <p className="mt-1 text-sm text-purple-600">Configure preferences, notifications and privacy.</p>
                </div>
              </div>
            </section>

            {/* Right column: Activity feed / Recent posts */}
            <aside className="space-y-4">
              <div className="rounded-2xl bg-white/80 backdrop-blur p-4 border border-white/40 shadow">
                <div className="flex items-center justify-between">
                  <h5 className="text-sm font-semibold text-gray-800">Recent Activity</h5>
                  <span className="text-xs text-gray-400">Today</span>
                </div>

                <ul className="mt-3 space-y-3">
                  {[
                    { txt: "You created a new post", time: "2h" },
                    { txt: "Commented on Vacation planning", time: "7h" },
                    { txt: "Your post got 10 likes", time: "1d" },
                  ].map((a, idx) => (
                    <li
                      key={idx}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition cursor-default"
                    >
                      <div className="w-9 h-9 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center text-sm font-medium">
                        {a.txt.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <div className="text-sm text-gray-700">{a.txt}</div>
                        <div className="text-xs text-gray-400">{a.time}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl bg-white/80 backdrop-blur p-4 border border-white/40 shadow">
                <h5 className="text-sm font-semibold text-gray-800">Shortcuts</h5>
                <div className="mt-3 grid grid-cols-2 gap-3">
                  <button
                    onClick={() => navigate("/post")}
                    className="py-2 px-3 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition"
                  >
                    + New Post
                  </button>
                  <button
                    onClick={() => navigate("/posts")}
                    className="py-2 px-3 rounded-lg bg-white border border-gray-200 text-sm hover:bg-gray-50 transition"
                  >
                    Browse Posts
                  </button>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}
