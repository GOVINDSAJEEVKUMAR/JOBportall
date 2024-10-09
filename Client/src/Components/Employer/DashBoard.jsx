import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { userAuth } from "../../Conetxt/userAuth";
import Sidebar from "./Sidebar";
import { FaEdit, FaTrashAlt, FaBriefcase, FaMapMarkerAlt, FaMoneyBillWave } from "react-icons/fa";
import EditJobModal from "./EditJob";

const MyPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [statistics, setStatistics] = useState({ posted: 0, shortlisted: 0, applications: 0 }); // New state for statistics

  const { setToken, setUser, token } = userAuth();
  const navigate = useNavigate();
  const { user } = userAuth();
  const { _Id } = useParams();

  const postedBy = user ? user._id : _Id;

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:8070/apply/mypost/${postedBy}`);
      setPosts(response.data);
      
      // Calculate statistics based on fetched posts
      setStatistics({
        posted: response.data.length,
        shortlisted: response.data.filter(job => job.shortlisted).length, // Adjust this condition based on your data
        applications: response.data.filter(job => job.applied).length, // Adjust this condition based on your data
      });
    } catch (error) {
      setError("Error fetching posts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (postedBy) {
      fetchPosts();
    } else {
      setError("Invalid user ID");
      setLoading(false);
    }
  }, [postedBy]);

  const handleWithdraw = async (id) => {
    if (!id) {
      console.error("Job ID is undefined or invalid.");
      return;
    }

    try {
      await axios.delete(`http://localhost:8070/job/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Job deleted successfully");
      setPosts(posts.filter((job) => job._id !== id));
    } catch (error) {
      console.error("Failed to delete job:", error);
      toast.error("Failed to delete job");
    }
  };

  const handleEdit = (job) => {
    setSelectedJob(job);
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
    setSelectedJob(null);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6 bg-gray-50">
        <div className="w-full flex flex-col md:flex-row justify-between items-center mb-6">
          <h1 className="text-2xl font-bold mb-4 md:mb-0">Applications Statistics</h1>
          <button
            onClick={() => navigate("/post")}
            className="bg-blue-600 text-white py-2 px-4 rounded w-full md:w-auto"
          >
            Job Post
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full mb-6 items-center">
          <div className="bg-blue-100 shadow-md p-6 rounded-lg transition duration-300 hover:shadow-xl">
            <h2 className="font-bold text-lg text-blue-800">Jobs Posted</h2>
            <p className="text-2xl font-semibold text-blue-900">{statistics.posted}</p>
          </div>
          <div className="bg-green-100 shadow-md p-6 rounded-lg transition duration-300 hover:shadow-xl">
            <h2 className="font-bold text-lg text-green-800">Shortlisted</h2>
            <p className="text-2xl font-semibold text-green-900">{statistics.shortlisted}</p>
          </div>
          <div className="bg-yellow-100 shadow-md p-6 rounded-lg transition duration-300 hover:shadow-xl">
            <h2 className="font-bold text-lg text-yellow-800">Applications</h2>
            <p className="text-2xl font-semibold text-yellow-900">{statistics.applications}</p>
          </div>
        </div>

        <div className="mt-8 w-full">
          <h2 className="text-xl font-bold mb-4">Job Applications</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-3 px-4 text-left">Title</th>
                  <th className="py-3 px-4 text-left">Category</th>
                  <th className="py-3 px-4 text-left">Type</th>
                  <th className="py-3 px-4 text-left">Location</th>
                  <th className="py-3 px-4 text-left">Salary</th>
                  <th className="py-3 px-4 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((job) => (
                  <tr key={job._id} className="border-t hover:bg-gray-50 transition duration-200">
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <FaBriefcase className="mr-2 text-blue-600" />
                        <span>{job.title}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">{job.category}</td>
                    <td className="py-3 px-4">{job.type}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <FaMapMarkerAlt className="mr-2 text-red-600" />
                        <span>{job.location}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <FaMoneyBillWave className="mr-2 text-green-600" />
                        <span>{job.salary}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleEdit(job)}
                          className="bg-green-500 text-white py-2 px-2 md:px-4 rounded flex items-center text-sm"
                        >
                          <FaEdit className="mr-2" /> Edit
                        </button>
                        <button
                          onClick={() => handleWithdraw(job._id)}
                          className="bg-red-500 text-white py-2 px-2 md:px-4 rounded flex items-center text-sm"
                        >
                          <FaTrashAlt className="mr-2" /> Withdraw
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <EditJobModal
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        job={selectedJob}
        token={token}
        fetchPosts={fetchPosts}
      />
    </div>
  );
};

export default MyPosts;
