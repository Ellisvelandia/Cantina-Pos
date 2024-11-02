import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { MdLock, MdEmail, MdVisibility, MdVisibilityOff } from "react-icons/md";
import api from "../services/api";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  // Check if user is already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    const isAuthenticated = localStorage.getItem("isAuthenticated");

    if (token && isAuthenticated === "true") {
      navigate("/");
    }
  }, [navigate]);

  // Video loading handler
  useEffect(() => {
    const videoElement = document.querySelector("video");
    if (videoElement) {
      videoElement.addEventListener("loadeddata", () => {
        setVideoLoaded(true);
        console.log("Video loaded successfully");
      });

      videoElement.addEventListener("error", (e) => {
        console.error("Video error:", e);
        setVideoLoaded(false);
      });
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await api.post("/auth/login", formData);

      if (response.data) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem(
          "user",
          JSON.stringify({
            id: response.data._id,
            email: response.data.email,
          })
        );
        localStorage.setItem("isAuthenticated", "true");

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
    if (error) setError("");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center overflow-hidden bg-slate-900">
      {/* Background with fallback */}
      <div className="absolute inset-0">
        {/* Fallback gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-800" />

        {/* Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className={`w-full h-full object-cover transition-opacity duration-1000 ${
            videoLoaded ? "opacity-60" : "opacity-0"
          }`}
          poster="/bar-poster.png"
        >
          <source src="/bar-ambience.mp4" type="video/mp4" />
        </video>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content Container - Updated for better height handling */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-20 w-full max-w-[420px] mx-auto px-6 h-full max-h-screen py-4 flex flex-col justify-center"
      >
        {/* Main Card - Adjusted padding and spacing */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl border border-white/20 overflow-hidden"
        >
          {/* Card Header - Reduced padding */}
          <div className="px-7 pt-6 pb-4">
            <h2 className="text-2xl font-medium text-white mb-1">
              Welcome Back
            </h2>
            <p className="text-gray-300 text-sm">
              Ready to serve up some magic?
            </p>
          </div>

          <div className="bg-white/10 px-7 pb-7 pt-5">
            <form onSubmit={handleSubmit} className="space-y-5">
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="bg-red-500/20 border border-red-500/50 px-4 py-3 rounded-xl"
                  >
                    <p className="text-red-200 text-sm">{error}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Email Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-200 ml-1">
                  Email
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center">
                    <MdEmail className="h-5 w-5 text-amber-300" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full pl-11 pr-4 py-3.5 bg-white/10 border border-white/20 rounded-xl 
                             text-white placeholder-gray-400 
                             focus:bg-white/20 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20
                             transition-all duration-200"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-200 ml-1">
                  Password
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center">
                    <MdLock className="h-5 w-5 text-amber-300" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    required
                    className="w-full pl-11 pr-12 py-3.5 bg-white/10 border border-white/20 rounded-xl 
                             text-white placeholder-gray-400 
                             focus:bg-white/20 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20
                             transition-all duration-200"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center"
                  >
                    {showPassword ? (
                      <MdVisibilityOff className="h-5 w-5 text-gray-400 hover:text-amber-300" />
                    ) : (
                      <MdVisibility className="h-5 w-5 text-gray-400 hover:text-amber-300" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember & Forgot */}
              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-white/20 bg-white/10 text-amber-400 
                             focus:ring-amber-400/20 focus:ring-offset-0"
                  />
                  <span className="text-sm text-gray-300 group-hover:text-white">
                    Remember me
                  </span>
                </label>
                <Link
                  to="/forgot-password"
                  className="text-sm text-amber-400 hover:text-amber-300"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white 
                         font-medium py-3.5 rounded-xl hover:from-amber-600 hover:to-amber-700
                         transition-all duration-200 shadow-lg shadow-amber-500/25
                         disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin h-5 w-5 mr-2"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    Pouring in...
                  </span>
                ) : (
                  "Sign in"
                )}
              </motion.button>
            </form>
          </div>
        </motion.div>

        {/* Footer - Adjusted spacing */}
        <p className="text-center mt-5 text-sm text-gray-300">
          New to Cantina?{" "}
          <Link
            to="/signup"
            className="text-amber-400 hover:text-amber-300 font-medium hover:underline"
          >
            Create an account
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
