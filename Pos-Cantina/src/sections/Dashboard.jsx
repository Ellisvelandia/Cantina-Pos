import { FaMoneyBillWave, FaBoxes, FaUsers, FaChartBar } from "react-icons/fa";
import { BsGraphUp } from "react-icons/bs";
import { MdTrendingUp, MdCalendarToday } from "react-icons/md";

const Dashboard = () => {
  const stats = [
    {
      title: "Total Sales",
      value: "$12,345",
      change: "+12.5%",
      icon: FaMoneyBillWave,
      color: "text-green-600 bg-green-50",
    },
    {
      title: "Products",
      value: "150",
      change: "+3 new",
      icon: FaBoxes,
      color: "text-blue-600 bg-blue-50",
    },
    {
      title: "Clients",
      value: "64",
      change: "+8 this week",
      icon: FaUsers,
      color: "text-purple-600 bg-purple-50",
    },
    {
      title: "Revenue",
      value: "+25%",
      change: "vs last month",
      icon: BsGraphUp,
      color: "text-yellow-600 bg-yellow-50",
    },
  ];

  const recentSales = [
    { id: 1, product: "Beer Brand A", amount: "$35.00", time: "2 hours ago" },
    { id: 2, product: "Snack Pack B", amount: "$24.99", time: "3 hours ago" },
    { id: 3, product: "Beer Brand C", amount: "$18.50", time: "5 hours ago" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
            Dashboard
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Welcome back, here's what's happening today
          </p>
        </div>
        <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
          <option value="today">Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
        </select>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.title}
              className="bg-white rounded-lg shadow-sm p-4 sm:p-6 border border-gray-200 hover:border-blue-200 transition-colors"
            >
              <div className="flex items-center">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-600 truncate">
                    {stat.title}
                  </p>
                  <div className="flex items-baseline">
                    <p className="text-xl sm:text-2xl font-semibold text-gray-900">
                      {stat.value}
                    </p>
                    <p className="ml-2 text-xs text-green-600 font-medium">
                      {stat.change}
                    </p>
                  </div>
                </div>
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Chart */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
            <div>
              <h2 className="text-lg font-medium text-gray-900">
                Sales Overview
              </h2>
              <p className="text-sm text-gray-500">Daily sales performance</p>
            </div>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
                <MdTrendingUp className="h-4 w-4 inline mr-1" />
                Trends
              </button>
              <button className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
                <FaChartBar className="h-4 w-4 inline mr-1" />
                Reports
              </button>
            </div>
          </div>
          <div className="h-[200px] sm:h-[300px] bg-gray-50 rounded-lg flex items-center justify-center text-gray-400">
            Chart Placeholder
          </div>
        </div>

        {/* Recent Sales */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-gray-900">Recent Sales</h2>
            <MdCalendarToday className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {recentSales.map((sale) => (
              <div
                key={sale.id}
                className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {sale.product}
                  </p>
                  <p className="text-xs text-gray-500">{sale.time}</p>
                </div>
                <span className="text-sm font-medium text-gray-900">
                  {sale.amount}
                </span>
              </div>
            ))}
            <button className="w-full mt-2 text-sm text-blue-600 hover:text-blue-700 font-medium">
              View All Sales
            </button>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {["New Sale", "Add Product", "Add Client", "View Reports"].map(
          (action) => (
            <button
              key={action}
              className="p-4 text-center bg-white rounded-lg border border-gray-200 hover:border-blue-200 transition-colors"
            >
              <span className="text-sm font-medium text-gray-900">
                {action}
              </span>
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default Dashboard;
