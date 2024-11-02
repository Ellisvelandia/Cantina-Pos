import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { MdLock, MdEmail, MdVisibility, MdVisibilityOff } from "react-icons/md";
import api from "../services/api";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    setLoading(true);

    try {
      const response = await api.post("/auth/register", {
        email: formData.email,
        password: formData.password,
      });

      if (response.data) {
        // Don't store auth data after registration
        navigate("/login");
      }
    } catch (err) {
      setError(
        err.response?.data?.error || "An error occurred during registration."
      );
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
    if (error) setError("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 space-y-6">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-2">
            Create Account
          </h2>
          <p className="text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-indigo-600 hover:text-indigo-500 font-semibold transition-colors"
            >
              Sign in
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
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  className="w-full pl-11 pr-12 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition-colors"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  disabled={loading}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <MdVisibilityOff className="h-5 w-5 text-gray-400 hover:text-indigo-500" />
                  ) : (
                    <MdVisibility className="h-5 w-5 text-gray-400 hover:text-indigo-500" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <MdLock className="h-5 w-5 text-indigo-500" />
                </div>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  required
                  className="w-full pl-11 pr-12 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition-colors"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  disabled={loading}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <MdVisibilityOff className="h-5 w-5 text-gray-400 hover:text-indigo-500" />
                  ) : (
                    <MdVisibility className="h-5 w-5 text-gray-400 hover:text-indigo-500" />
                  )}
                </button>
              </div>
            </div>
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
                Creating account...
              </span>
            ) : (
              "Create Account"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
