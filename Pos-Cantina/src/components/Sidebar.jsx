import { Link, useLocation } from "react-router-dom";
import { MdDashboard, MdInventory, MdPeople, MdClose } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import { IoStatsChart } from "react-icons/io5";

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();

  const navigation = [
    {
      name: "Dashboard",
      path: "/",
      icon: MdDashboard,
    },
    {
      name: "Products",
      path: "/products",
      icon: MdInventory,
    },
    {
      name: "Sales",
      path: "/sales",
      icon: FaShoppingCart,
    },
    {
      name: "Clients",
      path: "/clients",
      icon: MdPeople,
    },
    {
      name: "Reports",
      path: "/reports",
      icon: IoStatsChart,
    },
  ];

  return (
    <aside
      className={`fixed top-0 left-0 h-screen bg-white border-r border-gray-200 z-40 w-[280px] transition-transform duration-300 ease-in-out transform lg:translate-x-0 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* Close button for mobile */}
      <button
        className="lg:hidden absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        onClick={onClose}
      >
        <MdClose className="h-6 w-6" />
      </button>

      {/* Sidebar content */}
      <div className="pt-16">
        <nav className="mt-4 px-4">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => onClose()} // Close sidebar on mobile when clicking a link
                className={`flex items-center px-4 py-3 mb-1 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === item.path
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <Icon
                  className={`h-5 w-5 mr-3 ${
                    location.pathname === item.path
                      ? "text-blue-600"
                      : "text-gray-400"
                  }`}
                />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
