import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userAuth } from "../../Conetxt/userAuth";
import { FaChartBar, FaInbox, FaUserAlt, FaSearch, FaFolder, FaSignOutAlt } from "react-icons/fa";
import { AiOutlineUser } from "react-icons/ai";
import axios from 'axios'; // Import axios for making HTTP requests.

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const { token, setToken, setUser } = userAuth();
  const navigate = useNavigate(); // Use useNavigate for navigation

  // Function to handle logout
  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:8070/auth/logout', {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setToken(null); // Clear token
      setUser(null);  // Clear user data
      navigate('/login'); // Redirect to login page
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  // Menu items definition
  const Menus = [
    { title: "Dashboard", icon: <FaChartBar />, path: "/dashboard" },
    { title: "Inbox", icon: <FaInbox />, path: "/inbox" },
    { title: "Accounts", icon: <FaUserAlt />, path: "/accounts", gap: true },
    { title: "Applicants", icon: <AiOutlineUser />, path: "/applicant" },
    { title: "Search", icon: <FaSearch />, path: "/search" },
    { title: "Analytics", icon: <FaChartBar />, path: "/analytics" },
    { title: "Files", icon: <FaFolder />, path: "/files", gap: true },
    {
      title: "Logout",
      icon: <FaSignOutAlt />,
      onClick: handleLogout  // Attach the logout handler
    }
  ];

  return (
    <div className="flex bg-blue-800">
      <div className={` ${open ? "w-72" : "w-20"} bg-dark-purple min-h-screen p-5 pt-8 relative duration-300`}>
        {/* Toggle button */}
        <img
          src={open ? "https://img.icons8.com/material-outlined/24/000000/circled-left.png" : "https://img.icons8.com/material-outlined/24/000000/circled-right.png"}
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple border-2 rounded-full ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
          alt="Toggle"
        />

        {/* Logo Section */}
        <div className="flex gap-x-4 items-center">
          <img
            src="https://i.pinimg.com/564x/0c/d0/74/0cd0740f68cacae354e0960f340e1448.jpg"
            className={`cursor-pointer duration-500 w-10 h-10 ${open && "rotate-[360deg]"}`}
            alt="Logo"
          />
          <h1 className={`text-white origin-left font-medium text-xl duration-200 ${!open && "scale-0"}`}>
            JOB
          </h1>
        </div>

        {/* Menu List */}
        <ul className="pt-6">
          {Menus.map((Menu, index) => (
            <li
              key={index}
              className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
              ${Menu.gap ? "mt-9" : "mt-2"} ${index === 0 && "bg-light-white"}`}
              onClick={Menu.onClick ? Menu.onClick : null} // Handle onClick if present
            >
              <span className="text-xl">{Menu.icon}</span>

              {/* Handle navigation with Link */}
              {Menu.path ? (
                <Link to={Menu.path}>
                  <span className={`${!open && "hidden"} origin-left duration-200`}>{Menu.title}</span>
                </Link>
              ) : (
                // For Logout or any other item without path
                <span className={`${!open && "hidden"} origin-left duration-200`}>{Menu.title}</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
