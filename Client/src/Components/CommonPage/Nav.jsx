import React, { useEffect, useState } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { userAuth } from '../../Conetxt/userAuth'; // Adjust the path as necessary
import { FaBell, FaUserCircle, FaSignOutAlt, FaFileAlt, FaBriefcase } from 'react-icons/fa'; // Import icons

const Navbar = () => {
  const { setToken, setUser, token, user } = userAuth(); // Pulling from Auth context
  const navigate = useNavigate();
  const { _id } = useParams();

  // State to control dropdown visibility
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false); // State for notification dropdown

  // Redirect if not logged in (checking for absence of token to log out)
  useEffect(() => {
    if (!token) {
      navigate('/login'); // Redirect to login page if no token
    }
  }, [token, navigate]);

  const handleLogout = async () => {
    try {
      // Send logout request to the server if needed
      await axios.post(
        'http://localhost:8070/auth/logout',
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`, // Corrected token handling
          },
        }
      );

      // Clear the token and user information
      setToken(null);
      setUser(null);

      // Navigate to the login page
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
      // Optionally provide user feedback
    }
  };

  // Toggle profile dropdown on profile picture click
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Toggle notification dropdown on notification icon click
  const toggleNotificationDropdown = () => {
    setNotificationOpen(!notificationOpen);
  };

  return (
    <nav className="bg-gray-900 text-white p-4">
      <div className="flex justify-between items-center">
        {/* Left section (Logo) */}
        <div className="text-xl font-bold tracking-wider">JOB PORTAL</div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button className="focus:outline-none" onClick={toggleDropdown}>
            <FaUserCircle className="text-2xl" />
          </button>
        </div>

        {/* Right section (Links, Notifications, and Profile) */}
        <div className="hidden md:flex items-center space-x-8">
          {/* Notification Icon */}
          <div className="relative">
            <button onClick={toggleNotificationDropdown} className="focus:outline-none">
              <FaBell className="text-2xl" />
            </button>
            {notificationOpen && (
              <Link to={`/applied/${user._id}`} className="absolute right-0 mt-2 w-64 bg-white text-black rounded-2xl shadow-lg z-20">
              <div className="absolute right-0 mt-2 w-64 bg-white text-black rounded-2xl shadow-lg z-20">
                <div className="p-4 text-center font-semibold border-b">Notifications</div>
                <div className="p-4">
                  <p className="text-sm text-gray-700">You have 2 new job applications!</p>
                  <p className="text-sm text-gray-700">Interview scheduled for 5th October.</p>
                  <p className="text-sm text-gray-700">Job posting approved successfully.</p>
                </div>
              </div>
              </Link>
            )}
          </div>

          {/* Profile Picture and Dropdown */}
          <div className="relative">
            <button onClick={toggleDropdown} className="focus:outline-none">
              {user?.profilePhoto ? (
                <img
                  className="rounded-full w-10 h-10 object-cover"
                  src={`http://localhost:8070/uploads/${user.profilePhoto}`}
                  alt="Profile"
                />
              ) : (
                <FaUserCircle className="text-2xl" />
              )}
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white text-black rounded-2xl shadow-lg z-20">
                <Link
                  to={`/profile/${user._id}`}
                  className="block px-4 py-2 hover:bg-gray-300 flex items-center"
                  onClick={() => setDropdownOpen(false)}
                >
                  <FaUserCircle className="mr-2" /> Profile
                </Link>
                <Link
                  to={`/applied/${user._id}`}
                  className="block px-4 py-2 hover:bg-gray-300 flex items-center"
                  onClick={() => setDropdownOpen(false)}
                >
                  <FaFileAlt className="mr-2" /> Applied Jobs
                </Link>
                <Link
                  to="/job"
                  className="block px-4 py-2 hover:bg-gray-300 flex items-center"
                  onClick={() => setDropdownOpen(false)}
                >
                  <FaBriefcase className="mr-2" /> Back
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-300 hover:text-red-500 flex items-center"
                >
                  <FaSignOutAlt className="mr-2" /> Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile dropdown (visible only on small screens) */}
      {dropdownOpen && (
        <div className="md:hidden mt-4 space-y-2">
          <Link
            to={`/profile/${user._id}`}
            className="block px-4 py-2 hover:bg-gray-300 flex items-center"
            onClick={() => setDropdownOpen(false)}
          >
            <FaUserCircle className="mr-2" /> Profile
          </Link>
          <Link
            to={`/applied/${user._id}`}
            className="block px-4 py-2 hover:bg-gray-300 flex items-center"
            onClick={() => setDropdownOpen(false)}
          >
            <FaFileAlt className="mr-2" /> Applied Jobs
          </Link>
          <Link
            to="/job"
            className="block px-4 py-2 hover:bg-gray-300 flex items-center"
            onClick={() => setDropdownOpen(false)}
          >
            <FaBriefcase className="mr-2" /> Back
          </Link>
          <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2 hover:bg-gray-300 hover:text-red-500 flex items-center"
          >
            <FaSignOutAlt className="mr-2" /> Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
