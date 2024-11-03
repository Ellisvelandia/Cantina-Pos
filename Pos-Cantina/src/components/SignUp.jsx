import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { MdLock, MdEmail, MdVisibility, MdVisibilityOff } from "react-icons/md";
import api from "../services/api";
import { motion, AnimatePresence } from "framer-motion";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const videoElement = document.querySelector("video");
    if (videoElement) {
      videoElement.addEventListener("loadeddata", () => {
        setVideoLoaded(true);
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

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    setLoading(true);

    try {
      const response = await api.post("/auth/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      if (response.data) {
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
    <div className="fixed inset-0 flex items-center justify-center overflow-auto bg-slate-900">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-800" />

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

        <div className="absolute inset-0 bg-black/50" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-20 w-full max-w-[900px] mx-auto px-6 min-h-screen py-8 flex items-center"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
          className="bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl border border-white/20 w-full 
                     overflow-hidden my-auto"
        >
          <div
            className="flex flex-row max-h-[90vh] overflow-auto
                        [&::-webkit-scrollbar]:w-2
                        [&::-webkit-scrollbar-track]:bg-black/10
                        [&::-webkit-scrollbar-thumb]:bg-amber-500/50
                        [&::-webkit-scrollbar-thumb]:rounded-full
                        [&::-webkit-scrollbar-thumb]:border-2
                        [&::-webkit-scrollbar-thumb]:border-transparent
                        [&::-webkit-scrollbar-thumb]:bg-clip-padding
                        [&::-webkit-scrollbar-thumb]:hover:bg-amber-500/70
                        scrollbar-thin
                        scrollbar-track-black/10
                        scrollbar-thumb-amber-500/50"
          >
            <div className="hidden lg:flex w-1/3 bg-gradient-to-b from-amber-500/20 to-amber-700/20 backdrop-blur-sm">
              <div className="flex flex-col items-center justify-center w-full p-8 text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="space-y-6"
                >
                  <h3 className="text-3xl font-bold text-white">
                    Manage your canteen!
                  </h3>
                  <p className="text-gray-200 text-lg max-w-[280px] mx-auto">
                    Already have an account? Sign in to continue your journey
                  </p>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link
                      to="/login"
                      className="inline-block px-8 py-3 rounded-xl border-2 border-white/20 
                               text-white font-medium hover:bg-white/10 transition-colors
                               backdrop-blur-sm"
                    >
                      Sign In
                    </Link>
                  </motion.div>
                </motion.div>
              </div>
            </div>

            <div
              className="flex-1 lg:max-w-[600px] overflow-y-auto
                          [&::-webkit-scrollbar]:w-2
                          [&::-webkit-scrollbar-track]:bg-black/10
                          [&::-webkit-scrollbar-thumb]:bg-amber-500/50
                          [&::-webkit-scrollbar-thumb]:rounded-full
                          [&::-webkit-scrollbar-thumb]:border-2
                          [&::-webkit-scrollbar-thumb]:border-transparent
                          [&::-webkit-scrollbar-thumb]:bg-clip-padding
                          [&::-webkit-scrollbar-thumb]:hover:bg-amber-500/70
                          scrollbar-thin
                          scrollbar-track-black/10
                          scrollbar-thumb-amber-500/50"
            >
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

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-200 ml-1">
                      Name
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center">
                        <svg
                          className="h-5 w-5 text-amber-300"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                      </div>
                      <input
                        type="text"
                        name="name"
                        required
                        className="w-full pl-11 pr-4 py-3.5 bg-white/10 border border-white/20 rounded-xl 
                                 text-white placeholder-gray-400 
                                 focus:bg-white/20 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20
                                 transition-all duration-200"
                        placeholder="Your name"
                        value={formData.name}
                        onChange={handleInputChange}
                        disabled={loading}
                      />
                    </div>
                  </div>

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
                        disabled={loading}
                      />
                    </div>
                  </div>

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
                        disabled={loading}
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

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-200 ml-1">
                      Confirm Password
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center">
                        <MdLock className="h-5 w-5 text-amber-300" />
                      </div>
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        required
                        className="w-full pl-11 pr-12 py-3.5 bg-white/10 border border-white/20 rounded-xl 
                                 text-white placeholder-gray-400 
                                 focus:bg-white/20 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20
                                 transition-all duration-200"
                        placeholder="••••••••"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        disabled={loading}
                      />
                    </div>
                  </div>

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
                        Creating account...
                      </span>
                    ) : (
                      "Sign up"
                    )}
                  </motion.button>

                  <div className="text-center pt-2 lg:hidden">
                    <p className="text-sm text-gray-300">
                      Already have an account?{" "}
                      <Link
                        to="/login"
                        className="text-amber-400 hover:text-amber-300 font-medium hover:underline"
                      >
                        Sign in
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SignUp;
