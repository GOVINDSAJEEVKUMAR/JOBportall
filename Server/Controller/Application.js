const express = require ("express")
const Job = require ("../Model/JobSchema")
const Employer = require ("../Model/EmployerSchema")
const Application = require ("../Model/Application")
const User = require ("../Model/UserSchema")
const path = require ("path")


const ApplyJob = async (req, res) => {
  try {
    const { jobId, jobseekerId } = req.body;
    const resume = req.file.path;

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

    // Create a new application with postedBy from the job
    const application = new Application({
      job: jobId,
      jobseeker: jobseekerId,
      resume,
      postedBy: job.postedBy,  // Add the employer from the job
      status: 'Pending',
    });
    await application.save();

    res.status(201).send({ message: 'Application submitted successfully', application });
  } catch (error) {
    console.error('Error applying for job:', error);
    res.status(500).send({ message: 'Server error', error });
  }
};


  const getApplicants = async (req, res) => {
    
    try {
      const { jobId, employeeId, applicantId } = req.params;
  
      // Find the job by ID and ensure it was posted by the specified employee
      const job = await Job.findOne({ job: jobId, postedBy: employeeId });
  
      if (!job) {
        return res.status(404).json({
          message: 'Job not found or you do not have permission to view applicants for this job.',
          success: false,
        });
      }
  
      // Find the specific application for the job by the applicant
      const application = await Application.findOne({
        job: jobId,
        applicant: applicantId
      }).populate('applicant');
  
      if (!application) {
        return res.status(404).json({
          message: 'Applicant not found for this job.',
          success: false,
        });
      }
  
      return res.status(200).json({
        application,
        success: true,
      });
    } catch (error) {
      console.error("Error fetching applicant:", error);
      res.status(500).json({ msg: "Server error" });
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

  const getMypost = async(req,res)=>{
    const application = await Application.find({postedBy:req.params.id});
    return res.status(200).json(application);
  }
  

  module.exports = {
    ApplyJob, 
    getApplicants,
     updateStatus, 
     getMyApplication, 
     getall, 
     getMypost}