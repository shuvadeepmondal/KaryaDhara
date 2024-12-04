import React from "react";
import logo from "../assets/todologo.png";

const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 w-full backdrop-blur-md bg-opacity-70 text-white shadow-xl z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <img src={logo} alt="Logo" className="w-10 h-10" />
            <p className="text-2xl font-bold tracking-wide">Karya<span className="text-purple-500">Dhara</span></p>
          </div>

          <div>
            <button
              className="bg-blue-500 text-white  px-4 py-2 rounded-2xl hover:bg-blue-600 transition duration-200"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
