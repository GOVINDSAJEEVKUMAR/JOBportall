const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  job: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job',
      required: true,
    },
    title: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String, required: true },
    salary: { type: Number, required: true }, // Changed to Number
  },
  jobseeker: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: { type: String, required: true },
    email: { type: String, required: true, match: /.+\@.+\..+/ }, // Regex for email validation
    phone: { type: String, required: true },
  },
  resume: {
    type: String,
    required: true,
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employer', // Refers to the employer who posted the job
    required: true,
  },
  status: {
    type: String,
    default: 'Pending',
    enum: ['Pending', 'Accepted', 'Rejected'],
  }
}, { timestamps: true });

// Indexes for performance
applicationSchema.index({ postedBy: 1 });
applicationSchema.index({ 'job.id': 1 });

module.exports = mongoose.model('Application', applicationSchema);
