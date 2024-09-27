import React, { useEffect, useState } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { userAuth } from '../../Conetxt/userAuth'; // Adjust the path as necessary

const Navbar = () => {
  const { setToken, setUser, token, user } = userAuth(); // Pulling from Auth context
  const navigate = useNavigate();
  const { _id } = useParams();

  // State to control dropdown visibility
  const [dropdownOpen, setDropdownOpen] = useState(false);

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

  // Toggle dropdown on profile picture click
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className="bg-gray-900 text-white flex justify-between items-center p-4">
      {/* Left section (Logo) */}
      <div className="text-xl font-bold tracking-wider">JOB PORTAL</div>

      {/* Right section (Links and Profile) */}
      <div className="relative">
        <div className="flex items-center space-x-8">
          {/* Profile Picture and Dropdown */}
          <div className="relative">
            <button onClick={toggleDropdown} className="focus:outline-none">
              {user?.profilePhoto && (
                <img
                  className="rounded-full w-10 h-10 object-cover"
                  src={`http://localhost:8070/uploads/${user.profilePhoto}`}
                  alt="Profile"
                />
              )}
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 m-5 w-[20rem] bg-white text-black rounded-2xl shadow-lg z-20">
                <Link
                  to={`/profile/${user._id}`}
                  className="block px-4 py-2 hover:bg-gray-300"
                  onClick={() => setDropdownOpen(false)} // Close dropdown on link click
                >
                  Profile
                </Link>
                <Link
                  to={`/applied/${user._id}`}
                  className="block px-4 py-2 hover:bg-gray-300"
                  onClick={() => setDropdownOpen(false)}
                >
                  Applied Jobs
                </Link>
                <Link
                  to="/job"
                  className="block px-4 py-2 hover:bg-gray-300"
                  onClick={() => setDropdownOpen(false)}
                >
                  Back
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-300 hover:text-red-500"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;