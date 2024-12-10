
import { useNavigate } from "react-router-dom";
import logo from "../assets/todologo.png";

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login"); // Change "/login" to your desired route
  
  };
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
              className="bg-purple-500 text-white  px-4 py-1.5 font-2xl font-semibold rounded-3xl hover:bg-purple-600 transition duration-200"
              onClick={handleLoginClick}
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
