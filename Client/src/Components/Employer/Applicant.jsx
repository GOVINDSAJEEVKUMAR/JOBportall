import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEye } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { userAuth } from "../../Conetxt/userAuth";
import Sidebar from "./Sidebar";

const ApplicantsList = () => {
  const [applicants, setApplicants] = useState([]);
  const [jobDetails, setJobDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusUpdating, setStatusUpdating] = useState(null); // State to track which applicant is being updated
  const { token } = userAuth(); // Pulling token from Auth context
  const navigate = useNavigate();
  const { user } = userAuth(); // Getting the logged-in user from context
  const { _Id } = useParams();  // Getting the _Id from URL params if provided

  const postedBy = user ? user._id : _Id;

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  useEffect(() => {
    const fetchApplicantsAndJobDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8070/apply/application/${postedBy}`);
        if (response.data) {
          const { applications, job } = response.data;
          setApplicants(applications);
          setJobDetails(job);
        }
        setLoading(false);
      } catch (err) {
        setError("Failed to load applicants data or job details");
        setLoading(false);
      }
    };

    fetchApplicantsAndJobDetails();
  }, [postedBy]);

  const handleStatusUpdate = async (applicantId, newStatus) => {
    setStatusUpdating(applicantId);
    try {
      // Use the correct applicantId for the PUT request
      await axios.put(`http://localhost:8070/apply/update/${applicantId}`, { status: newStatus }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Update the status in the local state
      setApplicants((prevApplicants) =>
        prevApplicants.map((applicant) =>
          applicant._id === applicantId
            ? { ...applicant, status: newStatus }
            : applicant
        )
      );
      setStatusUpdating(null);
    } catch (error) {
      setError("Failed to update status");
      setStatusUpdating(null);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6 bg-gray-50">
        <div className="min-h-screen bg-gray-50">
          <div className="bg-white shadow-md rounded-lg p-4 mb-6 flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800">Applicants</h2>
            <div>
              <button className="bg-blue-600 text-white py-1 px-4 rounded">
                Total(s): {applicants.length}
              </button>
              <span className="ml-4 text-gray-600">Approved: 228</span>
              <span className="ml-4 text-gray-600">Rejected(s): 48</span>
            </div>
          </div>
          <div className="bg-white shadow-md rounded-lg p-4 mb-6 flex justify-between items-center font-bold">
            <p>JOB</p>
            <p>NAME</p>
            <p>RESUME</p>
            <p>STATUS</p>
          </div>

          {jobDetails && (
            <div className="bg-white shadow-md rounded-lg p-4 mb-6">
              <h3 className="text-xl font-semibold text-gray-700">Job Title: {jobDetails.title}</h3>
              <p className="text-gray-600">Job Description: {jobDetails.description}</p>
              <p className="text-gray-600">Location: {jobDetails.location}</p>
              <p className="text-gray-600">Salary: {jobDetails.salary}</p>
            </div>
          )}

          <div>
            {applicants.length > 0 ? (
              applicants.map((applicant) => (
                <Applicant
                  key={applicant._id}
                  id={applicant._id}
                  name={applicant.jobseeker.name}
                  status={applicant.status}
                  role={applicant.jobseeker.role}
                  appliedDate={applicant.appliedDate}
                  jobTitle={applicant.job.title}
                  resumeUrl={applicant.resume}
                  onStatusUpdate={handleStatusUpdate}
                  statusUpdating={statusUpdating}
                />
              ))
            ) : (
              <p>No applicants found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Applicant Component
const Applicant = ({ id, name, status, role, appliedDate, jobTitle, resumeUrl, onStatusUpdate, statusUpdating }) => {
  return (
    <div className="flex justify-between bg-white shadow-md rounded-lg p-4 mb-4 font-serif">
      <p className="text-gray-600 font-bold">{jobTitle}</p>
      <h3 className="font-bold text-gray-700">{name}</h3>
      
      <div className="flex gap-x-2 items-center">
        {resumeUrl && (
          <a
            href={`http://localhost:8070/${resumeUrl}`} // Corrected resumeUrl
            target="view resume"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            <FaEye size={36} />
          </a>
        )}
      </div>
      
      <div className="flex gap-x-2">
        <button
          onClick={() => onStatusUpdate(id, 'Pending')}
          disabled={statusUpdating === id}
          className={`py-1 px-3 rounded ${statusUpdating === id ? 'bg-gray-400' : 'bg-gray-600 text-white'}`}
        >
          Pending
        </button>
        <button
          onClick={() => onStatusUpdate(id, 'Accepted')}
          disabled={statusUpdating === id}
          className={`py-1 px-3 rounded ${statusUpdating === id ? 'bg-gray-400' : 'bg-green-600 text-white'}`}
        >
          Accept
        </button>
        <button
          onClick={() => onStatusUpdate(id, 'Rejected')}
          disabled={statusUpdating === id}
          className={`py-1 px-3 rounded ${statusUpdating === id ? 'bg-gray-400' : 'bg-yellow-600 text-white'}`}
        >
          Reject
        </button>
      </div>
    </div>
  );
};

export default ApplicantsList;
