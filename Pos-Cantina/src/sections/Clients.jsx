import { useState } from "react";
import {
  MdAdd,
  MdEdit,
  MdDelete,
  MdSearch,
  MdPerson,
  MdMoreVert,
  MdFilterList,
  MdSort,
} from "react-icons/md";
import {
  FaFilter,
  FaPhoneAlt,
  FaEnvelope,
  FaShoppingBag,
  FaUserCircle,
  FaStar,
  FaEllipsisV,
} from "react-icons/fa";

const Clients = () => {
  const [viewType, setViewType] = useState("grid");
  const [selectedFilter, setSelectedFilter] = useState("all");

  const clients = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      phone: "(555) 123-4567",
      totalPurchases: 1250.0,
      lastPurchase: "2024-02-15",
      status: "active",
      type: "VIP",
      visits: 25,
      favoriteProducts: ["Beer Brand A", "Snack B"],
    },
    // Add more sample clients here
  ];

  const filters = [
    { id: "all", label: "All Clients" },
    { id: "vip", label: "VIP" },
    { id: "regular", label: "Regular" },
    { id: "new", label: "New" },
    { id: "inactive", label: "Inactive" },
  ];

  const ClientCard = ({ client }) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 hover:border-blue-100 transition-colors">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <FaUserCircle className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
          </div>
          <div className="ml-3 sm:ml-4">
            <div className="flex items-center">
              <h3 className="text-base sm:text-lg font-medium text-gray-900 truncate max-w-[150px] sm:max-w-[200px]">
                {client.name}
              </h3>
              {client.type === "VIP" && (
                <FaStar className="h-4 w-4 text-yellow-400 ml-2 flex-shrink-0" />
              )}
            </div>
            <p className="text-xs sm:text-sm text-gray-500">
              Member since 2023
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-1 sm:space-x-2">
          <button className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-full">
            <MdEdit className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
          </button>
          <div className="relative group">
            <button className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-full">
              <MdMoreVert className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
            </button>
            {/* Dropdown menu */}
            <div className="hidden group-hover:block absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
              <div className="py-1">
                <button className="w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-50">
                  View Details
                </button>
                <button className="w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-50">
                  Edit Client
                </button>
                <button className="w-full px-4 py-2 text-sm text-left text-red-600 hover:bg-gray-50">
                  Delete Client
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4">
        <div className="space-y-2 sm:space-y-3">
          <div className="flex items-center text-xs sm:text-sm text-gray-600">
            <FaEnvelope className="h-3 w-3 sm:h-4 sm:w-4 mr-2 flex-shrink-0" />
            <span className="truncate">{client.email}</span>
          </div>
          <div className="flex items-center text-xs sm:text-sm text-gray-600">
            <FaPhoneAlt className="h-3 w-3 sm:h-4 sm:w-4 mr-2 flex-shrink-0" />
            {client.phone}
          </div>
        </div>
        <div className="space-y-2 sm:space-y-3">
          <div className="flex items-center text-xs sm:text-sm text-gray-600">
            <FaShoppingBag className="h-3 w-3 sm:h-4 sm:w-4 mr-2 flex-shrink-0" />
            {client.visits} visits
          </div>
          <div className="flex items-center text-xs sm:text-sm text-gray-600">
            <MdPerson className="h-3 w-3 sm:h-4 sm:w-4 mr-2 flex-shrink-0" />
            {client.type} Customer
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-4">
        <div className="mb-2">
          <span className="text-xs sm:text-sm font-medium text-gray-700">
            Purchase History
          </span>
        </div>
        <div className="flex justify-between items-center text-xs sm:text-sm">
          <span className="text-gray-600">Total Spent</span>
          <span className="font-medium text-green-600">
            ${client.totalPurchases.toLocaleString()}
          </span>
        </div>
        <div className="flex justify-between items-center text-xs sm:text-sm mt-1">
          <span className="text-gray-600">Last Purchase</span>
          <span className="font-medium">{client.lastPurchase}</span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <span className="text-xs sm:text-sm font-medium text-gray-700">
          Favorite Products
        </span>
        <div className="mt-2 flex flex-wrap gap-1.5 sm:gap-2">
          {client.favoriteProducts.map((product, index) => (
            <span
              key={index}
              className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full text-xs"
            >
              {product}
            </span>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
            Clients
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage your customer relationships
          </p>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button className="flex-1 sm:flex-none flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <MdAdd className="h-5 w-5 mr-2" />
            Add Client
          </button>
          <button
            className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 sm:hidden"
            onClick={() => setViewType(viewType === "grid" ? "list" : "grid")}
          >
            <MdSort className="h-5 w-5 text-gray-500" />
          </button>
        </div>
      </div>

      {/* Quick Filters */}
      <div className="flex overflow-x-auto pb-2 hide-scrollbar">
        <div className="flex space-x-2">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setSelectedFilter(filter.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                selectedFilter === filter.id
                  ? "bg-blue-100 text-blue-700"
                  : "bg-white text-gray-600 border border-gray-300 hover:bg-gray-50"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Search and Advanced Filters */}
      <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="sm:col-span-2">
            <div className="relative">
              <MdSearch className="h-5 w-5 absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search clients..."
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            <option value="">Sort By</option>
            <option value="name">Name</option>
            <option value="recent">Most Recent</option>
            <option value="purchases">Total Purchases</option>
          </select>
          <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <FaFilter className="h-4 w-4 mr-2" />
            Advanced Filters
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6">
        {[
          { label: "Total Clients", value: "256", change: "+12%" },
          { label: "Active Clients", value: "180", change: "+5%" },
          { label: "VIP Clients", value: "45", change: "+8%" },
          { label: "New This Month", value: "24", change: "+15%" },
        ].map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-sm p-4 sm:p-6 border border-gray-200"
          >
            <p className="text-xs sm:text-sm font-medium text-gray-600">
              {stat.label}
            </p>
            <div className="flex items-center mt-2">
              <p className="text-lg sm:text-2xl font-semibold text-gray-900">
                {stat.value}
              </p>
              <span className="ml-2 text-xs sm:text-sm font-medium text-green-600">
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Clients Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {clients.map((client) => (
          <ClientCard key={client.id} client={client} />
        ))}
      </div>
    </div>
  );
};

export default Clients;
