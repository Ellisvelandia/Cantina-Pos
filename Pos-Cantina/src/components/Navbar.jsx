import { IoNotifications } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { MdMenu } from "react-icons/md";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = ({ onMenuClick }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-30">
      <div className="px-4 lg:px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button
              className="p-2 rounded-lg lg:hidden text-gray-600 hover:bg-gray-100"
              onClick={onMenuClick}
            >
              <MdMenu className="h-6 w-6" />
            </button>

            <div className="font-bold text-lg lg:text-xl text-blue-600 ml-2">
              Cantina POS
            </div>
          </div>

          <div className="flex items-center space-x-2 lg:space-x-4">
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <IoNotifications className="h-5 w-5 lg:h-6 lg:w-6 text-gray-500" />
            </button>

            <div className="relative" ref={dropdownRef}>
              <button
                className="flex items-center space-x-2 hover:bg-gray-100 rounded-lg p-2"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <FaUserCircle className="h-7 w-7 lg:h-8 lg:w-8 text-gray-400" />
                <span className="hidden lg:inline text-sm font-medium text-gray-700">
                  {user?.email || "User"}
                </span>
              </button>

              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 border border-gray-200">
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;