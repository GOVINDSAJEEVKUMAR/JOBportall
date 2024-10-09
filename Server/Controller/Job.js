const express = require ("express")
const User = require ("../Model/UserSchema")
const Employer = require ("../Model/EmployerSchema")
const Job = require ("../Model/JobSchema")
const mongoose = require ("mongoose")



const newJob = async (req, res) => {
  try {
    const { title, description, type, category, location, email, salary } = req.body;
    console.log(req.body);
    
    // Validate input: ensure that all necessary fields are provided by the client
    // if (!title || !description || !type || !category || !location || !salary) {
    //   return res.status(400).send({ message: 'All fields are required' });
    // }

    // if (!mongoose.Types.ObjectId.isValid(postedBy)) {
    //   return res.status(400).json({ error: 'Invalid postedBy ID' });
    // }
    // Find employer by the provided email to ensure the posting is linked to a valid employer
    const employer = await Employer.findOne({ email });
    
    if (!employer) {
      return res.status(404).send({ message: 'Employee not found' }); // Handle case when employer does not exist
    }

    // Create a new job, linking it to the employer's ID, and save it to the database
    const job = new Job({ title, description, location, salary, category, type, postedBy: employer._id,  employerName: employer.name,
      company: employer.companyName });
    await job.save();

    // Send a response with the newly created job
    res.status(201).send(job);
  } catch (error) {
    console.error('Error creating job:', error); // Log the error for debugging purposes
    res.status(500).send({ message: 'Server error', error });
  }
};


  const getallJob = async (req, res) => {
    try {
      const jobs = await Job.find({});
      res.status(200).json(jobs); // Directly sending the jobs array
    } catch (error) {
      res.status(500).json({ msg: error });
    }
  };
  const loadEditJob = async (req, res) => {
      try {
          const { id } = req.params;
          const updatedJob = await Job.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
      
          if (!updatedJob) {
            return res.status(404).json({ message: 'Job not found' });
          }
      
          res.json(updatedJob);
        } catch (error) {
          console.log(error.message);
          res.status(500).json({ message: 'Server error' });
        }
      };
      
      const deleteJob = async (req, res) => {
        try {
          const { id } = req.params;
          const deletedJob = await Job.findByIdAndDelete(id);
      
          if (!deletedJob) {
            return res.status(404).json({ message: 'Job not found' });
          }
      
          res.json({ message: 'Job deleted successfully' });
        } catch (error) {
          console.log(error.message);
          res.status(500).json({ message: 'Server error' });
        }
      };
    
      const getJob = async (req,res)=>{
        const {id} = req.params
        const job = await Job.findById(id)
        res.status(200).json(job)
      }
  module.exports = {
      newJob,
      getallJob,
      loadEditJob,
      deleteJob,
      getJob
  }