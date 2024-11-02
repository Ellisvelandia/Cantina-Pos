import { useState } from "react";
import {
  MdAdd,
  MdShoppingCart,
  MdReceipt,
  MdDelete,
  MdSearch,
  MdPerson,
  MdFilterList,
} from "react-icons/md";
import { FaUser } from "react-icons/fa";

const Sales = () => {
  const [showCart, setShowCart] = useState(false); // For mobile cart toggle

  const categories = ["All", "Beers", "Snacks", "Drinks", "Others"];
  const products = [
    {
      id: 1,
      name: "Beer Brand A",
      price: 5.99,
      category: "Beers",
      image: "beer-a.jpg",
    },
    {
      id: 2,
      name: "Beer Brand B",
      price: 4.99,
      category: "Beers",
      image: "beer-b.jpg",
    },
    {
      id: 3,
      name: "Snack A",
      price: 2.99,
      category: "Snacks",
      image: "snack-a.jpg",
    },
    // Add more products
  ];

  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Beer Brand A", price: 5.99, quantity: 2 },
    { id: 2, name: "Snack A", price: 2.99, quantity: 1 },
  ]);

  const addToCart = (product) => {
    const existingItem = cartItems.find((item) => item.id === product.id);
    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const updateQuantity = (id, change) => {
    setCartItems(
      cartItems
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(0, item.quantity + change) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  return (
    <div className="relative h-[calc(100vh-8rem)]">
      {/* Mobile Cart Toggle Button */}
      <button
        className="fixed bottom-4 right-4 z-20 lg:hidden bg-blue-600 text-white p-4 rounded-full shadow-lg"
        onClick={() => setShowCart(!showCart)}
      >
        <MdShoppingCart className="h-6 w-6" />
        {cartItems.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center">
            {cartItems.length}
          </span>
        )}
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
        {/* Products Selection */}
        <div
          className={`lg:col-span-2 space-y-4 ${
            showCart ? "hidden lg:block" : "block"
          }`}
        >
          {/* Search and Customer Selection */}
          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="relative">
                <MdSearch className="h-5 w-5 absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <MdPerson className="h-5 w-5 mr-2 text-gray-500" />
                <span className="text-gray-700">Select Customer</span>
              </button>
            </div>
          </div>

          {/* Categories Scroll */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
              {categories.map((category) => (
                <button
                  key={category}
                  className="px-4 py-2 whitespace-nowrap rounded-full border border-gray-200 hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Products Grid */}
          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {products.map((product) => (
                <button
                  key={product.id}
                  className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                  onClick={() => addToCart(product)}
                >
                  <div className="text-center">
                    <div className="w-full h-24 bg-gray-100 rounded-lg mb-2 flex items-center justify-center">
                      <MdFilterList className="h-8 w-8 text-gray-400" />
                    </div>
                    <p className="font-medium text-gray-900 truncate">
                      {product.name}
                    </p>
                    <p className="text-sm text-gray-500">${product.price}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Cart */}
        <div
          className={`bg-white rounded-lg shadow-sm border border-gray-200 h-fit lg:h-full overflow-y-auto ${
            showCart ? "block" : "hidden lg:block"
          }`}
        >
          <div className="sticky top-0 bg-white p-4 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <MdShoppingCart className="h-5 w-5 text-gray-500" />
                <h2 className="text-lg font-medium">Current Sale</h2>
              </div>
              <button
                className="lg:hidden p-2 text-gray-500 hover:text-gray-700"
                onClick={() => setShowCart(false)}
              >
                ✕
              </button>
            </div>
          </div>

          <div className="p-4 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-lg"
              >
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{item.name}</p>
                  <div className="flex items-center mt-1">
                    <button
                      className="text-gray-500 hover:text-gray-700 p-1"
                      onClick={() => updateQuantity(item.id, -1)}
                    >
                      -
                    </button>
                    <span className="mx-2 text-sm">{item.quantity}</span>
                    <button
                      className="text-gray-500 hover:text-gray-700 p-1"
                      onClick={() => updateQuantity(item.id, 1)}
                    >
                      +
                    </button>
                    <span className="ml-2 text-sm text-gray-500">
                      ${item.price} x {item.quantity}
                    </span>
                  </div>
                </div>
                <button
                  className="p-2 text-red-600 hover:text-red-900"
                  onClick={() => updateQuantity(item.id, -item.quantity)}
                >
                  <MdDelete className="h-5 w-5" />
                </button>
              </div>
            ))}

            {cartItems.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                Cart is empty
              </div>
            )}
          </div>

          <div className="sticky bottom-0 bg-white p-4 border-t border-gray-200">
            <div className="space-y-4">
              <div className="flex justify-between items-center font-medium text-lg">
                <span>Total</span>
                <span>${calculateTotal().toFixed(2)}</span>
              </div>

              <button
                className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                disabled={cartItems.length === 0}
              >
                Complete Sale
              </button>

              <button
                className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
                onClick={() => setCartItems([])}
                disabled={cartItems.length === 0}
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sales;
