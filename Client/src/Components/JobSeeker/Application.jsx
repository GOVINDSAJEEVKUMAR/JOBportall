// import React, { useState, useContext } from 'react';
// import axios from 'axios';
// import Navbar from '../CommonPage/Nav';
// import { useParams, useNavigate } from 'react-router-dom';
// import { userAuth } from '../../Conetxt/userAuth';
// import toast from 'react-hot-toast';

// const JobApplicationForm = () => {
//   const [resume, setResume] = useState(null);
//   const [message, setMessage] = useState('');
//   const [loading, setLoading] = useState(false); // Manage submit button state
//   const { _id } = useParams();  // Get job ID from URL parameters
//   const { user } = userAuth();  // Get authenticated user from context
//   const navigate = useNavigate();  // Hook to navigate programmatically

//   const jobseekerId = user && user._id;  // Extract jobseeker ID from authenticated user

//   // Handle file input change
//   const handleFileChange = (e) => {
//     setResume(e.target.files[0]);
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!resume) {
//       setMessage('Please upload your resume.');
//       return;
//     }

//     setLoading(true);  // Set loading to true when starting the submission process
//     const formData = new FormData();
//     formData.append('jobId', _id);  // Append job ID
//     formData.append('jobseekerId', jobseekerId);  // Append jobseeker ID
//     formData.append('resume', resume);  // Append resume file
//     console.log(formData);
    

//     try {
//       const response = await axios.post(`http://localhost:8070/apply/apply/${_id}`, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       setMessage(response.data.message);  // Display success message from server
//       setResume(null);  // Reset file input after successful submission
//       e.target.reset();  // Visually reset the form
//       console.log(response.data);
//       toast.success(response.data.message);

//       // Navigate to the chatbot page
//       navigate(`/job`);
//     } catch (error) {
//       setMessage(error.response?.data?.message || 'An error occurred while applying.');  // Display error message
//       console.error('Error:', error);  // Log error for debugging purposes
//       toast.error(error.response?.data?.message || 'An error occurred while applying.');
//     } finally {
//       setLoading(false);  // Set loading to false when submission process ends
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
//         <h2 className="text-2xl font-bold mb-4">Apply for this Job</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700">Upload Resume</label>
//             <input 
//               type="file"
//               onChange={handleFileChange}
//               className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
//               required
//             />
//           </div>
//           <button
//             type="submit"
//             className={`w-full py-2 px-4 font-semibold rounded-lg ${loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
//             disabled={loading}  // Disable button while loading
//           >
//             {loading ? 'Applying...' : 'Apply'}
//           </button>
//         </form>
//         {message && <p className={`mt-4 ${message.includes('error') ? 'text-red-600' : 'text-green-600'}`}>{message}</p>}
//       </div>
//     </>
//   );
// };

// export default JobApplicationForm;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../CommonPage/Nav';
import { useParams, useNavigate } from 'react-router-dom';
import { userAuth } from '../../Conetxt/userAuth';
import toast from 'react-hot-toast';

const JobApplicationForm = () => {
  const [resume, setResume] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [jobData, setJobData] = useState(null); // State to hold job data
  const { _id } = useParams();
  const { user } = userAuth();
  const navigate = useNavigate();

  const jobseekerId = user && user._id;

  // Fetch job details based on the job ID
  const fetchJobDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:8070/job/get/${_id}`);
      setJobData(response.data); // Set the fetched job data
    } catch (error) {
      toast.error('Error fetching job details.');
    }
  };

  useEffect(() => {
    fetchJobDetails(); // Fetch the job details when the component mounts
  }, [_id]);

  const handleFileChange = (e) => {
    setResume(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!resume) {
      setMessage('Please upload your resume.');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('jobId', _id);
    formData.append('jobseekerId', jobseekerId);
    formData.append('resume', resume);

    try {
      const response = await axios.post(`http://localhost:8070/apply/apply/${_id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setMessage(response.data.message);
      setResume(null);
      e.target.reset();
      toast.success(response.data.message);
      navigate('/job'); // Fixed missing quotes around /job
    } catch (error) {
      setMessage(error.response?.data?.message || 'An error occurred while applying.');
      toast.error(error.response?.data?.message || 'An error occurred while applying.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-3xl mx-auto mt-12 p-8">
        {!jobData ? (
          <p>Loading job details...</p>
        ) : (
          <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200">
            <h2 className="text-3xl font-bold mb-4 text-blue-600">{jobData.title}</h2>
            <h3 className='text-2xl font-bold mb-4 text-blue-300'><span className='font-semibold text-gray-400'>Company:</span>{jobData.company}</h3>
            <p className="text-gray-700 text-lg mb-6">
            We are seeking a {jobData.title} with {jobData.description} of experience to join our team based in {jobData.location}. In this role, you will leverage your expertise to contribute to various projects and collaborate with a dynamic team. The ideal candidate will have hands-on experience in their field and a proven track record of success. This position offers the opportunity to grow professionally while making a significant impact. If you're passionate about a {jobData.title} and meet the requirements, we'd love to hear from you.
              </p>
            <div className=" flex gap-[8rem] text-lx text-gray-500 mb-8">
              <p><span className="font-semibold">Location:</span> {jobData.location}</p>
              <p><span className="font-semibold">Type:</span> {jobData.type}</p>
              <p><span className="font-semibold">Salary:</span> {jobData.salary}</p>
            </div>

            <hr className="border-gray-300 mb-8" />

            <h2 className="text-2xl font-bold mb-4 text-blue-600">Apply for this Job</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Upload Resume</label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <button
                type="submit"
                className={`w-full py-3 px-4 font-semibold rounded-lg ${loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'} text-white transition duration-300`}
                disabled={loading}
              >
                {loading ? 'Applying...' : 'Submit Application'}
              </button>
            </form>
            {message && (
              <p className={`mt-4 ${message.includes('error') ? 'text-red-600' : 'text-green-600'}`}>
                {message}
              </p>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default JobApplicationForm;
