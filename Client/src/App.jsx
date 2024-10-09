import React from 'react'
// import "dotenv/config"
// require('dotenv').config();
import { useNavigate, Routes, Route } from 'react-router-dom'
import {Toaster} from "react-hot-toast"
import Home from './Components/CommonPage/Home'
import Login from "./Components/LogSig/Login"
import Dashboard from './Components/Employer/DashBoard'
import Inbox from './Components/JobSeeker/Inbox'
import ProfileCard from './Components/CommonPage/ProfileCard'
import SignUp from './Components/LogSig/Sign'
import Navbar from './Components/CommonPage/Nav'
import JobList from './Components/JobSeeker/JobList'
import JobApplicationForm from './Components/JobSeeker/Application'
import ApplicantsList from './Components/Employer/Applicant'
import JobPost from "./Components/Employer/JobPost"
import Profile from "./Components/Employer/Profile"
import Applied from './Components/JobSeeker/Applied'
import EditJobModal from './Components/Employer/EditJob'


const App = () => {
  return (
    <div>
      <Toaster toastOptions= {{duration: 3000}}  position="top-center" />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/sign' element={<SignUp />} />
        {/* <Route element={<Navbar />}> */}
        <Route path='/jobposting' element={<Dashboard />} />
        <Route path='/inbox' element={<Inbox />} />
        <Route path ="/job" element={<JobList/>}/>
        <Route path='/application/:_id' element={<JobApplicationForm />} />
        <Route path='/profile/:_id' element={<ProfileCard />} />
        <Route path='/applied/:_id' element={<Applied />}/>
        {/* </Route> */}
        <Route path ="/applicant" element={<ApplicantsList/>}/>
        <Route path='/dashboard' element={<Dashboard />}/>
        <Route path="/post" element={<JobPost/>}/>
        <Route path='/edit/:id' element={<EditJobModal/>}/>
        <Route path='/eprofile/:id' element={<Profile />} />
      </Routes>

    </div>
  )
}

export default App
