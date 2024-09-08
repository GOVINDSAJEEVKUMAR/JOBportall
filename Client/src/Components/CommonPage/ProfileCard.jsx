import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../Components/CommonPage/Nav'; // Adjust the import path as necessary
import { useNavigate, useParams } from 'react-router-dom';
import { userAuth } from '../../Conetxt/userAuth';

const UserDetailsPage = () => {
  const { _id } = useParams(); // Get the user ID from the URL params
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token, user, setToken, setUser } = userAuth();
  const navigate = useNavigate();

  // Redirect if user is not authenticated (i.e., token does not exist)
  useEffect(() => {
    if (!token) {
      navigate('/login'); // Redirect to login page if no token is found
    }
  }, [token, navigate]);

  // Fetch user data by ID
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        console.log('Fetching data for userId:', _id); // Log userId
        const response = await axios.get(`http://localhost:8070/auth/user/${_id}`);
        console.log('User data:', response.data); // Log the fetched data
        setUserData(response.data);
      } catch (err) {
        setError(`Error fetching user data: ${err.message}`);
        console.error('Error fetching user data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [_id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  if (!userData) return <div>No user data found</div>;

  const imageUrl = `http://localhost:8070/uploads/${userData.profilePhoto}`; // Concatenate image URL properly

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-4">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h1 className="text-3xl font-bold mb-4">{userData.name}</h1>
          <div className="flex items-center space-x-4">
            <img
              src={imageUrl} // Use properly concatenated imageUrl
              alt="Profile"
              className="w-24 h-24 object-cover rounded-full border-2 border-gray-300"
            />
            <div>
              <p><strong>Email:</strong> {userData.email}</p>
              <p><strong>Phone:</strong> {userData.phone}</p>
              <p><strong>Location:</strong> {userData.location}</p>
            </div>
          </div>
          <div className="mt-4">
            <h2 className="text-2xl font-semibold mb-2">About</h2>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Suscipit, distinctio similique. Ullam facere, ipsa impedit accusantium autem animi ut iste vitae alias. Commodi, temporibus architecto. Commodi quis fuga pariatur expedita!</p>
          </div>
          <div className="mt-4">
            <h2 className="text-2xl font-semibold mb-2">Education</h2>
            {Array.isArray(userData.education) && userData.education.length > 0 ? (
              <ul>
                {userData.education.map((education, index) => (
                  <li key={index}>{education}</li>
                  
                ))}
              </ul>
            ) : (
              <p>No education data available.</p>
            )}
          </div>
          <div className="mt-4">
            <h2 className="text-2xl font-semibold mb-2">Skills</h2>
            {Array.isArray(userData.skills) && userData.skills.length > 0 ? (
              <ul>
                {userData.skills.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
            ) : (
              <p>No skills data available.</p>
            )}
          </div>
          <div className="mt-4">
            <h2 className="text-2xl font-semibold mb-2">Work History</h2>
            {Array.isArray(userData.workHistory) && userData.workHistory.length > 0 ? (
              <ul>
                {userData.workHistory.map((work, index) => (
                  <li key={index}>{designation}</li>
                ))}
              </ul>
            ) : (
              <p>No work history available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsPage;
