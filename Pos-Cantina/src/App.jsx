import { useState } from "react";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import AppRoutes from "./routes";
import { MdMenu } from "react-icons/md";

const AppContent = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const isAuthPage = ["/login", "/signup"].includes(location.pathname);

  if (isAuthPage) {
    return <AppRoutes />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <button
        className="fixed z-50 bottom-4 right-4 lg:hidden bg-blue-600 text-white p-3 rounded-full shadow-lg"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <MdMenu className="h-6 w-6" />
      </button>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

      <div className="flex">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="flex-1 p-4 lg:p-8 w-full lg:ml-[280px] mt-16">
          <div className="max-w-7xl mx-auto">
            <AppRoutes />
          </div>
        </main>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
