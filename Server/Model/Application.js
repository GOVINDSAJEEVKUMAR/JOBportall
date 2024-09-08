const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true,
  },
  jobseeker: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Jobseeker',
    required: true,
  },
  resume: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['Pending', 'Accepted', 'Rejected'],
    default: 'Pending',
  },
  postedBy: {  // New field for employer
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employer',
    required: true,
  },
  status: {
    type: String,
    enum: ['Pending', 'Accepted', 'Rejected'],
    default: 'Pending',
  },
}, { timestamps: true });

const Application = mongoose.model('Application', applicationSchema);

module.exports = Application;
