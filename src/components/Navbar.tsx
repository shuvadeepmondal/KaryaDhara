import { useNavigate } from "react-router-dom";
import { Bell } from "lucide-react";
import logo from "../assets/todologo.png";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  
  // You'll need to implement your authentication logic here
  const isLoggedIn = false; // Replace with your actual auth state (e.g., from context, Redux, etc.)

  const handleAuthClick = () => {
    if (isLoggedIn) {
      // Logout logic - clear tokens, redirect, etc.
      // For example: localStorage.removeItem('token');
      console.log("Logging out...");
      // navigate("/"); // Redirect to home or login page
    } else {
      navigate("/login");
    }
  };

  const handleNotificationClick = () => {
    navigate("/notifications"); // Navigate to notifications page
  };

  return (
    <nav className="fixed top-0 left-0 w-full backdrop-blur-md bg-opacity-70 text-white shadow-xl z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <img src={logo} alt="Logo" className="w-10 h-10" />
            <p className="text-2xl font-bold tracking-wide">Karya<span className="text-purple-500">Dhara</span></p>
          </div>

          <div className="flex items-center space-x-4">
            {/* Notification Icon */}
            <button
              onClick={handleNotificationClick}
              className="relative p-2 rounded-full hover:bg-white hover:bg-opacity-10 transition duration-200"
              aria-label="Notifications"
            >
              <Bell size={24} className="text-white hover:text-purple-300" />
              {/* Optional: Add notification badge */}
              {/* <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">3</span> */}
            </button>

            {/* Auth Button - Login/Logout */}
            <button
              className="bg-purple-500 text-white px-4 py-1.5 font-2xl font-semibold rounded-3xl hover:bg-purple-600 transition duration-200"
              onClick={handleAuthClick}
            >
              {isLoggedIn ? "Logout" : "Login"}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;