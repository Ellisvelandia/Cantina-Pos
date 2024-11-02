import { useState } from "react";
import {
  MdTrendingUp,
  MdInventory,
  MdPeople,
  MdCalendarToday,
  MdRefresh,
  MdMoreVert,
} from "react-icons/md";
import {
  FaDownload,
  FaChartLine,
  FaChartBar,
  FaChartPie,
  FaFileExcel,
  FaFilePdf,
  FaPrint,
} from "react-icons/fa";

const Reports = () => {
  const [dateRange, setDateRange] = useState("this-month");
  const [loading, setLoading] = useState(false);
  const [showExportMenu, setShowExportMenu] = useState(false);

  const reportTypes = [
    {
      title: "Sales Analytics",
      icon: MdTrendingUp,
      description: "Comprehensive sales data and trends",
      metrics: [
        { label: "Total Sales", value: "$45,678" },
        { label: "Growth", value: "+15%" },
      ],
      color: "text-blue-600 bg-blue-50",
    },
    {
      title: "Inventory Status",
      icon: MdInventory,
      description: "Stock levels and product movement",
      metrics: [
        { label: "Items Low", value: "12" },
        { label: "Total Items", value: "156" },
      ],
      color: "text-green-600 bg-green-50",
    },
    {
      title: "Customer Insights",
      icon: MdPeople,
      description: "Customer behavior and demographics",
      metrics: [
        { label: "Active Users", value: "234" },
        { label: "New Users", value: "+22" },
      ],
      color: "text-purple-600 bg-purple-50",
    },
  ];

  const recentActivity = [
    {
      type: "sale",
      description: "New sale recorded",
      value: "$125.00",
      time: "2h ago",
    },
    {
      type: "inventory",
      description: "Low stock alert",
      value: "Beer Brand A",
      time: "3h ago",
    },
    {
      type: "client",
      description: "New client registered",
      value: "John Doe",
      time: "5h ago",
    },
  ];

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
            Reports
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Analytics and business insights
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          <select
            className="flex-1 sm:flex-none px-3 py-2 text-sm border border-gray-300 rounded-lg"
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
          >
            <option value="today">Today</option>
            <option value="this-week">This Week</option>
            <option value="this-month">This Month</option>
            <option value="last-month">Last Month</option>
            <option value="this-year">This Year</option>
            <option value="custom">Custom Range</option>
          </select>

          <button
            className={`p-2 text-gray-600 hover:bg-gray-100 rounded-lg ${
              loading ? "animate-spin" : ""
            }`}
            onClick={handleRefresh}
          >
            <MdRefresh className="h-5 w-5" />
          </button>

          {/* Desktop Export Buttons */}
          <div className="hidden sm:flex border border-gray-300 rounded-lg">
            <button className="px-3 py-2 hover:bg-gray-50 border-r border-gray-300">
              <FaFileExcel className="h-5 w-5 text-green-600" />
            </button>
            <button className="px-3 py-2 hover:bg-gray-50 border-r border-gray-300">
              <FaFilePdf className="h-5 w-5 text-red-600" />
            </button>
            <button className="px-3 py-2 hover:bg-gray-50">
              <FaPrint className="h-5 w-5 text-gray-600" />
            </button>
          </div>

          {/* Mobile Export Menu */}
          <div className="relative sm:hidden">
            <button
              className="p-2 border border-gray-300 rounded-lg"
              onClick={() => setShowExportMenu(!showExportMenu)}
            >
              <MdMoreVert className="h-5 w-5 text-gray-600" />
            </button>

            {showExportMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center">
                  <FaFileExcel className="h-4 w-4 text-green-600 mr-2" />
                  Export to Excel
                </button>
                <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center">
                  <FaFilePdf className="h-4 w-4 text-red-600 mr-2" />
                  Export to PDF
                </button>
                <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center">
                  <FaPrint className="h-4 w-4 text-gray-600 mr-2" />
                  Print Report
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Report Types Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {reportTypes.map((report) => {
          const Icon = report.icon;
          return (
            <div
              key={report.title}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 hover:border-blue-500 transition-colors"
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg ${report.color} flex items-center justify-center`}
                >
                  <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  <FaDownload className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>
              </div>
              <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">
                {report.title}
              </h3>
              <p className="text-sm text-gray-500 mb-4">{report.description}</p>
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                {report.metrics.map((metric, index) => (
                  <div key={index}>
                    <p className="text-xs sm:text-sm text-gray-500">
                      {metric.label}
                    </p>
                    <p className="text-base sm:text-lg font-semibold text-gray-900">
                      {metric.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Sales Trend */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <h3 className="text-base sm:text-lg font-medium text-gray-900">
                Sales Trend
              </h3>
              <p className="text-xs sm:text-sm text-gray-500">
                Monthly revenue statistics
              </p>
            </div>
            <select className="w-full sm:w-auto px-3 py-1 border border-gray-300 rounded-lg text-sm">
              <option value="6months">Last 6 months</option>
              <option value="12months">Last 12 months</option>
            </select>
          </div>
          <div className="h-48 sm:h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <span className="text-sm text-gray-500">Sales Chart</span>
          </div>
        </div>

        {/* Product Performance */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <h3 className="text-base sm:text-lg font-medium text-gray-900">
                Top Products
              </h3>
              <p className="text-xs sm:text-sm text-gray-500">
                Best selling items
              </p>
            </div>
            <select className="w-full sm:w-auto px-3 py-1 border border-gray-300 rounded-lg text-sm">
              <option value="quantity">By Quantity</option>
              <option value="revenue">By Revenue</option>
            </select>
          </div>
          <div className="h-48 sm:h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <span className="text-sm text-gray-500">Products Chart</span>
          </div>
        </div>

        {/* Recent Activity Feed */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-base sm:text-lg font-medium text-gray-900">
                Recent Activity
              </h3>
              <p className="text-xs sm:text-sm text-gray-500">
                Latest updates and alerts
              </p>
            </div>
            <button className="text-blue-600 text-sm hover:text-blue-700">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {activity.description}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-500">
                      {activity.value}
                    </p>
                  </div>
                </div>
                <span className="text-xs sm:text-sm text-gray-400">
                  {activity.time}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
