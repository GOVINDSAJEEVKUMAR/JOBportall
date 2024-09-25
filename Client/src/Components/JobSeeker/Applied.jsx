import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { userAuth } from '../../Conetxt/userAuth'; // Ensure the path is correct
import { useParams } from 'react-router-dom';
import Navbar from '../CommonPage/Nav'; // Import the Navbar component

const AppliedJobs = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { _id } = useParams();

  // Use userAuth context to get the user information
  const { user } = userAuth();

  useEffect(() => {
    const fetchApplications = async () => {
      if (!user) {
        setError('User not authenticated.'); // Handle case when user is not logged in
        setLoading(false);
        return; // Exit early if user is not authenticated
      }

      try {
        const response = await axios.get(`http://localhost:8070/apply/myapplication/${user._id}`); // Adjust endpoint if needed
        setApplications(response.data);
      } catch (err) {
        setError('Error fetching applications.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [user]); // Dependency array should include user to refetch if user changes

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  // Function to determine status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'text-brown-600'; // Adjust according to your color setup
      case 'accepted':
        return 'text-green-600';
      case 'rejected':
        return 'text-red-600';
      default:
        return 'text-gray-600'; // Default color
    }
  };

  return (
    <div>
      <Navbar /> {/* Include the Navbar */}
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="bg-white shadow-xl rounded-lg p-4 mb-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800 text-center w-full">Applied Jobs</h2>
        </div>

        {applications.length === 0 ? (
          <p className="text-center">No applications found.</p>
        ) : (
          <div className="bg-white shadow-2xl rounded-lg p-4 mb-6">
            <div className="flex justify-between items-center font-bold border-b pb-2 text-center">
              <p className="w-1/5">JOB TITLE</p>
              <p className="w-1/5">NAME</p>
              <p className="w-1/5">EMAIL</p>
              <p className="w-1/5">PHONE</p>
              <p className="w-1/5">STATUS</p>
              <p className="w-1/5">RESUME</p>
            </div>
            {applications.map((application) => (
              <div 
                key={application._id} 
                className="flex justify-between items-center p-4 mb-4 border-b text-center"
              >
                <p className="w-1/5">{application.job.title}</p>
                <p className="w-1/5">{application.jobseeker.name}</p>
                <p className="w-1/5">{application.jobseeker.email}</p>
                <p className="w-1/5">{application.jobseeker.phone}</p>
                <p className={`w-1/5 ${getStatusColor(application.status)}`}>
                  {application.status}
                </p>
                <p className="w-1/5">
                  <a 
                    href={`http://localhost:8070/${application.resume}`} 
                    className="text-blue-600 underline" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    Download
                  </a>
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AppliedJobs;
