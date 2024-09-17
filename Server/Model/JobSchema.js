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
}, { timestamps: true });

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
