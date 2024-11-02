import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { MdLock, MdEmail } from "react-icons/md";
import api from "../services/api";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Check if user is already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    const isAuthenticated = localStorage.getItem("isAuthenticated");

    if (token && isAuthenticated === "true") {
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await api.post("/auth/login", formData);

      if (response.data) {
        // Store auth data
        localStorage.setItem("token", response.data.token);
        localStorage.setItem(
          "user",
          JSON.stringify({
            id: response.data._id,
            email: response.data.email,
          })
        );
        localStorage.setItem("isAuthenticated", "true");

        // Verify token immediately after login
        try {
          await api.get("/auth/verify");
          navigate("/");
        } catch (verifyError) {
          throw new Error("Token verification failed");
        }
      }
    } catch (err) {
      setError(
        err.response?.data?.error ||
          err.message ||
          "An error occurred during login"
      );

      // Clear any invalid tokens
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("isAuthenticated");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (error) setError("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 space-y-6">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-2">
            Welcome Back
          </h2>
          <p className="text-gray-600">
            New to Cantina POS?{" "}
            <Link
              to="/signup"
              className="text-indigo-600 hover:text-indigo-500 font-semibold transition-colors"
            >
              Create an account
            </Link>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
              <p className="text-red-700 text-sm font-medium">{error}</p>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <MdEmail className="h-5 w-5 text-indigo-500" />
                </div>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition-colors"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={loading}
                />
              </div>
            </div>

            <div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <MdLock className="h-5 w-5 text-indigo-500" />
                </div>
                <input
                  type="password"
                  name="password"
                  required
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition-colors"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  disabled={loading}
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                disabled={loading}
              />
              <span className="ml-2 text-sm text-gray-600">Remember me</span>
            </label>

            <Link
              to="/forgot-password"
              className="text-sm text-indigo-600 hover:text-indigo-500 font-semibold transition-colors"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-xl transition-colors duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Signing in...
              </span>
            ) : (
              "Sign in"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
