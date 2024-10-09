const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  salary: {
    type: String,
    required: true,
  },
  type:{
    type:String,
    required:true

  },
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Employer' },
  employerName: { type: String }, 
  company: { type: String },
});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
