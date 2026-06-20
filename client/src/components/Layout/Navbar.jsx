import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { LogOut } from "lucide-react";

const Navbar = () => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const logoutHandler = () => {
    localStorage.removeItem("todoapp");
    setUsername("");
    navigate("/login");
    toast.success("Logout successful");
  };

  const handleLogoClick = (e) => {
    if (window.location.pathname === "/") {
      e.preventDefault();
      window.location.reload();
    }
  };

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("todoapp"));
    if (userData && userData.user && userData.user.username) {
      setUsername(userData.user.username);
    } else {
      setUsername("");
    }
  }, [location]);

  return (
    <nav className="sticky top-0 bg-[#0a0a0a]/80 backdrop-blur-sm border-b border-[#1f1f1f] z-50 py-3">
      <div className="max-w-5xl mx-auto px-6 grid grid-cols-3 items-center">
        {/* Left: Logo */}
        <div className="flex justify-start">
          <Link to="/" onClick={handleLogoClick} className="focus:outline-none flex items-center">
            <img
              src="/images/logo_icon.png"
              alt="Logo"
              className="h-8 w-auto hover:scale-105 active:scale-95 transition-transform duration-200"
            />
          </Link>
        </div>

        {/* Center: Navlinks */}
        <div className="flex justify-center items-center gap-3 sm:gap-6">
          <Link
            className="text-zinc-400 hover:text-white text-xs sm:text-sm transition-colors font-medium"
            to="/dashboard"
          >
            Dashboard
          </Link>
          <Link
            className="text-zinc-400 hover:text-white text-xs sm:text-sm transition-colors font-medium"
            to="/todolist"
          >
            My To Do
          </Link>
        </div>

        {/* Right: User Authentication State */}
        <div className="flex justify-end items-center">
          {username && (
            <button
              className="text-violet-600 hover:text-violet-700 transition-colors flex items-center"
              title="logout"
              onClick={logoutHandler}
            >
              <LogOut className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
