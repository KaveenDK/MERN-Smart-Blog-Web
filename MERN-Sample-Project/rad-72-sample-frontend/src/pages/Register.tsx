import React, { useEffect, useState, type JSX } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../services/auth";

export default function Register(): JSX.Element {
  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);

  // simple UI validation state
  const [errors, setErrors] = useState<{ [k: string]: string }>({});

  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 30);
    return () => clearTimeout(t);
  }, []);

  const validate = () => {
    const e: { [k: string]: string } = {};
    if (!email.trim()) e.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(email)) e.email = "Enter a valid email";
    if (!firstname.trim()) e.firstname = "First name is required";
    if (!lastname.trim()) e.lastname = "Last name is required";
    if (!password.trim()) e.password = "Password is required";
    else if (password.length < 8) e.password = "Use at least 8 characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      setLoading(true);
      const data: any = await register(email, firstname, lastname, password);

      // keep original behavior: show alert and navigate to login
      alert(`Registration successful! Email: ${data?.data?.email ?? email}`);
      navigate("/login");
    } catch (err: any) {
      console.error("Registration error:", err);
      // friendly error handling
      const msg = err?.response?.data?.message || err?.message || "Registration failed. Please try again.";
      alert(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-pink-600 via-purple-600 to-indigo-600 flex items-center justify-center p-6">
      {/* decorative blobs */}
      <div className="pointer-events-none absolute -left-20 -top-20 w-72 h-72 rounded-full bg-white/6 blur-3xl transform-gpu animate-blob" />
      <div className="pointer-events-none absolute -right-20 -bottom-16 w-80 h-80 rounded-full bg-white/6 blur-3xl transform-gpu animate-blob animation-delay-2000" />

      <div
        className={`max-w-md w-full transition-all duration-600 transform ${
          mounted ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-6 scale-95"
        }`}
      >
        {/* Back */}
        <div className="mb-4">
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 text-white/90 hover:text-white transition-colors"
            aria-label="Back to home"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </button>
        </div>

        {/* Card */}
        <div className="relative bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-8 md:p-10 border border-white/40">
          {/* floating icon */}
          <div className="absolute -top-10 left-1/2 -translate-x-1/2">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center shadow-xl transform transition-transform duration-500">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
          </div>

          <div className="mt-12 text-center">
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-1">Create Account</h1>
            <p className="text-sm text-slate-500 mb-6">Join us today and get started — it only takes a minute.</p>
          </div>

          <form onSubmit={handleRegister} noValidate className="space-y-4">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zM16 12v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206" />
                  </svg>
                </div>

                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  autoComplete="email"
                  className={`w-full pl-11 pr-4 py-3 rounded-lg border transition-all focus:outline-none focus:ring-2 focus:ring-pink-500 ${
                    errors.email ? "border-red-300 bg-red-50" : "border-gray-200 bg-white"
                  }`}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
                {errors.email && (
                  <p id="email-error" className="mt-2 text-xs text-red-600">
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            {/* First & Last name (responsive two-column) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstname" className="block text-sm font-medium text-gray-700 mb-2">
                  First name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <input
                    id="firstname"
                    type="text"
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                    placeholder="Jane"
                    className={`w-full pl-11 pr-4 py-3 rounded-lg border transition-all focus:outline-none focus:ring-2 focus:ring-pink-500 ${
                      errors.firstname ? "border-red-300 bg-red-50" : "border-gray-200 bg-white"
                    }`}
                    aria-invalid={!!errors.firstname}
                    aria-describedby={errors.firstname ? "firstname-error" : undefined}
                  />
                  {errors.firstname && (
                    <p id="firstname-error" className="mt-2 text-xs text-red-600">
                      {errors.firstname}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="lastname" className="block text-sm font-medium text-gray-700 mb-2">
                  Last name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <input
                    id="lastname"
                    type="text"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                    placeholder="Doe"
                    className={`w-full pl-11 pr-4 py-3 rounded-lg border transition-all focus:outline-none focus:ring-2 focus:ring-pink-500 ${
                      errors.lastname ? "border-red-300 bg-red-50" : "border-gray-200 bg-white"
                    }`}
                    aria-invalid={!!errors.lastname}
                    aria-describedby={errors.lastname ? "lastname-error" : undefined}
                  />
                  {errors.lastname && (
                    <p id="lastname-error" className="mt-2 text-xs text-red-600">
                      {errors.lastname}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a strong password"
                  autoComplete="new-password"
                  className={`w-full pl-11 pr-12 py-3 rounded-lg border transition-all focus:outline-none focus:ring-2 focus:ring-pink-500 ${
                    errors.password ? "border-red-300 bg-red-50" : "border-gray-200 bg-white"
                  }`}
                  aria-invalid={!!errors.password}
                  aria-describedby={errors.password ? "password-error" : undefined}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 p-1 rounded-md transition"
                  aria-pressed={showPassword}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.027.152-2.02.437-2.943M6.12 6.12A9.969 9.969 0 0112 5c5.523 0 10 4.477 10 10 0 1.03-.15 2.024-.434 2.95M3 3l18 18" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.27 2.943 9.543 7-1.273 4.057-5.065 7-9.543 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>

                {errors.password && (
                  <p id="password-error" className="mt-2 text-xs text-red-600">
                    {errors.password}
                  </p>
                )}
              </div>
            </div>

            {/* Submit */}
            <div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full inline-flex items-center justify-center gap-3 py-3 rounded-lg font-semibold text-white shadow-lg transition transform ${
                  loading
                    ? "bg-gradient-to-r from-pink-500 to-purple-500 opacity-80 cursor-wait"
                    : "bg-gradient-to-r from-pink-500 to-purple-600 hover:shadow-2xl hover:-translate-y-0.5"
                }`}
                aria-busy={loading}
              >
                {loading ? (
                  <>
                    <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <circle cx="12" cy="12" r="10" strokeWidth={4} className="opacity-25" />
                      <path d="M4 12a8 8 0 018-8" strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Creating...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Create Account
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Sign in link */}
          <div className="mt-5 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <button
                onClick={() => navigate("/login")}
                className="text-pink-600 font-semibold hover:text-pink-700 hover:underline transition"
              >
                Sign In
              </button>
            </p>
          </div>
        </div>

        {/* footer note */}
        <p className="text-center mt-6 text-white/90 text-sm">
          By registering you agree to the Terms of Service.
        </p>
      </div>

      {/* small helper keyframes if animate-blob not configured in Tailwind */}
      <style>{`
        @keyframes blob {
          0% { transform: translateY(0px) scale(1); opacity: .95; }
          33% { transform: translateY(-12px) scale(1.05); opacity: .85; }
          66% { transform: translateY(8px) scale(0.98); opacity: .9; }
          100% { transform: translateY(0px) scale(1); opacity: .95; }
        }
        .animate-blob { animation: blob 7s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
      `}</style>
    </div>
  );
}
