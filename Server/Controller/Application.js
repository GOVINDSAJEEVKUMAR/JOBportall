const express = require ("express")
const Job = require ("../Model/JobSchema")
const Employer = require ("../Model/EmployerSchema")
const Application = require ("../Model/Application")
const User = require ("../Model/UserSchema")
const path = require ("path")
const mongoose = require ("mongoose")


const ApplyJob = async (req, res) => {
  try {
    const { jobId, jobseekerId } = req.body;
    const resume = req.file.path;

    // Validate required fields
    if (!jobId || !jobseekerId || !resume) {
      return res.status(400).send({ message: 'All fields are required' });
    }

    // Find the job by ID
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).send({ message: 'Job not found' });
    }

    // Find the jobseeker by ID
    const jobseeker = await User.findById(jobseekerId);
    if (!jobseeker) {
      return res.status(404).send({ message: 'Jobseeker not found' });
    }

    // Create a new application with job and applicant details
    const application = new Application({
      job: {
        id: job._id,
        title: job.title,
        company: job.company,
        location: job.location,
        salary: job.salary,
      },
      jobseeker: {
        id: jobseeker._id,
        name: jobseeker.name,
        email: jobseeker.email,
        phone: jobseeker.phone,
      },
      resume,
      postedBy: job.postedBy,  // Add the employer from the job
      status: 'Pending',
    });

    // Save the application
    await application.save();

    res.status(201).send({
      message: 'Application submitted successfully',
      application
    });
  } catch (error) {
    console.error('Error applying for job:', error);
    res.status(500).send({ message: 'Server error', error });
  }
};


const getApplicants = async (req, res) => {
  try {
    const { id } = req.params; // Employer's ID (from URL params)

    // Step 1: Convert the employer's ID to a valid ObjectId
    const employerId = new mongoose.Types.ObjectId(id);

    // Step 2: Find all jobs posted by the employer
    const jobs = await Job.find({ postedBy: employerId });

    if (!jobs || jobs.length === 0) {
      return res.status(404).json({
        message: 'No jobs found for this employer.',
        success: false,
      });
    }

    // Extract job IDs
    const jobIds = jobs.map(job => job._id);

    // Step 3: Find all applications for these jobs and ensure job.id is also an ObjectId
    const applications = await Application.find({ 'job.id': { $in: jobIds.map(id => new mongoose.Types.ObjectId(id)) } });

    if (!applications || applications.length === 0) {
      return res.status(404).json({
        message: 'No applications found for jobs posted by this employer.',
        success: false,
      });
    }

    // Step 4: Return the data with jobseeker and job details
    return res.status(200).json({
      applications: applications.map(application => ({
        jobseeker: {
          name: application.jobseeker.name,
          email: application.jobseeker.email,
          phone: application.jobseeker.phone,
        },
        job: {
          title: application.job.title,
          company: application.job.company,
          location: application.job.location,
          salary: application.job.salary,
        },
        resume: application.resume,
        status: application.status,
      })),
      success: true,
    });
  } catch (error) {
    console.error("Error fetching applications:", error);
    return res.status(500).json({ message: 'Server error' });
  }
};




const updateStatus = async (req, res) => {
  const { Id } = req.params;
  
  if (!Id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({ message: 'Invalid application ID format' });
  }

  const { status } = req.body;

  try {
    const updatedApplicant = await Application.findByIdAndUpdate(Id, { status }, { new: true });

    if (!updatedApplicant) {
      return res.status(404).json({ message: 'Applicant not found' });
    }

    res.status(200).json({ message: 'Status updated successfully', applicant: updatedApplicant });
  } catch (error) {
    console.error('Error updating applicant status:', error);
    res.status(500).json({ message: 'Failed to update status' });
  }
};



const getMyApplication = async (req, res) => {
  const jobseekerId = req.params.id; // Extract jobseeker ID from URL params

  try {
    // Fetch all applications by the jobseeker ID
    const applications = await Application.find({ 'jobseeker.id': jobseekerId }).populate('job.id', 'title location').populate('jobseeker.id', 'name email phone');
    
    if (!applications.length) {
      return res.status(404).json({ message: 'No applications found for this jobseeker' });
    }

    // Return the list of applications
    res.status(200).json(applications);
  } catch (error) {
    console.error('Error fetching applications:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};



  const getall = async (req,res)=>{
    const application = await Application.find();
    return res.status(200).json(application);
  }

  const getMypost = async (req, res) => {
    const { _id } = req.params;
    // console.log(_id);
    
  
    // Check if ID is provided
    if (!_id) {
      return res.status(400).json({ message: "ID parameter is required" });
    }
  
    // Check if the ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }
  
    try {
      const application = await Job.find({ postedBy: _id });
      return res.status(200).json(application);
    } catch (error) {
      console.error("Error fetching applications:", error);
      return res.status(500).json({ message: "Server error" });
    }
  };
  
  
  

  module.exports = {
    ApplyJob, 
    getApplicants,
    updateStatus, 
     getMyApplication, 
     getall, 
     getMypost}