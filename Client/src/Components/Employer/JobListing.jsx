import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import { CiSearch, CiFilter, CiSquarePlus } from "react-icons/ci";
import Navbar from '../CommonPage/Nav';

function JobPostingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState('Job Postings'); // Track active sidebar item
  const navigate = useNavigate();

  const jobPostings = [
    {
      title: 'Responsable IT',
      department: 'IT',
      location: 'Montreal, QC, Canada',
      createdBy: 'James Thompson',
    },
    // Add more job postings as needed
  ];

  const applicants = [
    {
      name: 'John Doe',
      position: 'Software Engineer',
      status: 'Pending',
    },
    // Add more applicants as needed
  ];

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    navigate();
  };

  const handleEdit = (index) => {
    console.log(`Edit job posting at index ${index}`);
  };

  const handleDelete = (index) => {
    console.log(`Delete job posting at index ${index}`);
  };

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen bg-gray-100">
        {/* Sidebar */}
        <aside className="w-64 bg-blue-800 text-white flex flex-col">
          <div className="p-4 text-lg font-semibold">Recruiting</div>
          <nav className="flex-1">
            <a 
              href="#" 
              onClick={() => setActiveMenu('Job Postings')} 
              className={`block p-4 hover:bg-blue-700 ${activeMenu === 'Job Postings' ? 'bg-blue-700' : ''}`}
            >
              Job Postings
            </a>
            <a 
              href="#" 
              onClick={() => setActiveMenu('Applicants')} 
              className={`block p-4 hover:bg-blue-700 ${activeMenu === 'Applicants' ? 'bg-blue-700' : ''}`}
            >
              Applicants
            </a>
            <a 
              href="#" 
              onClick={() => setActiveMenu('Settings')} 
              className={`block p-4 hover:bg-blue-700 ${activeMenu === 'Settings' ? 'bg-blue-700' : ''}`}
            >
              Settings
            </a>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {activeMenu === 'Job Postings' && (
            <>
              <header className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">Job Postings</h1>
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search jobs"
                      className="pl-10 pr-4 py-2 border rounded-md"
                    />
                    <CiSearch className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  </div>
                  <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                    <CiFilter className="h-5 w-5 mr-2" /> Filter
                  </button>
                  <button 
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700" 
                    onClick={toggleModal}
                  >
                    <CiSquarePlus className="h-5 w-5 mr-2" /> Job Posting
                  </button>
                </div>
              </header>

              {/* Job Postings Table */}
              <div className="bg-white shadow-md rounded-lg">
                <table className="w-full text-left">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="py-3 px-6">Job Posting</th>
                      <th className="py-3 px-6">Department</th>
                      <th className="py-3 px-6">Location</th>
                      <th className="py-3 px-6">Created by</th>
                      <th className="py-3 px-6">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {jobPostings.map((job, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-6">{job.title}</td>
                        <td className="py-3 px-6">{job.department}</td>
                        <td className="py-3 px-6">{job.location}</td>
                        <td className="py-3 px-6">{job.createdBy}</td>
                        <td className="py-3 px-6 flex space-x-4">
                          <button 
                            className="text-blue-600 hover:text-blue-800" 
                            onClick={() => handleEdit(index)}
                          >
                            Edit
                          </button>
                          <button 
                            className="text-red-600 hover:text-red-800" 
                            onClick={() => handleDelete(index)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {activeMenu === 'Applicants' && (
            <>
              <h1 className="text-2xl font-bold mb-6">Applicants</h1>
              <div className="bg-white shadow-md rounded-lg">
                <table className="w-full text-left">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="py-3 px-6">Applicant</th>
                      <th className="py-3 px-6">Position</th>
                      <th className="py-3 px-6">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {applicants.map((applicant, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-6">{applicant.name}</td>
                        <td className="py-3 px-6">{applicant.position}</td>
                        <td className="py-3 px-6">{applicant.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {activeMenu === 'Settings' && (
            <div>
              <h1 className="text-2xl font-bold">Settings</h1>
              {/* Add settings-related content here */}
            </div>
          )}
        </main>
      </div>
    </>
  );
}

export default JobPostingPage;
