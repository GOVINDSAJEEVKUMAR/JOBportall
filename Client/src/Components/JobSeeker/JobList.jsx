import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../CommonPage/Nav';
import axios from 'axios';
import { FaFilter, FaBriefcase, FaDollarSign, FaCalendarAlt, FaBookmark } from 'react-icons/fa';

const DataFetchingComponent = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  // Filter states
  const [filter, setFilter] = useState({
    title: '',
    company: '',
    location: '',
    type: '',
    salary: [0, 200000],
    category: '',
    workingDays: [],
    shift: []
  });

  // Fetch data
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8070/job/get');
      setData(response.data);
      setFilteredData(response.data);
      console.log(response.data);
      
    } catch (err) {
      setError('Error fetching data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Filter data
  const filterData = () => {
    const filtered = data.filter(item => (
      (filter.title === '' || item.title?.toLowerCase().includes(filter.title.toLowerCase())) &&
      (filter.company === '' || item.company?.toLowerCase().includes(filter.company.toLowerCase())) &&
      (filter.location === '' || item.location?.toLowerCase().includes(filter.location.toLowerCase())) &&
      (filter.type === '' || item.type?.toLowerCase().includes(filter.type.toLowerCase())) &&
      (item.salary >= filter.salary[0] && item.salary <= filter.salary[1])
    ));
    setFilteredData(filtered);
  };

  // Handle filter input changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, value, checked } = e.target;
    setFilter(prev => {
      const updatedArray = checked 
        ? [...prev[name], value]
        : prev[name].filter(item => item !== value);
      return { ...prev, [name]: updatedArray };
    });
  };

  useEffect(() => {
    filterData();
  }, [filter]);

  const handleApplyClick = (job) => {
    navigate(`/application/${job._id}`, { state: { job } });
  };

  // Render skills function
  const renderSkills = (skills) => (
    <div className="mb-2">
      <span className="block text-sm font-semibold mb-1">Skills:</span>
      <div className="flex flex-wrap gap-2">
        {(skills || []).map((skill, index) => (
          <div
            key={index}
            className="flex items-center space-x-2 bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs font-semibold"
          >
            <span className="text-gray-600">🛠️</span> {/* Fallback icon */}
            <span>{skill}</span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-6 flex flex-wrap">
        {/* Filters Section */}
        <div className="w-full md:w-1/3 lg:w-1/5 p-4 border rounded-lg shadow-md space-y-10 bg-white">
          <h2 className="text-xl font-bold mb-4">Filter <FaFilter className="inline" /></h2>
          <input name="title" placeholder="Title" value={filter.title} onChange={handleFilterChange} className="p-2 border rounded mb-2 w-full" />
          {/* <input name="company" placeholder="Company" value={filter.company} onChange={handleFilterChange} className="p-2 border rounded mb-2 w-full" /> */}
          <input name="location" placeholder="Location" value={filter.location} onChange={handleFilterChange} className="p-2 border rounded mb-2 w-full" />
          <select name="type" value={filter.type} onChange={handleFilterChange} className="p-2 border rounded w-full">
            <option value="">Select Type</option>
            <option value="full-time">Full-time</option>
            <option value="part-time">Part-time</option>
            <option value="contract">Contract</option>
            <option value="internship">Internship</option>
          </select>
          <select name="category" value={filter.category} onChange={handleFilterChange} className="p-2 border rounded w-full">
            <option value="">Select Category</option>
            <option value="engineering">Engineering</option>
            <option value="marketing">Marketing</option>
            <option value="design">Design</option>
            <option value="sales">Sales</option>
          </select>
          <div className="mb-2">
            <span className="block text-sm font-semibold mb-1">Salary Range</span>
            <input
              type="range"
              min="0"
              max="200000"
              value={filter.salary[0]}
              onChange={(e) => setFilter(prev => ({ ...prev, salary: [Number(e.target.value), prev.salary[1]] }))}
              className="w-full"
            />
            <input
              type="range"
              min="0"
              max="200000"
              value={filter.salary[1]}
              onChange={(e) => setFilter(prev => ({ ...prev, salary: [prev.salary[0], Number(e.target.value)] }))}
              className="w-full mt-2"
            />
            <p className="text-sm mt-1">Salary: ${filter.salary[0]} - ${filter.salary[1]}</p>
          </div>
        </div>

        {/* Job Listings Section */}
        <div className="w-full md:w-2/3 lg:w-4/5 p-4">
          {loading && <p className="text-lg text-gray-700">Loading...</p>}
          {error && <p className="text-red-500 font-semibold">{error}</p>}

          {filteredData.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredData.map((item) => (
                <div key={item._id} className="border p-4 rounded-lg shadow-md bg-white transition-transform transform hover:bg-slate-100">
                  <h3 className="text-2xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm mb-2 flex items-center">
                    <FaBriefcase className="mr-1 text-gray-600" />
                    Type: {item.type}
                  </p>
                  <p className="text-sm mb-2 flex items-center">
                    <FaDollarSign className="mr-1 text-gray-600" />
                    Salary: ${item.salary}
                  </p>
                  <p className="text-sm mb-2 flex items-center">
                    <FaCalendarAlt className="mr-1 text-gray-600" />
                    Posted Date: {item.postedDate}
                  </p>
                  <p className="text-sm mb-2">Location: {item.location}</p>
                  {/* {renderSkills(item.skills || [])} Ensure skills is always an array */}
                  <div className="flex justify-between items-center mt-4">
                    <button
                      onClick={() => handleApplyClick(item)}
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                    >
                      Apply
                    </button>
                    <button
                      className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg flex items-center"
                    >
                      <FaBookmark className="mr-1" />
                      Save
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            !loading && <p className="text-lg text-gray-700">No data available</p>
          )}
        </div>
      </div>
    </>
  );
};

export default DataFetchingComponent;
