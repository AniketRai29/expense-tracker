import { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";

const Sidebar = () => {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* 🔹 MOBILE TOP BAR BUTTON */}
      <div className="md:hidden flex items-center p-4 bg-white shadow">
        <button onClick={() => setOpen(!open)}>
          <FiMenu size={24} />
        </button>
        <h2 className="ml-4 font-bold">Expense Tracker</h2>
      </div>

      {/* 🔹 SIDEBAR */}
      <div
        className={`
          fixed md:static top-0 left-0 h-screen w-64 bg-white shadow-md p-5 z-50
          transition-all duration-300
          ${open ? "left-0" : "-left-full md:left-0"}
        `}
      >
        {/* 🔹 USER PROFILE */}
        <div className="mb-8 text-center">
          <img
            src={
              user?.profileImage
                ? `http://localhost:5000${user.profileImage}`
                : `https://ui-avatars.com/api/?name=${user?.fullName || "User"}`
            }
            alt="profile"
            className="w-16 h-16 rounded-full mx-auto"
          />

          <h3 className="font-bold mt-2">
            {user?.fullName || "Guest User"}
          </h3>

          <p className="text-sm text-gray-500">
            {user?.email || "No email"}
          </p>
        </div>

        {/* 🔹 NAVIGATION */}
        <div className="flex flex-col gap-4">
          <Link to="/" className="hover:text-blue-500" onClick={() => setOpen(false)}>
            Dashboard
          </Link>

          <Link to="/income" className="hover:text-blue-500" onClick={() => setOpen(false)}>
            Income
          </Link>

          <Link to="/expense" className="hover:text-blue-500" onClick={() => setOpen(false)}>
            Expense
          </Link>
        </div>

        {/* 🔹 LOGOUT */}
        <button
          onClick={logout}
          className="bg-red-500 text-white p-2 rounded mt-6 w-full"
        >
          Logout
        </button>
      </div>
    </>
  );
};

export default Sidebar;