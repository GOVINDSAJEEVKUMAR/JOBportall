import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const Mainpop = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [email, setEmail] = useState('');
  const [salary, setSalary] = useState('');
  const [isOpen, setIsOpen] = useState(true); // Modal control state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // API request using Axios
      const response = await axios.post('http://localhost:8070/job/create', {
        title,
        description,
        type,
        category,
        location,
        email,
        salary,
      });

      if (response.status === 201) {
        // Show success toast notification
        toast.success('Job posted successfully!');

        // Close modal and redirect to dashboard after submission
        setIsOpen(false);

        // Small delay before navigating to ensure toast is visible
        setTimeout(() => {
          navigate('/dashboard');
        }, 1000);
      } else {
        throw new Error('Unexpected response status');
      }
    } catch (error) {
      // Log the error to debug if needed
      console.error('Error posting job:', error);

      // Show error toast notification
      toast.error('Error posting job');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      {isOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
            {/* Close Button */}
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => setIsOpen(false)} // Closing the modal
            >
              &times;
            </button>

            <h2 className="text-2xl font-semibold mb-4">Post a Job</h2>

            <form onSubmit={handleSubmit}>
              {/* Title Field */}
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                  placeholder="Enter job title"
                  required
                />
              </div>

              {/* Description Field */}
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                  rows="4"
                  placeholder="Enter job description"
                  required
                ></textarea>
              </div>

              {/* Job Type Field */}
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Job Type</label>
                <input
                  type="text"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                  placeholder="Enter job type (e.g., Full-time, Part-time)"
                  required
                />
              </div>

              {/* Category Field */}
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Category</label>
                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                  placeholder="Enter job category (e.g., IT, Marketing)"
                  required
                />
              </div>

              {/* Location Field */}
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Location</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                  placeholder="Enter job location"
                  required
                />
              </div>

              {/* Employee Email Field */}
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Employee Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                  placeholder="Enter employee email"
                  required
                />
              </div>

              {/* Salary Field */}
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Salary</label>
                <input
                  type="text"
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                  placeholder="Enter salary amount"
                  required
                />
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
                  onClick={() => {
                    setIsOpen(false); // Close the modal
                    navigate('/dashboard'); // Navigate to the dashboard
                  }}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Mainpop;
