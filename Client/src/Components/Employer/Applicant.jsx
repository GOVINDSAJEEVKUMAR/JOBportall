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

  const handleStatusUpdate = async (applicant, newStatus) => {
    const { jobseeker } = applicant;

    // Check if the jobseeker id is valid
    if (!jobseeker || !jobseeker.id) {
      console.error("Applicant or jobseeker ID is not defined.", applicant);
      toast.error("Error: Invalid applicant data.");
      return;
    }

    const jobseekerId = jobseeker.id; // Ensure you are accessing the correct id
    const applicationId = applicant._id;
    console.log("Jobseeker ID:", jobseekerId);
    console.log("Application ID:", applicationId);
    
     // Use the application ID from the applicant object

    setStatusUpdating(applicationId);

    try {
      const response = await axios.put(
        `http://localhost:8070/apply/update/${jobseekerId}/${applicationId}`, // API endpoint
        { status: newStatus }, // Send the new status
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
    <div className="flex ">
      <Sidebar />
      <div className="flex-1 p-6 bg-gray-50">
        <div className="min-h-screen bg-gray-50">
          <div className="bg-white shadow-md rounded-lg p-4 mb-6 flex flex-col md:flex-row justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800">Applicants</h2>
            <div className="mt-4 md:mt-0">
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
            <p className="w-1/4">JOB</p>
            <p className="w-1/4">NAME</p>
            <p className="w-1/4">RESUME</p>
            <p className="w-1/4">ACTION</p>
          </div>

          <div>
            {applicants.length > 0 ? (
              applicants.map((applicant) => (
                <Applicant
                  key={applicant._id}
                  applicant={applicant}
                  onStatusUpdate={handleStatusUpdate}
                  statusUpdating={statusUpdating}
                />
              ))
            ) : (
              <p>No Applications Yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const Applicant = React.memo(({ applicant, onStatusUpdate, statusUpdating }) => {
  const { _id, jobseeker, job, status } = applicant;

  return (
    <div
      className={`flex flex-col md:flex-row justify-between items-center bg-white shadow-md rounded-lg p-4 mb-4 font-serif ${
        status === "Accepted" ? "border-2 border-green-500" : status === "Rejected" ? "border-2 border-red-500" : "border-2 border-gray-300"
      }`}
    >
      <p className="text-gray-600 font-bold w-full md:w-1/4">{job.title}</p>
      <h3 className="font-bold text-gray-700 w-full md:w-1/4">{jobseeker.name}</h3>

      <div className="flex justify-between gap-4 items-center w-full md:w-1/4">
        <a
          href={`http://localhost:8070/${applicant.resume}`}
          target="_blank"
          className="text-blue-500 hover:text-blue-700"
          rel="noreferrer"
        >
          <FaEye className="inline-block mr-2" />
          View Resume
        </a>

        <div className="flex gap-2">
          <button
            className={`px-4 py-2 bg-blue-500 text-white rounded-md ${statusUpdating === _id || status === "Accepted" ? "opacity-50 cursor-not-allowed" : ""}`}
            onClick={() => onStatusUpdate(applicant, "Accepted")}
            disabled={statusUpdating === _id || status === "Accepted"}
          >
            Approve
          </button>
          <button
            className={`px-4 py-2 bg-red-500 text-white rounded-md ${statusUpdating === _id || status === "Rejected" ? "opacity-50 cursor-not-allowed" : ""}`}
            onClick={() => onStatusUpdate(applicant, "Rejected")}
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
