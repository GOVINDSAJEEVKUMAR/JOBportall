const express = require ("express")
const User = require ("../Model/UserSchema")
const Employer = require ("../Model/EmployerSchema")
const Job = require ("../Model/JobSchema")



const newJob = async (req, res) => {
    try {
      const { title, description, type,category,location, email,salary } = req.body;
      console.log(req.body);
      
      // Validate input
      if (!title || !description || !type || !category || !location||salary ) {
        return res.status(400).send({ message: 'All fields are required' });
      }
  
      // Find employee by email
      const employer = await Employer.findOne({ email });
      // console.log(employee);
      
      if (!employer) {
        return res.status(404).send({ message: 'Employee not found' });
      }
  
      // Create a new job with the found employee's ID
      const job = new Job({ title, description,location,salary, category,type, postedBy: employer._id });
      await job.save();
  
      res.status(201).send(job);
    } catch (error) {
      console.error('Error creating job:', error);
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