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
    <>
      {/* Simple dark overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-screen bg-white backdrop-blur-md border-r border-white/20 z-40 w-[280px] 
                   transition-all duration-300 ease-in-out transform lg:translate-x-0 shadow-xl
                   ${isOpen ? "translate-x-0" : "-translate-x-full"}
                   lg:bg-white/10 bg-white`}
      >
        {/* Close button */}
        <button
          className="lg:hidden absolute top-4 right-4 text-gray-400 hover:text-amber-300"
          onClick={onClose}
        >
          <MdClose className="h-6 w-6" />
        </button>

        {/* Header with Logo */}
        <div className="pt-8 pb-6">
          <div className="px-6">
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-3 mb-1">
                <img
                  src="/logo.png"
                  alt="Pos Cantina Logo"
                  className="h-8 w-auto"
                />
                <h1 className="text-center font-medium text-2xl text-slate-800 lg:text-amber-400">
                  Pos Cantina
                </h1>
              </div>
              <div className="flex items-center justify-center">
                <div className="h-0.5 w-12 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full" />
              </div>
              <p className="text-center text-sm text-gray-500 lg:text-gray-300 mt-2">
                Management System
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-4 px-4">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={onClose}
                className={`flex items-center px-4 py-3.5 mb-1.5 rounded-xl text-sm font-medium transition-all duration-200
                  ${
                    isActive
                      ? "bg-gray-50 text-amber-600 lg:text-amber-400 border border-amber-500/20"
                      : "text-gray-500 lg:text-gray-300 hover:bg-amber-50/50 lg:hover:bg-white/10 hover:text-amber-600 lg:hover:text-amber-300"
                  }`}
              >
                <Icon
                  className={`h-5 w-5 mr-3 ${
                    isActive
                      ? "text-amber-500 lg:text-amber-300"
                      : "text-gray-500"
                  }`}
                />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="border-t border-gray-200 lg:border-white/20 pt-4">
            <div className="flex items-center justify-center gap-1 text-sm text-gray-500 lg:text-gray-300">
              <span>©</span>
              <span>2024</span>
              <img
                src="/logo.png"
                alt="Pos Cantina Logo"
                className="h-4 w-auto"
              />
              <span>Pos Cantina</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
