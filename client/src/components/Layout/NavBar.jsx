// Navbar.jsx
import React from "react";

const Navbar = ({ username, onLogout }) => {
  return (
    <nav className="flex flex-col sm:flex-row sm:justify-between items-center px-4 py-4 bg-white shadow gap-2 sm:gap-0">
      <h1 className="text-lg sm:text-xl font-bold text-gray-800 text-center sm:text-left">
        Expense Tracker
      </h1>
      <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-4">
        <span className="text-gray-700 font-medium text-sm sm:text-base">
          {username}
        </span>
        <button
          onClick={onLogout}
          className="text-sm text-red-600 hover:underline"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};


export default Navbar;