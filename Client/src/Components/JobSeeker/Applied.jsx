import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { userAuth } from '../../Conetxt/userAuth'; // Ensure the path is correct
import { useParams } from 'react-router-dom';
import Navbar from '../CommonPage/Nav'; // Import the Navbar component
import { FaCheckCircle, FaTimesCircle, FaFileAlt, FaBriefcase, FaUser, FaEnvelope, FaPhone } from 'react-icons/fa'; // Import icons

const AppliedJobs = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { _id } = useParams();

  const { user } = userAuth();

  useEffect(() => {
    const fetchApplications = async () => {
      if (!user) {
        setError('User not authenticated.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`http://localhost:8070/apply/myapplication/${user._id}`);
        setApplications(response.data);
      } catch (err) {
        setError('Error fetching applications.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [user]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  const getStatusDetails = (status) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return { color: 'text-yellow-600', icon: <FaFileAlt className="inline text-yellow-600" /> };
      case 'accepted':
        return { color: 'text-green-600', icon: <FaCheckCircle className="inline text-green-600" /> };
      case 'rejected':
        return { color: 'text-red-600', icon: <FaTimesCircle className="inline text-red-600" /> };
      default:
        return { color: 'text-gray-600', icon: <FaFileAlt className="inline text-gray-600" /> };
    }
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="bg-white shadow-xl rounded-lg p-4 mb-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800 text-center w-full">Applied Jobs</h2>
        </div>

        {applications.length === 0 ? (
          <p className="text-center">No applications found.</p>
        ) : (
          <div className="space-y-4">
            {/* Card Layout for Small Devices */}
            {applications.map((application) => {
              const { color, icon } = getStatusDetails(application.status);
              return (
                <div
                  key={application._id}
                  className="md:hidden bg-white shadow-xl rounded-lg p-4 mb-4 space-y-2"
                >
                  <div className="flex items-center">
                    <FaBriefcase className="text-gray-600 mr-2" />
                    <p className="font-bold text-gray-800">{application.job.title}</p>
                  </div>
                  <div className="flex items-center">
                    <FaUser className="text-gray-600 mr-2" />
                    <p>{application.jobseeker.name}</p>
                  </div>
                  <div className="flex items-center">
                    <FaEnvelope className="text-gray-600 mr-2" />
                    <p>{application.jobseeker.email}</p>
                  </div>
                  <div className="flex items-center">
                    <FaPhone className="text-gray-600 mr-2" />
                    <p>{application.jobseeker.phone}</p>
                  </div>
                  <div className="flex items-center">
                    {icon}
                    <p className={`ml-2 ${color}`}>{application.status}</p>
                  </div>
                  <div className="flex items-center">
                    <FaFileAlt className="text-gray-600 mr-2" />
                    <a
                      href={`http://localhost:8070/${application.resume}`}
                      className="text-blue-600 underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Download Resume
                    </a>
                  </div>
                </div>
              );
            })}

            {/* Table Layout for Medium and Larger Screens */}
            <div className="hidden md:block bg-white shadow-2xl rounded-lg p-4 mb-6">
              <div className="flex justify-between items-center font-bold border-b pb-2 text-center">
                <p className="w-1/5"><FaBriefcase className="inline" /> JOB TITLE</p>
                <p className="w-1/5"><FaUser className="inline" /> NAME</p>
                <p className="w-1/5"><FaEnvelope className="inline" /> EMAIL</p>
                <p className="w-1/5"><FaPhone className="inline" /> PHONE</p>
                <p className="w-1/5"><FaFileAlt className="inline" /> STATUS</p>
                <p className="w-1/5"><FaFileAlt className="inline" /> RESUME</p>
              </div>

              {applications.map((application) => {
                const { color, icon } = getStatusDetails(application.status);
                return (
                  <div
                    key={application._id}
                    className="flex justify-between items-center p-4 mb-4 border-b text-center"
                  >
                    <div className="w-1/5">
                      <p>{application.job.title}</p>
                    </div>
                    <div className="w-1/5">
                      <p>{application.jobseeker.name}</p>
                    </div>
                    <div className="w-1/5">
                      <p>{application.jobseeker.email}</p>
                    </div>
                    <div className="w-1/5">
                      <p>{application.jobseeker.phone}</p>
                    </div>
                    <div className={`w-1/5 ${color}`}>
                      <p>{icon} {application.status}</p>
                    </div>
                    <div className="w-1/5">
                      <a
                        href={`http://localhost:8070/${application.resume}`}
                        className="text-blue-600 underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Download
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppliedJobs;
