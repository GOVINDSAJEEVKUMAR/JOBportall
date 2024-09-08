const mongoose = require("mongoose");

const employerSchema = new mongoose.Schema({
    profilePhoto: { type: String,indexed:true},
  name: { type: String, required: true,index:true },
  age: { type: Number, min: 0,index:true },
  dob: { type: Date,index:true },
  email: { type: String, required: true, unique: true, match: /.+\@.+\..+/,index:true },
  password: { type: String, required: true,index:true },
  phone: { type: String, index:true },
  education: { type: String,index:true },
  stream: { type: String,index:true },
  companyName: { type: String ,index:true},
  designation: { type: String ,index:true},
  years: { type: Number, min: 0 ,index:true},
  skills: { type: [String] ,index:true},
  hobbies: { type: String ,index:true},
  drinkingOrSmoking: { type: String, enum: ['Drinking', 'Smoking', 'Rarely Smoking', 'Rarely Drinking', 'None'] ,index:true},
  height: { type: Number, min: 0 ,index:true},
  weight: { type: Number, min: 0 ,index:true},
  role: { type: String, default: "Employer" ,index:true },
  
})

module.exports = mongoose.model("Employer", employerSchema)