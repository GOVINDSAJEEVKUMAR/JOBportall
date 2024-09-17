import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { userAuth } from "../../Conetxt/userAuth"; // Ensure correct import
import Sidebar from "./Sidebar";

const MyPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
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

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`http://localhost:8070/apply/mypost/${postedBy}`);
        setPosts(response.data);
      } catch (error) {
        setError("Error fetching posts");
      } finally {
        setLoading(false);
      }
    };

    if (postedBy) {
      fetchPosts();
    } else {
      setError("Invalid user ID");
      setLoading(false);
    }
  }, [postedBy]);

  const handleWithdraw = (jobId) => {
    
    console.log("Withdrawing job:", jobId);

    const handleEdit =(jobId)=>{
      navigate(``);
    }
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
          <div className="bg-blue-100 p-4 text-center rounded">
            <p className="text-2xl font-bold">1</p>
            <p>Posted Jobs</p>
          </div>
          <div className="bg-red-100 p-4 text-center rounded">
            <p className="text-2xl font-bold">609</p>
            <p>Applications</p>
          </div>
          <div className="bg-yellow-100 p-4 text-center rounded">
            <p className="text-2xl font-bold">0</p>
            <p>Reviews</p>
          </div>
          <div className="bg-green-100 p-4 text-center rounded">
            <p className="text-2xl font-bold">2</p>
            <p>Shortlisted</p>
          </div>
        </div>

        <div className="mt-8 w-full">
          <h2 className="text-xl font-bold mb-4">Job Applications</h2>
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-100 justify-between ">
                <th className="py-3 px-4 text-left font-semibold">Job Title</th>
                <th className="py-3 px-4 text-left font-semibold">Category</th>
                <th className="py-3 px-4 text-left font-semibold">Type</th>
                <th className="py-3 px-4 text-left font-semibold">Location</th>
                <th className="py-3 px-4 text-left font-semibold">Salary</th>
                <th className="py-3 px-4  font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.length > 0 ? (
                posts.map((job, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-3 px-4">{job.title}</td>
                    <td className="py-3 px-4">{job.category}</td>
                    <td className="py-3 px-4">{job.type}</td>
                    <td className="py-3 px-4">{job.location}</td>
                    <td className="py-3 px-4">{job.salary}</td>
                    <td className="py-3 px-4 font-semibold text-right">
                      <a
                        href={`/job/${job.id}`}
                        className="text-blue-600 mr-4"
                      >
                        View Details
                      </a>
                    <a href="" className="text-blue-600 mr-4" onClick={() => handleEdit(job.id)}>Edit</a>
                      <a
                        href="#"
                        className="text-red-600"
                        onClick={() => handleWithdraw(job.id)}
                      >
                        Withdraw
                      </a>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="py-3 px-4" colSpan="5">
                    No job applications found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyPosts;
