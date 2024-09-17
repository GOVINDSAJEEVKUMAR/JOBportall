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

    // Step 1: Find all jobs posted by the employer
    const jobs = await Job.find({ postedBy: id });

    if (!jobs || jobs.length === 0) {
      return res.status(404).json({
        message: 'No jobs found for this employer.',
        success: false,
      });
    }

    // Extract job IDs
    const jobIds = jobs.map(job => job._id);

    // Step 2: Find all applications for these jobs
    const applications = await Application.find({ 'job.id': { $in: jobIds } });

    if (!applications || applications.length === 0) {
      return res.status(404).json({
        message: 'No applications found for jobs posted by this employer.',
        success: false,
      });
    }

    // Step 3: Return the data with jobseeker and job details
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
    try {
        const { status } = req.body;
        const applicationId = req.params.id;
  
        // Check if the status is provided
        if (!status) {
            return res.status(400).json({
                message: 'Status is required',
                success: false,
            });
        }
  
        const application = await Application.findById(applicationId);
        if (!application) {
            return res.status(404).json({
                message: "Application not found.",
                success: false,
            });
        }
  
        // Define valid statuses with original casing
        const validStatuses = ['Pending', 'Accepted', 'Rejected'];
        const trimmedStatus = status.trim();
  
        if (!validStatuses.includes(trimmedStatus)) {
            return res.status(400).json({
                message: `"${status}" is not a valid status.`,
                success: false,
            });
        }
  
        // Set the new status
        application.status = trimmedStatus;
  
        // Save the updated application
        await application.save();
  
        return res.status(200).json({
            message: "Status updated successfully.",
            success: true,
            updatedStatus: application.status,
        });
    } catch (error) {
        console.error("Error updating status:", error);
        res.status(500).json({
            message: "Server error",
            success: false,
        });
    }
  };


  const getMyApplication = async (req, res) => {
    try {
      const { jobseekerId } = req.params;
      console.log("Jobseeker ID:", jobseekerId);
  
      // Fetch applications by jobseekerId
      const applications = await Application.find({ Jobseeker: jobseekerId });
      console.log("Applications found:", applications);
  
      if (applications.length === 0) {
        return res.status(404).json({ msg: 'No applications found for this jobseeker' });
      }
  
      return res.status(200).json(applications);
    } catch (error) {
      console.error('Error retrieving applications:', error.message);
      return res.status(500).json({ msg: error.message });
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