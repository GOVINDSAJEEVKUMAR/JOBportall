import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEye } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { userAuth } from "../../Conetxt/userAuth"; // Corrected path
import Sidebar from "./Sidebar";
import { toast } from "react-hot-toast";

const ApplicantsList = () => {
  const [applicants, setApplicants] = useState([]);
  const [jobDetails, setJobDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusUpdating, setStatusUpdating] = useState(null);
  const { token } = userAuth(); // Get token from Auth context
  const navigate = useNavigate();
  const { user } = userAuth(); // Get the logged-in user from context
  const { _id } = useParams(); // Get _id from URL params

  const postedBy = user ? user._id : _id;

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  useEffect(() => {
    const fetchApplicantsAndJobDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8070/apply/application/${postedBy}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data) {
          const { applications, job } = response.data;
          setApplicants(applications);
          // console.log(response.data);
          
          setJobDetails(job);
          toast.success("Applicants loaded successfully");
        }
      } catch (err) {
        setError("Failed to load applicants data or job details");
        console.error(err); // Log the error for debugging
      } finally {
        setLoading(false);
      }
    };

    fetchApplicantsAndJobDetails();
  }, [postedBy, token]);

  const handleStatusUpdate = async (applicant) => {
    if (!applicant || !applicant.jobseeker || !applicant.jobseeker.id) {
      console.error("Applicant or jobseeker ID is not defined.");
      toast.error("Error: Invalid applicant data.");
      return;
    }

    const jobseekerId = applicant.jobseeker.id;
    const newStatus = applicant.status === "Accepted" ? "Rejected" : "Accepted";

    setStatusUpdating(applicant._id);
    
    try {
      const response = await axios.put(
        `http://localhost:8070/apply/update/${jobseekerId}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setApplicants((prevApplicants) =>
          prevApplicants.map((app) =>
            app._id === applicant._id ? { ...app, status: newStatus } : app
          )
        );
        console.log("Status updated:", response.data);
        
        toast.success(`Status updated to "${newStatus}" successfully!`);
      } else {
        toast.error("Failed to update status.");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status.");
    } finally {
      setStatusUpdating(null);
    }
  };

  const approvedCount = applicants.filter(applicant => applicant.status === 'Accepted').length;
  const rejectedCount = applicants.filter(applicant => applicant.status === 'Rejected').length;

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

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
              <span className="ml-4 text-gray-600">Approved: {approvedCount}</span>
              <span className="ml-4 text-gray-600">Rejected: {rejectedCount}</span>
            </div>
          </div>

          {jobDetails && (
            <div className="bg-white shadow-md rounded-lg p-4 mb-6">
              <h3 className="text-xl font-semibold text-gray-700">Job Title: {jobDetails.title}</h3>
              <p className="text-gray-600">Job Description: {jobDetails.description}</p>
              <p className="text-gray-600">Location: {jobDetails.location}</p>
              <p className="text-gray-600">Salary: {jobDetails.salary}</p>
            </div>
          )}

          <div className="bg-white shadow-md rounded-lg p-4 mb-6 flex justify-between items-center font-bold">
            <p>JOB</p>
            <p>NAME</p>
            <p>RESUME</p>
            <p>STATUS</p>
          </div>

          <div>
            {applicants.length > 0 ? (
              applicants.map((applicant) => (
                <Applicant
                  key={applicant._id}
                  applicant={applicant} // Pass whole applicant object
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

const Applicant = React.memo(({ applicant, onStatusUpdate, statusUpdating }) => {
  const { _id, jobseeker, status, job } = applicant;

  return (
    <div className="flex justify-between items-center bg-white shadow-md rounded-lg p-4 mb-4 font-serif">
      <p className="text-gray-600 font-bold">{job.title}</p>
      <h3 className="font-bold text-gray-700">{jobseeker.name}</h3>

      <div className="flex gap-4 items-center">
        <a
          href={`http://localhost:8070/${applicant.resume}`}
          target="_blank"
          className="text-blue-500 hover:text-blue-700"
          rel="noreferrer"
        >
          <FaEye className="inline-block mr-2" />
          View Resume
        </a>

        <p className={`font-semibold ${status === "Accepted" ? "text-green-500" : "text-red-500"}`}>
          {status}
        </p>

        <div className="flex gap-2">
          <button
            className={`${statusUpdating === _id ? "opacity-50 cursor-not-allowed" : ""} px-4 py-2 bg-blue-500 text-white rounded-md`}
            onClick={() => onStatusUpdate(applicant)} // Pass the applicant directly
            disabled={statusUpdating === _id || status === "Accepted"}
          >
            Approve
          </button>
          <button
            className={`${statusUpdating === _id ? "opacity-50 cursor-not-allowed" : ""} px-4 py-2 bg-red-500 text-white rounded-md`}
            onClick={() => onStatusUpdate(applicant)} // Pass the applicant directly
            disabled={statusUpdating === _id || status === "Rejected"}
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  );
});

export default ApplicantsList;

