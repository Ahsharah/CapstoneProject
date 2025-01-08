import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";

export const Sidebar = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { path: "/", label: "Home" },

  ];

  const authItems = user
    ? [
      { path: "/recipes", label: "Recipes" },
      { path: "/random", label: "Random Recipe" },
      { path: "/saved", label: "Saved Recipes" },
      { action: logout, label: "Logout" },

    ]
    : [
      { path: "/login", label: "Login" },
      { path: "/register", label: "Register" }
    ];

  return (
    <>
      {/* Mobile toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 p-2 bg-gray-800 rounded-md lg:hidden"
      >
        {isOpen ? (
          <HiX className="w-6 h-6 text-white" />
        ) : (
          <HiMenu className="w-6 h-6 text-white" />
        )}
      </button>

      {/* Sidebar */}
      <nav
        className={`${isOpen ? "translate-x-0" : "-translate-x-full"
          } fixed top-0 left-0 h-full w-64 bg-gray-800 text-white transform transition-transform duration-200 ease-in-out lg:translate-x-0 z-40`}
      >
        <div className="p-6 space-y-4">
          <h1 className="text-2xl font-bold mb-8">Recipe App</h1>

          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className="block py-2 hover:bg-gray-700 rounded-md px-3 transition-colors"
            >
              {item.label}
            </Link>
          ))}

          <div className="border-t border-gray-600 my-4"></div>

          {authItems.map((item, index) => (
            item.action ? (
              <button
                key={index}
                onClick={() => {
                  item.action();
                  setIsOpen(false);
                }}
                className="w-full text-left py-2 hover:bg-gray-700 rounded-md px-3 transition-colors"
              >
                {item.label}
              </button>
            ) : (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className="block py-2 hover:bg-gray-700 rounded-md px-3 transition-colors"
              >
                {item.label}
              </Link>
            )
          ))}
        </div>
      </nav>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};