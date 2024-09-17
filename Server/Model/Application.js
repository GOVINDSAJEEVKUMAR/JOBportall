
const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  job: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job',
      required: true
    },
    title: String,
    company: String,
    location: String,
    salary: String,
  },
  jobseeker: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    name: String,
    email: String,
    phone: String,
  },
  resume: {
    type: String,
    required: true
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Refers to the employer who posted the job
    required: true
  },
  status: {
    type: String,
    default: 'Pending',
    enum: ['Pending', 'Accepted', 'Rejected']
  }
}, { timestamps: true });

module.exports = mongoose.model('Application', applicationSchema);
