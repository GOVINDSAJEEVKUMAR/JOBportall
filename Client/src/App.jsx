import React from 'react'
import { useNavigate, Routes, Route } from 'react-router-dom'
import {Toaster} from "react-hot-toast"
import Home from './Components/CommonPage/Home'
import Login from "./Components/LogSig/Login"
import JobPostingPage from './Components/Employer/JobListing'
import Inbox from './Components/JobSeeker/Inbox'
import ProfileCard from './Components/CommonPage/ProfileCard'
import SignUp from './Components/LogSig/Sign'
import Navbar from './Components/CommonPage/Nav'
import JobList from './Components/JobSeeker/JobList'
import JobApplicationForm from './Components/JobSeeker/Application'


const App = () => {
  return (
    <div>
      <Toaster toastOptions= {{duration: 3000}}  position="top-center" />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/sign' element={<SignUp />} />
        {/* <Route element={<Navbar />}> */}
        <Route path='/jobposting' element={<JobPostingPage />} />
        <Route path='/inbox' element={<Inbox />} />
        <Route path ="/job" element={<JobList/>}/>
        <Route path='/application/:_id' element={<JobApplicationForm />} />
        <Route path='/profile/:_id' element={<ProfileCard />} />
        {/* </Route> */}
      </Routes>

    </div>
  )
}

export default App
