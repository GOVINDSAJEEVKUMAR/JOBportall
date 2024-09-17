import React, { useEffect } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { userAuth } from '../../Conetxt/userAuth'; // Adjust the path as necessary

const Navbar = () => {
  const { setToken, setUser, token,user } = userAuth(); // Pulling from Auth context
  const navigate = useNavigate();
  const { _id } = useParams();

  // Redirect if already logged in (checking for absence of token to log out)
  useEffect(() => {
    if (!token) {
      navigate('/login'); // Redirect to login page if no token
    }
  }, [token, navigate]);

  const handleLogout = async () => {
    try {
      // Send logout request to the server if needed
      await axios.post('http://localhost:8070/auth/logout', {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

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

  // const imageUrl = `http://localhost:8070/uploads/${user.profilePhoto}`;
  return (
    <nav className="bg-gray-900 text-white  flex justify-between items-center">
      {/* Left section (Logo) */}
      <div className="flex items-center">
        <div className="text-xl font-bold tracking-wider">
          JOB PORTAL
        </div>
      </div>

      {/* Right section (Links) */}
      <div className="flex items-center space-x-8">
        <Link to="/job">back</Link>
        <button onClick={() => navigate(`/profile/${user._id}`)}>
        <img
  className="rounded-full w-10 h-10 object-cover"
  src={`http://localhost:8070/uploads/${user.profilePhoto}`} 
  alt="Profile"
/>

        </button>
        <button
          onClick={handleLogout}
          className="hover:text-red-500 text-xl bg-black p-2 m-3 rounded-full transition-colors duration-200"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
