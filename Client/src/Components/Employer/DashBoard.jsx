import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { userAuth } from "../../Conetxt/userAuth"; // Ensure correct import
import Sidebar from "./Sidebar";
import { FaEdit, FaTrashAlt } from "react-icons/fa"; // Importing icons
import EditJobModal from "./EditJob"; // Import Edit Modal

const MyPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  
  const { setToken, setUser, token } = userAuth(); // Pulling from Auth context
  const navigate = useNavigate();
  const { user } = userAuth(); // Getting the logged-in user from context
  const { _Id } = useParams();  // Getting the _Id from URL params if provided

  // Use the logged-in user's ID, or fallback to the _Id from params
  const postedBy = user ? user._id : _Id;

  // Redirect if not logged in
  useEffect(() => {
    if (!token) {
      navigate("/login"); // Redirect to login if no token is found
    }
  }, [token, navigate]);

  // Define the fetchPosts function
  const fetchPosts = async () => {
    setLoading(true); // Set loading state
    try {
      const response = await axios.get(`http://localhost:8070/apply/mypost/${postedBy}`);
      setPosts(response.data); // Set the fetched posts in state
    } catch (error) {
      setError("Error fetching posts");
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  // Fetch posts on component mount
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
      const response = await axios.delete(`http://localhost:8070/job/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      toast.success("Job deleted successfully");
      setPosts(posts.filter((job) => job._id !== id)); // Remove deleted job from state
    } catch (error) {
      console.error("Failed to delete job:", error);
      toast.error("Failed to delete job");
    }
  };

  const handleEdit = (job) => {
    setSelectedJob(job); // Set selected job
    setEditModalOpen(true); // Open the modal
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
    setSelectedJob(null);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-white flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <div className="w-full flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Applications Statistics</h1>
          <button
            onClick={() => navigate("/post")}
            className="bg-blue-600 text-white py-2 px-4 rounded"
          >
            Job Post
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full mb-6">
          {/* Application statistics */}
        </div>

        <div className="mt-8 w-full">
          <h2 className="text-xl font-bold mb-4">Job Applications</h2>
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-3 px-4">Title</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Location</th>
                <th className="py-3 px-4">Salary</th>
                <th className="py-3 px-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((job) => (
                <tr key={job._id} className="border-t">
                  <td className="py-3 px-4">{job.title}</td>
                  <td className="py-3 px-4">{job.category}</td>
                  <td className="py-3 px-4">{job.type}</td>
                  <td className="py-3 px-4">{job.location}</td>
                  <td className="py-3 px-4">{job.salary}</td>
                  <td className="py-3 px-4 flex space-x-2">
                    <button
                      onClick={() => handleEdit(job)}
                      className="bg-green-500 text-white py-2 px-4 rounded flex items-center"
                    >
                      <FaEdit className="mr-2" /> Edit
                    </button>
                    <button
                      onClick={() => handleWithdraw(job._id)}
                      className="bg-red-500 text-white py-2 px-4 rounded flex items-center"
                    >
                      <FaTrashAlt className="mr-2" /> Withdraw
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Job Modal */}
      <EditJobModal
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        job={selectedJob}
        token={token}
        fetchPosts={fetchPosts} // Pass fetchPosts to the modal
      />
    </div>
  );
};

export default MyPosts;
