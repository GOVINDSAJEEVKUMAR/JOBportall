import React, { useState, useEffect } from 'react';
import axios from 'axios';
 // Adjust the import path as necessary
import { useNavigate, useParams } from 'react-router-dom';
import { userAuth } from '../../Conetxt/userAuth';
import { FiEdit2, FiMapPin, FiPhone, FiMail, FiCalendar, FiCheckCircle } from 'react-icons/fi'; // Icons
import Sidebar from './Sidebar';

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
        console.log('Fetching data for userId:',user._id); // Log userId
        const response = await axios.get(`http://localhost:8070/auth/user/${user._id}`);
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

  return (
    <div className="min-h-screen bg-white flex">
      <Sidebar/>
      <div className="flex-1 p-6">
      <div className="container mx-auto px-4 py-8 bg-gray-100">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              {/* Profile Image with 100% badge */}
              <div className="relative">
                <img
                  src={`http://localhost:8070/uploads/${userData.profilePhoto}`} // Use the full URL
                  alt="Profile Photo"
                  className="w-32 h-32 rounded-full object-cover shadow-md"
                />
                
              </div>
              <div className="ml-6">
                <h1 className="text-4xl font-bold mb-1">{userData.name}</h1>
                <p className="text-gray-600">Profile last updated - Today</p>
              </div>
            </div>
            {/* <FiEdit2 className="text-gray-500 hover:text-gray-700 cursor-pointer" size={20} /> */}
          </div>

          {/* Information Section */}
          <div className="mt-8">
            <div className="flex items-center gap-6">
              {/* <div className="flex items-center text-gray-600">
                <FiMapPin className="mr-2 text-blue-900" size={20} />
                <p>{userData.location}</p>
              </div> */}
              <div className="flex items-center text-gray-600">
                <FiCalendar className="mr-2 text-blue-900" size={20} />
                <p>1 Year </p>
              </div>
              <div className="flex items-center text-gray-600">
                <FiCheckCircle className="mr-2 text-blue-900" size={20} />
                <p>₹ 40000</p>
              </div>
            </div>

            <div className="flex items-center gap-6 mt-4">
              <div className="flex items-center text-gray-600">
                <FiPhone className="mr-2 text-blue-900" size={20} />
                <p>{userData.phone}</p>
              </div>
              <div className="flex items-center text-gray-600">
                <FiMail className="mr-2 text-blue-900" size={20} />
                <p>{userData.email}</p>
              </div>
              <div className="flex items-center text-gray-600">
                <FiCheckCircle className="mr-2 text-blue-900" size={20} />
                <p>Available to join in Serving Notice Period</p>
              </div>
            </div>
          </div>
          </div>

          {/* Additional Information Sections */}
          <div className="flex flex-col gap-8 mt-8 space-y-10">
            <div className="flex gap-6">
              <div className="w-1/2 bg-white shadow-md rounded-lg p-6 relative">
                {/* Black highlight on the left */}
                <div className="absolute left-0 top-0 bottom-0 w-2 bg-black rounded-l-lg"></div>
                <div className="pl-6">
                  <h2 className="text-2xl font-semibold mb-2">About</h2>
                  <p>I am {userData.name}, a highly motivated and dedicated {userData.designation} with a strong passion for numbers and problem-solving. I hold a {userData.education} from  where I developed a solid foundation in statistical analysis and data visualization. My skills include {userData.skills} which enable me to extract insights from complex data sets. In my free time, I enjoy {userData.hobbies} about the latest advancements in artificial intelligence and machine learning.</p>
                </div>
              </div>

              <div className="w-1/2 bg-white shadow-md rounded-lg p-6 relative">
                {/* Black highlight on the left */}
                <div className="absolute left-0 top-0 bottom-0 w-2 bg-black rounded-l-lg"></div>
                <div className="pl-6 space-y-5">
                  <h2 className="text-2xl font-semibold mb-2">Education</h2>
                  <p className='text-gray-600 font-medium gap-5'> 🧑‍🎓Education :{userData.education}</p>
                  <p className='text-gray-600 font-medium gap-5'> 📚Branch :{userData.stream}</p>
                </div>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="w-1/2 bg-white shadow-md rounded-lg p-6 relative">
                {/* Black highlight on the left */}
                <div className="absolute left-0 top-0 bottom-0 w-2 bg-black rounded-l-lg"></div>
                <div className="pl-6">
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
              </div>

              <div className="w-1/2 bg-white shadow-md rounded-lg p-6 relative">
                {/* Black highlight on the left */}
                <div className="absolute left-0 top-0 bottom-0 w-2 bg-black rounded-l-lg"></div>
                <div className="pl-6">
                  <h2 className="text-2xl font-semibold mb-2">Work History</h2>
                  <p className='text-gray-600 font-medium gap-5'> 👷Work History :{userData.designation}</p>
                </div>
              </div>
            </div>
          </div>
        
      </div>
      </div>
    </div>
  );
};

export default UserDetailsPage;
