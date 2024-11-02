import { useState } from "react";
import {
  MdAdd,
  MdEdit,
  MdDelete,
  MdSearch,
  MdFilterList,
} from "react-icons/md";
import { FaFilter, FaSort } from "react-icons/fa";

const Products = () => {
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'table'

  const products = [
    {
      id: 1,
      name: "Beer Brand A",
      category: "Beers",
      price: 5.99,
      stock: 150,
      status: "In Stock",
      image: "beer-a.jpg",
    },
    {
      id: 2,
      name: "Beer Brand B",
      category: "Beers",
      price: 4.99,
      stock: 200,
      status: "In Stock",
      image: "beer-b.jpg",
    },
    {
      id: 3,
      name: "Snack A",
      category: "Snacks",
      price: 2.99,
      stock: 100,
      status: "Low Stock",
      image: "snack-a.jpg",
    },
    // Add more sample products
  ];

  const ProductCard = ({ product }) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:border-blue-200 transition-colors">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
            <MdFilterList className="h-6 w-6 text-gray-400" />
          </div>
          <div>
            <h3 className="font-medium text-gray-900">{product.name}</h3>
            <p className="text-sm text-gray-500">{product.category}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button className="p-1 text-blue-600 hover:text-blue-900">
            <MdEdit className="h-5 w-5" />
          </button>
          <button className="p-1 text-red-600 hover:text-red-900">
            <MdDelete className="h-5 w-5" />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-gray-500">Price</p>
          <p className="font-medium text-gray-900">${product.price}</p>
        </div>
        <div>
          <p className="text-gray-500">Stock</p>
          <p className="font-medium text-gray-900">{product.stock} units</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
            Products
          </h1>
          <p className="text-sm text-gray-500 mt-1">Manage your inventory</p>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button className="flex-1 sm:flex-none flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <MdAdd className="h-5 w-5 mr-2" />
            Add Product
          </button>
          <button
            className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 lg:hidden"
            onClick={() => setViewMode(viewMode === "grid" ? "table" : "grid")}
          >
            <FaSort className="h-5 w-5 text-gray-500" />
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="relative">
            <MdSearch className="h-5 w-5 absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            <option value="">All Categories</option>
            <option value="beers">Beers</option>
            <option value="snacks">Snacks</option>
          </select>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            <option value="">Stock Status</option>
            <option value="in-stock">In Stock</option>
            <option value="low-stock">Low Stock</option>
            <option value="out-stock">Out of Stock</option>
          </select>
          <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <FaFilter className="h-4 w-4 mr-2" />
            More Filters
          </button>
        </div>
      </div>

      {/* Products List */}
      <div className="space-y-4">
        {/* Mobile/Tablet View */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:hidden gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Desktop Table View */}
        <div className="hidden lg:block bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stock
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                          <MdFilterList className="h-5 w-5 text-gray-400" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {product.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            #{product.id}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {product.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${product.price}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {product.stock}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          product.stock > 100
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {product.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <button className="text-blue-600 hover:text-blue-900">
                          <MdEdit className="h-5 w-5" />
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          <MdDelete className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between bg-white px-4 py-3 border border-gray-200 rounded-lg sm:px-6">
        <div className="flex-1 flex justify-between sm:hidden">
          <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
            Previous
          </button>
          <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
            Next
          </button>
        </div>
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">1</span> to{" "}
              <span className="font-medium">10</span> of{" "}
              <span className="font-medium">20</span> results
            </p>
          </div>
          <div>
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
              {/* Add pagination buttons here */}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
