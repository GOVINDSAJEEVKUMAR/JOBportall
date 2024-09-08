import React, { useState, useContext } from 'react';
import axios from 'axios';
import Navbar from '../CommonPage/Nav';
import { useParams, useNavigate } from 'react-router-dom';
import { userAuth } from '../../Conetxt/userAuth';
import toast from 'react-hot-toast';

const JobApplicationForm = () => {
  const [resume, setResume] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false); // Manage submit button state
  const { _id } = useParams();  // Get job ID from URL parameters
  const { user } = userAuth();  // Get authenticated user from context
  const navigate = useNavigate();  // Hook to navigate programmatically

  const jobseekerId = user && user._id;  // Extract jobseeker ID from authenticated user

  // Handle file input change
  const handleFileChange = (e) => {
    setResume(e.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!resume) {
      setMessage('Please upload your resume.');
      return;
    }

    setLoading(true);  // Set loading to true when starting the submission process
    const formData = new FormData();
    formData.append('jobId', _id);  // Append job ID
    formData.append('jobseekerId', jobseekerId);  // Append jobseeker ID
    formData.append('resume', resume);  // Append resume file
    console.log(formData);
    

    try {
      const response = await axios.post(`http://localhost:8070/apply/apply/${_id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setMessage(response.data.message);  // Display success message from server
      setResume(null);  // Reset file input after successful submission
      e.target.reset();  // Visually reset the form
      console.log(response.data);
      toast.success(response.data.message);

      // Navigate to the chatbot page
      navigate(`/job`);
    } catch (error) {
      setMessage(error.response?.data?.message || 'An error occurred while applying.');  // Display error message
      console.error('Error:', error);  // Log error for debugging purposes
      toast.error(error.response?.data?.message || 'An error occurred while applying.');
    } finally {
      setLoading(false);  // Set loading to false when submission process ends
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Apply for this Job</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Upload Resume</label>
            <input 
              type="file"
              onChange={handleFileChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <button
            type="submit"
            className={`w-full py-2 px-4 font-semibold rounded-lg ${loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
            disabled={loading}  // Disable button while loading
          >
            {loading ? 'Applying...' : 'Apply'}
          </button>
        </form>
        {message && <p className={`mt-4 ${message.includes('error') ? 'text-red-600' : 'text-green-600'}`}>{message}</p>}
      </div>
    </>
  );
};

export default JobApplicationForm;