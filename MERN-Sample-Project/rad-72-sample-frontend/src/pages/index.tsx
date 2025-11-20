import { useEffect, useState, type JSX } from "react";
import { Link } from "react-router-dom";

export default function Index(): JSX.Element {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 30);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center p-6">
      {/* Decorative floating blobs */}
      <div className="pointer-events-none absolute -left-10 -top-10 w-72 h-72 rounded-full bg-white/5 blur-3xl transform-gpu animate-blob"></div>
      <div className="pointer-events-none absolute -right-16 bottom-10 w-80 h-80 rounded-full bg-white/5 blur-3xl transform-gpu animate-blob animation-delay-2000"></div>

      <div
        className={`max-w-4xl w-full transition-all duration-700 transform ${
          mounted ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-6 scale-95"
        }`}
      >
        {/* Card */}
        <div className="relative bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-8 md:p-12 text-center border border-white/40">
          {/* Floating accent */}
          <div className="absolute -top-8 left-1/2 -translate-x-1/2">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-xl transform transition-transform duration-500 hover:-translate-y-1">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>

          {/* Content */}
          <div className="mt-12">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
              Welcome Smart Blog Web!
            </h1>

            <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
              Experience rapid development with a modern demo app — built with React + Tailwind. Log in or create an account to get started.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <Link
                to="/login"
                className="group relative inline-flex items-center overflow-hidden rounded-xl px-8 py-4 font-semibold text-white shadow-lg transform transition-all duration-250"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-purple-700 to-indigo-600 opacity-95 group-hover:scale-105 transform-gpu transition-transform duration-300" />
                <span className="relative z-10 flex items-center gap-3">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14" />
                  </svg>
                  Login
                </span>
              </Link>

              <Link
                to="/register"
                className="group relative inline-flex items-center overflow-hidden rounded-xl px-8 py-4 font-semibold text-white shadow-lg transform transition-all duration-250"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-pink-500 to-pink-600 opacity-95 group-hover:scale-105 transform-gpu transition-transform duration-300" />
                <span className="relative z-10 flex items-center gap-3">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Register
                </span>
              </Link>
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              <article className="p-5 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 hover:shadow-2xl transform hover:-translate-y-2 transition">
                <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-purple-900 mb-1 text-center">Fast Development</h3>
                <p className="text-sm text-purple-700 text-center">Build interfaces rapidly with Tailwind utilities.</p>
              </article>

              <article className="p-5 rounded-xl bg-gradient-to-br from-pink-50 to-pink-100 border border-pink-200 hover:shadow-2xl transform hover:-translate-y-2 transition">
                <div className="w-10 h-10 bg-pink-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-pink-900 mb-1 text-center">Secure</h3>
                <p className="text-sm text-pink-700 text-center">Authentication and tokens for protected routes.</p>
              </article>

              <article className="p-5 rounded-xl bg-gradient-to-br from-indigo-50 to-indigo-100 border border-indigo-200 hover:shadow-2xl transform hover:-translate-y-2 transition">
                <div className="w-10 h-10 bg-indigo-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
                  </svg>
                </div>
                <h3 className="font-semibold text-indigo-900 mb-1 text-center">Modern Stack</h3>
                <p className="text-sm text-indigo-700 text-center">React + Tailwind for productivity and style.</p>
              </article>
            </div>
          </div>

          {/* Footer */}
          <p className="text-center mt-10 text-gray-700 text-sm font-medium">
            Smart Blog Web by KaveeN | React + Tailwind Demo © 2025
          </p>
        </div>
      </div>

      {/* small helper: add simple keyframes via Tailwind config or inline style if not present */}
      <style>{`
        /* optional helpers if animate-blob isn't in your Tailwind build */
        @keyframes blob {
          0% { transform: translateY(0px) scale(1); opacity: 0.9; }
          33% { transform: translateY(-12px) scale(1.05); opacity: 0.8; }
          66% { transform: translateY(6px) scale(0.98); opacity: 0.85; }
          100% { transform: translateY(0px) scale(1); opacity: 0.9; }
        }
        .animate-blob { animation: blob 7s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
      `}</style>
    </div>
  );
}
