import { useEffect, useState, type JSX } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/authContext";

export default function Header(): JSX.Element {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  useEffect(() => {
    // close mobile menu and profile on route change
    setMobileOpen(false);
    setProfileOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigate("/");
  };

  const isActive = (path: string) => location.pathname === path;

  // Navigation items (keeps code tidy)
  const navItems: { to: string; label: string; icon: JSX.Element }[] = [
    {
      to: "/home",
      label: "Home",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
    },
    {
      to: "/post",
      label: "Posts",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
        </svg>
      ),
    },
  ];

  return (
    <header className="bg-white/60 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Logo + Nav */}
          <div className="flex items-center gap-6">
            <Link to="/home" className="flex items-center gap-3 group" aria-label="Travel Planner Home">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg transform transition-transform duration-300 group-hover:-translate-y-1">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>

              <div className="hidden sm:flex flex-col leading-tight">
                <span className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                  GDSE 72
                </span>
                <span className="text-xs text-gray-500">Plan · Share · Explore</span>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`relative px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2 ${
                    isActive(item.to)
                      ? "text-indigo-600"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  <span className="opacity-90">{item.icon}</span>
                  <span className="hidden md:inline">{item.label}</span>

                  {/* animated underline */}
                  <span
                    className={`absolute -bottom-1 left-4 h-[3px] rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300 ${
                      isActive(item.to) ? "w-[calc(100%-2rem)] scale-x-100" : "w-[0px] scale-x-0"
                    }`}
                    aria-hidden
                  />
                </Link>
              ))}

              {/* Conditionally show My Posts */}
              {(user?.roles?.includes("ADMIN") || user?.roles?.includes("AUTHOR")) && (
                <Link
                  to="/my-post"
                  className={`relative px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2 ${
                    isActive("/my-post") ? "text-indigo-600" : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="hidden md:inline">My Posts</span>

                  <span
                    className={`absolute -bottom-1 left-4 h-[3px] rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300 ${
                      isActive("/my-post") ? "w-[calc(100%-2rem)] scale-x-100" : "w-[0px] scale-x-0"
                    }`}
                    aria-hidden
                  />
                </Link>
              )}
            </nav>
          </div>

          {/* Right: user area and mobile controls */}
          <div className="flex items-center gap-4">
            {/* Desktop user info & actions */}
            <div className="hidden sm:flex items-center gap-3">
              <div
                className="flex items-center gap-3 px-3 py-2 bg-gray-50 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow cursor-default"
                title={user?.email || "Guest"}
              >
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-sm font-medium">
                  {/* initials fallback */}
                  {user?.email ? user.email.charAt(0).toUpperCase() : <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>}
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-700 truncate max-w-[12rem]">{user?.email || "Guest"}</span>
                  <span className="text-xs text-gray-400">{user?.roles?.join?.(", ") || "Visitor"}</span>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="px-3 py-2 bg-red-500 text-white text-sm font-semibold rounded-lg hover:bg-red-600 transition-colors shadow-sm hover:shadow-md flex items-center gap-2"
                aria-label="Log out"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>

            {/* Mobile profile dropdown & logout (small screens) */}
            <div className="sm:hidden flex items-center gap-2">
              <button
                onClick={() => setProfileOpen((s) => !s)}
                className="p-2 rounded-md bg-gray-50 border border-gray-100 shadow-sm hover:shadow-md transition"
                aria-haspopup="true"
                aria-expanded={profileOpen}
                aria-label="Open profile menu"
              >
                <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14a7 7 0 100-14 7 7 0 000 14zm0 2c4.418 0 8 3.582 8 8H4c0-4.418 3.582-8 8-8z" />
                </svg>
              </button>

              {/* mobile menu toggle */}
              <button
                onClick={() => setMobileOpen((s) => !s)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:bg-gray-100 transition"
                aria-controls="mobile-menu"
                aria-expanded={mobileOpen}
                aria-label="Toggle menu"
              >
                <span className="sr-only">Open main menu</span>
                {/* animated hamburger */}
                <div className="w-6 h-5 relative">
                  <span
                    className={`block absolute left-0 top-0 w-6 h-0.5 bg-current transform transition duration-300 ${mobileOpen ? "rotate-45 translate-y-2.5" : "-translate-y-1.5"}`}
                  />
                  <span
                    className={`block absolute left-0 top-1/2 w-6 h-0.5 bg-current transform transition duration-300 ${mobileOpen ? "opacity-0" : " -translate-y-0.5"}`}
                  />
                  <span
                    className={`block absolute left-0 bottom-0 w-6 h-0.5 bg-current transform transition duration-300 ${mobileOpen ? "-rotate-45 -translate-y-2.5" : " translate-y-1.5"}`}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile panels */}
      <div className={`md:hidden transition-max-h duration-300 ease-in-out overflow-hidden ${mobileOpen ? "max-h-[400px]" : "max-h-0"}`} id="mobile-menu">
        <div className="px-4 pt-4 pb-6 space-y-3 border-t border-gray-100 bg-white">
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`px-3 py-2 rounded-lg flex items-center gap-3 text-sm font-medium transition-colors ${
                  isActive(item.to) ? "bg-indigo-50 text-indigo-600" : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}

            {(user?.roles?.includes("ADMIN") || user?.roles?.includes("AUTHOR")) && (
              <Link
                to="/my-post"
                className={`px-3 py-2 rounded-lg flex items-center gap-3 text-sm font-medium transition-colors ${
                  isActive("/my-post") ? "bg-indigo-50 text-indigo-600" : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>My Posts</span>
              </Link>
            )}
          </nav>

          {/* mobile profile actions */}
          <div className="pt-2 border-t border-gray-100">
            <div className="flex items-center gap-3 px-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-sm font-medium">
                {user?.email ? user.email.charAt(0).toUpperCase() : "G"}
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-800">{user?.email || "Guest"}</div>
                <div className="text-xs text-gray-400">{user?.roles?.join?.(", ") || "Visitor"}</div>
              </div>
              <button
                onClick={handleLogout}
                className="ml-auto px-3 py-2 bg-red-500 text-white rounded-md text-sm font-semibold hover:bg-red-600 transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Profile dropdown (small, used on mobile for extra control) */}
      {profileOpen && (
        <div className="sm:hidden absolute right-4 top-16 z-40">
          <div className="w-48 bg-white rounded-md shadow-lg ring-1 ring-black/5 overflow-hidden">
            <div className="px-4 py-3">
              <p className="text-sm font-medium text-gray-800 truncate">{user?.email || "Guest"}</p>
              <p className="text-xs text-gray-400">{user?.roles?.join?.(", ") || "Visitor"}</p>
            </div>
            <div className="border-t border-gray-100">
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
