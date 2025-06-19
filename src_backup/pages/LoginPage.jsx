import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import supabase from "../supabaseClient";
import logo from "../assets/logo.png";

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      localStorage.setItem("authToken", data.session.access_token);
      navigate("/dashboard");
    }
    setLoading(false);
  };

  const handleForgotPassword = async () => {
    if (!email) {
      alert("Please enter your email to reset the password.");
      return;
    }
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) {
      alert(`Error: ${error.message}`);
    } else {
      alert("Password reset email sent.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <div className="logo-container flex justify-center mb-6">
          <img src={logo} alt="Logo" className="logo-img h-12" />
        </div>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              id="email"
              className="input w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              autoComplete="email"
            />
          </div>
          <div className="mb-2 relative">
            <label htmlFor="password" className="block mb-1 font-medium">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className="input w-full pr-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              autoComplete="current-password"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute top-9 right-3 text-gray-600 focus:outline-none"
              tabIndex={-1}
            >
              {showPassword ? (
                // Hide icon
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                  viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.97 0-9-4-9-9 
                    0-1.088.205-2.135.57-3.103M3 3l18 18M9.878 
                    9.88a3 3 0 104.242 4.242M12 5c3.866 0 7 3.134 
                    7 7 0 1.565-.597 2.987-1.57 4.05" />
                </svg>
              ) : (
                // Show icon
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                  viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M2.458 12C3.732 7.943 7.523 5 
                    12 5c4.478 0 8.268 2.943 9.542 7-1.274 
                    4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          </div>
          <div className="mb-6 text-right">
            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-sm text-blue-600 hover:underline focus:outline-none"
            >
              Forgot Password?
            </button>
          </div>
          <button type="submit" className="btn-primary w-full" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        {error && (
          <p className="text-red-600 mt-4 text-center text-sm" role="alert">
            {error}
          </p>
        )}
        <p className="text-center mt-4 text-sm">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
