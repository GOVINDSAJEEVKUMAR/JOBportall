


// // import React, { useState } from 'react';
// // import { Link, useNavigate } from 'react-router-dom';
// // import axios from 'axios';
// // import toast from 'react-hot-toast';

// // axios.defaults.withCredentials = true;

// // const SignUp = () => {
// //     const navigate = useNavigate();
// //     const [values, setValues] = useState({
// //         profilePhoto: '',
// //         name: '',
// //         age: '',
// //         dob: '',
// //         email: '',
// //         password: '',
// //         phone: '',
// //         education: '',
// //         stream: '',
// //         companyName: '',
// //         designation: '',
// //         years: '',
// //         skills: '',
// //         hobbies: '',
// //         drinkingOrSmoking: '',
// //         height: '',
// //         weight: '',
// //         role: '' // Added role to the form state
// //     });

// //     const [profilePhotoPreview, setProfilePhotoPreview] = useState(null);

// //     const handleChange = (e) => {
// //         const { name, value, files } = e.target;
// //         if (name === 'profilePhoto' && files[0]) {
// //             setValues({ ...values, profilePhoto: files[0] });
// //             setProfilePhotoPreview(URL.createObjectURL(files[0]));
// //         } else {
// //             setValues({ ...values, [name]: value });
// //         }
// //     };

// //     const handleSubmit = async (e) => {
// //         e.preventDefault();
// //         try {
// //             await sendData();
// //             toast.success(`Role selected: ${values.role}`);
// //             navigate("/");
// //             setTimeout(() => {
// //                 window.location.reload();
// //             }, 4000);
// //         } catch (error) {
// //             console.error("Error submitting form:", error);
// //         }
// //     };

// //     const sendData = async () => {
// //         const {
// //             name, email, password, phone, education, stream,
// //             companyName, designation, years, skills, hobbies,
// //             drinkingOrSmoking, height, weight, dob, role
// //         } = values;

// //         const formData = new FormData();
// //         formData.append('profilePhoto', values.profilePhoto);
// //         formData.append('name', name);
// //         formData.append('email', email);
// //         formData.append('password', password);
// //         formData.append('phone', phone);
// //         formData.append('education', education);
// //         formData.append('stream', stream);
// //         formData.append('companyName', companyName);
// //         formData.append('designation', designation);
// //         formData.append('years', years);
// //         formData.append('skills', skills);
// //         formData.append('hobbies', hobbies);
// //         formData.append('drinkingOrSmoking', drinkingOrSmoking);
// //         formData.append('height', height);
// //         formData.append('weight', weight);
// //         formData.append('dob', dob);
// //         formData.append('role', role); // Include role in the form data

// //         const res = await axios.post("http://localhost:8002/job/signup", formData, {
// //             headers: {
// //                 'Content-Type': 'multipart/form-data'
// //             }
// //         });

// //         return res.data;
// //     };

// //     return (
// //         <section>
// //             <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
// //                 <form className="w-full max-w-3xl bg-white shadow-md rounded-lg p-6" onSubmit={handleSubmit}>
// //                     <h2 className="text-2xl font-semibold mb-4">Profile Form</h2>
// //                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //                         <div className="col-span-2 md:col-span-1">
// //                             <label className="block text-gray-700 font-semibold mb-2">Profile Photo</label>
// //                             <input
// //                                 type="file"
// //                                 name="profilePhoto"
// //                                 accept="image/*"
// //                                 className="w-full px-3 py-2 border border-gray-300 rounded-lg"
// //                                 onChange={handleChange}
// //                             />
// //                             {profilePhotoPreview && (
// //                                 <img
// //                                     src={profilePhotoPreview}
// //                                     alt="Profile Preview"
// //                                     className="mt-4 w-24 h-24 rounded-full object-cover"
// //                                 />
// //                             )}
// //                         </div>

// //                         <div>
// //                             <label className="block text-gray-700 font-semibold mb-2">Name</label>
// //                             <input
// //                                 type="text"
// //                                 name="name"
// //                                 value={values.name}
// //                                 onChange={handleChange}
// //                                 className="w-full px-3 py-2 border border-gray-300 rounded-lg"
// //                             />
// //                         </div>
// //                         <div>
// //                             <label className="block text-gray-700 font-semibold mb-2">Email</label>
// //                             <input
// //                                 type="email"
// //                                 name="email"
// //                                 value={values.email}
// //                                 onChange={handleChange}
// //                                 className="w-full px-3 py-2 border border-gray-300 rounded-lg"
// //                             />
// //                         </div>

// //                         <div>
// //                             <label className="block text-gray-700 font-semibold mb-2">Password</label>
// //                             <input
// //                                 type="password"
// //                                 name="password"
// //                                 value={values.password}
// //                                 onChange={handleChange}
// //                                 className="w-full px-3 py-2 border border-gray-300 rounded-lg"
// //                             />
// //                         </div>

// //                         <div>
// //                             <label className="block text-gray-700 font-semibold mb-2">Phone Number</label>
// //                             <input
// //                                 type="number"
// //                                 name="phone"
// //                                 value={values.phone}
// //                                 onChange={handleChange}
// //                                 className="w-full px-3 py-2 border border-gray-300 rounded-lg"
// //                             />
// //                         </div>

// //                         <div>
// //                             <label className="block text-gray-700 font-semibold mb-2">Age</label>
// //                             <input
// //                                 type="number"
// //                                 name="age"
// //                                 value={values.age}
// //                                 onChange={handleChange}
// //                                 className="w-full px-3 py-2 border border-gray-300 rounded-lg"
// //                             />
// //                         </div>
// //                         <div>
// //                             <label className="block text-gray-700 font-semibold mb-2">Date of Birth</label>
// //                             <input
// //                                 type="date"
// //                                 name="dob"
// //                                 value={values.dob}
// //                                 onChange={handleChange}
// //                                 className="w-full px-3 py-2 border border-gray-300 rounded-lg"
// //                             />
// //                         </div>

// //                         <div className="col-span-2 md:col-span-1">
// //                             <label className="block text-gray-700 font-semibold mb-2">Education</label>
// //                             <select
// //                                 name="education"
// //                                 value={values.education}
// //                                 onChange={handleChange}
// //                                 className="w-full px-3 py-2 border border-gray-300 rounded-lg"
// //                             >
// //                                 <option value="">Select Education</option>
// //                                 <option value="10th">10th</option>
// //                                 <option value="12th">12th</option>
// //                                 <option value="Graduate">Graduate</option>
// //                                 <option value="Post Graduate">Post Graduate</option>
// //                                 <option value="Other">Other</option>
// //                             </select>
// //                         </div>
// //                         <div className="col-span-2 md:col-span-1">
// //                             <label className="block text-gray-700 font-semibold mb-2">Stream</label>
// //                             <input
// //                                 type="text"
// //                                 name="stream"
// //                                 value={values.stream}
// //                                 onChange={handleChange}
// //                                 className="w-full px-3 py-2 border border-gray-300 rounded-lg"
// //                             />
// //                         </div>
// //                         <div className="col-span-2 md:col-span-1">
// //                             <label className="block text-gray-700 font-semibold mb-2">Company Name</label>
// //                             <input
// //                                 type="text"
// //                                 name="companyName"
// //                                 value={values.companyName}
// //                                 onChange={handleChange}
// //                                 className="w-full px-3 py-2 border border-gray-300 rounded-lg"
// //                             />
// //                         </div>
// //                         <div className="col-span-2 md:col-span-1">
// //                             <label className="block text-gray-700 font-semibold mb-2">Designation</label>
// //                             <input
// //                                 type="text"
// //                                 name="designation"
// //                                 value={values.designation}
// //                                 onChange={handleChange}
// //                                 className="w-full px-3 py-2 border border-gray-300 rounded-lg"
// //                             />
// //                         </div>
// //                         <div className="col-span-2 md:col-span-1">
// //                             <label className="block text-gray-700 font-semibold mb-2">Years of Experience</label>
// //                             <input
// //                                 type="number"
// //                                 name="years"
// //                                 value={values.years}
// //                                 onChange={handleChange}
// //                                 className="w-full px-3 py-2 border border-gray-300 rounded-lg"
// //                             />
// //                         </div>
// //                         <div className="col-span-2 md:col-span-1">
// //                             <label className="block text-gray-700 font-semibold mb-2">Skills</label>
// //                             <input
// //                                 type="text"
// //                                 name="skills"
// //                                 value={values.skills}
// //                                 onChange={handleChange}
// //                                 className="w-full px-3 py-2 border border-gray-300 rounded-lg"
// //                             />
// //                         </div>
// //                         <div className="col-span-2">
// //                             <label className="block text-gray-700 font-semibold mb-2">Hobbies</label>
// //                             <input
// //                                 type="text"
// //                                 name="hobbies"
// //                                 value={values.hobbies}
// //                                 onChange={handleChange}
// //                                 className="w-full px-3 py-2 border border-gray-300 rounded-lg"
// //                             />
// //                         </div>

// //                         <div className="col-span-2 md:col-span-1">
// //                             <label className="block text-gray-700 font-semibold mb-2">Drinking/Smoking</label>
// //                             <select
// //                                 name="drinkingOrSmoking"
// //                                 value={values.drinkingOrSmoking}
// //                                 onChange={handleChange}
// //                                 className="w-full px-3 py-2 border border-gray-300 rounded-lg"
// //                             >
// //                                 <option value="">Select</option>
// //                                 <option value="Drinking">Drinking</option>
// //                                 <option value="Smoking">Smoking</option>
// //                                 <option value="Rarely Drinking">Rarely Drinking</option>
// //                                 <option value="Rarely Smoking">Rarely Smoking</option>
// //                                 <option value="None">None</option>
// //                             </select>
// //                         </div>
// //                         <div className="col-span-2 md:col-span-1">
// //                             <label className="block text-gray-700 font-semibold mb-2">Height</label>
// //                             <input
// //                                 type="number"
// //                                 name="height"
// //                                 value={values.height}
// //                                 onChange={handleChange}
// //                                 className="w-full px-3 py-2 border border-gray-300 rounded-lg"
// //                             />
// //                         </div>
// //                         <div className="col-span-2 md:col-span-1">
// //                             <label className="block text-gray-700 font-semibold mb-2">Weight</label>
// //                             <input
// //                                 type="number"
// //                                 name="weight"
// //                                 value={values.weight}
// //                                 onChange={handleChange}
// //                                 className="w-full px-3 py-2 border border-gray-300 rounded-lg"
// //                             />
// //                         </div>
// //                         <div className="col-span-2 md:col-span-1">
// //                             <label className="block text-gray-700 font-semibold mb-2">Role</label>
// //                             <select
// //                                 name="role"
// //                                 value={values.role}
// //                                 onChange={handleChange}
// //                                 className="w-full px-3 py-2 border border-gray-300 rounded-lg"
// //                                 required
// //                             >
// //                                 <option value="">Select Role</option>
// //                                 <option value="Jobseeker">Jobseeker</option>
// //                                 <option value="Employee">Employee</option>
// //                                 <option value="Employer">Employer</option>
// //                             </select>
// //                         </div>
// //                     </div>
// //                     <button type="submit" className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg">
// //                         Submit
// //                     </button>
// //                 </form>
// //                 <div className="mt-4">
// //                     <Link to="/login">Back to Home</Link>
// //                 </div>
// //             </div>
// //         </section>
// //     );
// // };

// // export default SignUp;

// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { toast } from 'react-toastify';

// const SignUp = () => {
//   const navigate = useNavigate();
  
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     role: ''
//   });

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     try {
//       const response = await axios.post('http://localhost:8030/job/signup', formData, { withCredentials: true });
      
//       if (response.data.success) {
//         toast.success('Sign up successful! Redirecting to login...');
//         navigate('/login'); // Redirect to the login page after successful signup
//       } else {
//         toast.error(response.data.message);
//       }
//     } catch (error) {
//       toast.error('Sign up failed. Please try again.');
//     }
//   };

//   return (
//     <div className="flex flex-col md:flex-row min-h-screen">
//       {/* Left side image section */}
//       <div className="hidden md:flex w-full md:w-1/2 bg-cover bg-center" style={{ backgroundImage: "url('https://i.pinimg.com/564x/7d/c0/13/7dc013379e92d317f7df84e8eed4960e.jpg')" }}>
//         <div className="flex items-center justify-center w-full h-full bg-black bg-opacity-50">
//           <div className="text-white text-center px-6">
//             <h1 className="text-4xl font-bold">Turn Your Ideas into Reality</h1>
//             <p className="mt-4">Start for free and get attractive offers from the community</p>
//           </div>
//         </div>
//       </div>

//       {/* Right side sign-up section */}
//       <div className="flex items-center justify-center w-full md:w-1/2 p-8">
//         <div className="max-w-md w-full space-y-8">
//           <div>
//             <h3 className="text-xl text-center">Sign Up</h3>
//             <p className="text-center text-gray-600">Create your account to start your journey.</p>
//           </div>

//           <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
//             <div className="space-y-5">
//               <div>
//                 <label htmlFor="name" className="sr-only">Name</label>
//                 <input
//                   id="name"
//                   name="name"
//                   type="text"
//                   value={formData.name}
//                   onChange={handleChange}
//                   required
//                   className="appearance-none block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                   placeholder="Full Name"
//                 />
//               </div>
//               <div>
//                 <label htmlFor="email-address" className="sr-only">Email address</label>
//                 <input
//                   id="email-address"
//                   name="email"
//                   type="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   required
//                   className="appearance-none block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                   placeholder="Email address"
//                 />
//               </div>
//               <div>
//                 <label htmlFor="password" className="sr-only">Password</label>
//                 <input
//                   id="password"
//                   name="password"
//                   type="password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   required
//                   className="appearance-none block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                   placeholder="Password"
//                 />
//               </div>
//               <div>
//                 <label htmlFor="role" className="sr-only">Role</label>
//                 <select
//                   id="role"
//                   name="role"
//                   value={formData.role}
//                   onChange={handleChange}
//                   required
//                   className="appearance-none block w-full px-3 py-2 border border-gray-300 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                 >
//                   <option value="" disabled>Select your role</option>
//                   <option value="job-seeker">Job Seeker</option>
//                   <option value="employer">Employer</option>
//                   <option value="employee">Employee</option>
//                 </select>
//               </div>
//             </div>

//             <div className="flex items-center">
//               <input
//                 id="terms-and-conditions"
//                 name="terms-and-conditions"
//                 type="checkbox"
//                 className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
//                 required
//               />
//               <label htmlFor="terms-and-conditions" className="ml-2 block text-sm text-gray-900">
//                 I agree to the <a href="#" className="text-indigo-600 hover:text-indigo-500">Terms and Conditions</a>
//               </label>
//             </div>

//             <div>
//               <button
//                 type="submit"
//                 className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//               >
//                 Sign Up
//               </button>
//             </div>
//             <h2 className='text-center'>Already have an account?<span className='ml-5 font-bold hover:text-blue-500'><Link to="/login">LogIn</Link></span></h2>
//           </form>

//           <div className="text-center">
//             <div className="relative flex py-5 items-center">
//               <div className="flex-grow border-t border-gray-300"></div>
//               <span className="flex-shrink mx-4 text-gray-400">OR</span>
//               <div className="flex-grow border-t border-gray-300"></div>
//             </div>
//             <button
//               className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
//             >
//               <span className="sr-only">Sign up with Google</span>
//               <span>Sign Up with Google</span>
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignUp;
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

axios.defaults.withCredentials = true;

const SignUp = () => {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        profilePhoto: '',
        name: '',
        age: '',
        dob: '',
        email: '',
        password: '',
        phone: '',
        education: '',
        stream: '',
        companyName: '',
        designation: '',
        years: '',
        skills: '',
        hobbies: '',
        drinkingOrSmoking: '',
        height: '',
        weight: '',
        role: ''
    });

    const [profilePhotoPreview, setProfilePhotoPreview] = useState(null);
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};
        const {
            name, email, password, phone, education, stream,
            companyName, designation, years, skills, hobbies,
            drinkingOrSmoking, height, weight, dob, role
        } = values;

        // Name validation
        if (!name) newErrors.name = 'Name is required';
        
        // Email validation
        if (!email) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email is invalid';

        // Password validation
        if (!password) newErrors.password = 'Password is required';
        else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';

        // Phone validation
        if (!phone) newErrors.phone = 'Phone number is required';
        else if (!/^\d{10}$/.test(phone)) newErrors.phone = 'Phone number must be 10 digits';

        // Education validation
        if (!education) newErrors.education = 'Education is required';

        // Stream validation
        if (!stream) newErrors.stream = 'Stream is required';

        // Company Name validation
        if (!companyName) newErrors.companyName = 'Company Name is required';

        // Designation validation
        if (!designation) newErrors.designation = 'Designation is required';

        // Years of Experience validation
        if (!years) newErrors.years = 'Years of Experience is required';
        else if (isNaN(years) || years < 0) newErrors.years = 'Years of Experience must be a positive number';

        // Skills validation
        if (!skills) newErrors.skills = 'Skills are required';

        // Hobbies validation
        if (!hobbies) newErrors.hobbies = 'Hobbies are required';

        // Drinking/Smoking validation
        if (!drinkingOrSmoking) newErrors.drinkingOrSmoking = 'Drinking/Smoking preference is required';

        // Height validation
        if (!height) newErrors.height = 'Height is required';
        else if (isNaN(height) || height <= 0) newErrors.height = 'Height must be a positive number';

        // Weight validation
        if (!weight) newErrors.weight = 'Weight is required';
        else if (isNaN(weight) || weight <= 0) newErrors.weight = 'Weight must be a positive number';

        // Date of Birth validation
        if (!dob) newErrors.dob = 'Date of Birth is required';

        // Role validation
        if (!role) newErrors.role = 'Role is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'profilePhoto' && files[0]) {
            setValues({ ...values, profilePhoto: files[0] });
            setProfilePhotoPreview(URL.createObjectURL(files[0]));
        } else {
            setValues({ ...values, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            await sendData();
            toast.success(`Role selected: ${values.role}`);
            navigate("/login");
            setTimeout(() => {
                window.location.reload();
            }, 4000);
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    const sendData = async () => {
        const {
            name, email, password, phone, education, stream,
            companyName, designation, years, skills, hobbies,
            drinkingOrSmoking, height, weight, dob, role
        } = values;

        const formData = new FormData();
        formData.append('profilePhoto', values.profilePhoto);
        formData.append('name', name);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('phone', phone);
        formData.append('education', education);
        formData.append('stream', stream);
        formData.append('companyName', companyName);
        formData.append('designation', designation);
        formData.append('years', years);
        formData.append('skills', skills);
        formData.append('hobbies', hobbies);
        formData.append('drinkingOrSmoking', drinkingOrSmoking);
        formData.append('height', height);
        formData.append('weight', weight);
        formData.append('dob', dob);
        formData.append('role', role);

        const res = await axios.post("http://localhost:8070/auth/", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        return res.data;
    };

    return (
        <section>
            <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
                <form className="w-full max-w-3xl bg-white shadow-md rounded-lg p-6" onSubmit={handleSubmit}>
                    <h2 className="text-2xl font-semibold mb-4">Profile Form</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="col-span-2 md:col-span-1">
                            <label className="block text-gray-700 font-semibold mb-2">Profile Photo</label>
                            <input
                                type="file"
                                name="profilePhoto"
                                accept="image/*"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                onChange={handleChange}
                            />
                            {profilePhotoPreview && (
                                <img
                                    src={profilePhotoPreview}
                                    alt="Profile Preview"
                                    className="mt-4 w-24 h-24 rounded-full object-cover"
                                />
                            )}
                        </div>

                        <div>
                            <label className="block text-gray-700 font-semibold mb-2">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={values.name}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            />
                            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                        </div>
                        <div>
                            <label className="block text-gray-700 font-semibold mb-2">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={values.email}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            />
                            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                        </div>

                        <div>
                            <label className="block text-gray-700 font-semibold mb-2">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={values.password}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            />
                            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                        </div>

                        <div>
                            <label className="block text-gray-700 font-semibold mb-2">Phone Number</label>
                            <input
                                type="number"
                                name="phone"
                                value={values.phone}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            />
                            {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                        </div>

                        <div>
                            <label className="block text-gray-700 font-semibold mb-2">Age</label>
                            <input
                                type="number"
                                name="age"
                                value={values.age}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-semibold mb-2">Date of Birth</label>
                            <input
                                type="date"
                                name="dob"
                                value={values.dob}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            />
                            {errors.dob && <p className="text-red-500 text-sm">{errors.dob}</p>}
                        </div>

                        <div>
                            <label className="block text-gray-700 font-semibold mb-2">Education</label>
                            <select
                                name="education"
                                value={values.education}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            >
                                <option value="">Select Education</option>
                                <option value="10th">10th</option>
                                <option value="12th">12th</option>
                                <option value="Graduate">Graduate</option>
                                <option value="Post Graduate">Post Graduate</option>
                                <option value="Other">Other</option>
                            </select>
                            {errors.education && <p className="text-red-500 text-sm">{errors.education}</p>}
                        </div>

                        <div>
                            <label className="block text-gray-700 font-semibold mb-2">Stream</label>
                            <input
                                type="text"
                                name="stream"
                                value={values.stream}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            />
                            {errors.stream && <p className="text-red-500 text-sm">{errors.stream}</p>}
                        </div>

                        <div>
                            <label className="block text-gray-700 font-semibold mb-2">Company Name</label>
                            <input
                                type="text"
                                name="companyName"
                                value={values.companyName}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            />
                            {errors.companyName && <p className="text-red-500 text-sm">{errors.companyName}</p>}
                        </div>

                        <div>
                            <label className="block text-gray-700 font-semibold mb-2">Designation</label>
                            <input
                                type="text"
                                name="designation"
                                value={values.designation}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            />
                            {errors.designation && <p className="text-red-500 text-sm">{errors.designation}</p>}
                        </div>

                        <div>
                            <label className="block text-gray-700 font-semibold mb-2">Years of Experience</label>
                            <input
                                type="number"
                                name="years"
                                value={values.years}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            />
                            {errors.years && <p className="text-red-500 text-sm">{errors.years}</p>}
                        </div>

                        <div>
                            <label className="block text-gray-700 font-semibold mb-2">Skills</label>
                            <input
                                type="text"
                                name="skills"
                                value={values.skills}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            />
                            {errors.skills && <p className="text-red-500 text-sm">{errors.skills}</p>}
                        </div>

                        <div>
                            <label className="block text-gray-700 font-semibold mb-2">Hobbies</label>
                            <input
                                type="text"
                                name="hobbies"
                                value={values.hobbies}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            />
                            {errors.hobbies && <p className="text-red-500 text-sm">{errors.hobbies}</p>}
                        </div>

                        <div>
                            <label className="block text-gray-700 font-semibold mb-2">Drinking or Smoking</label>
                            <select
                                name="drinkingOrSmoking"
                                value={values.drinkingOrSmoking}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            >
                                <option value="">Select Option</option>
                                <option value="Drinking">Drinking</option>
                                <option value="Smoking">Smoking</option>
                                <option value="Rarely Smoking">Rarely Smoking</option>
                                <option value="Rarely Drinking">Rarely Drinking</option>
                                <option value="None">None</option>
                            </select>
                            {errors.drinkingOrSmoking && <p className="text-red-500 text-sm">{errors.drinkingOrSmoking}</p>}
                        </div>

                        <div>
                            <label className="block text-gray-700 font-semibold mb-2">Height</label>
                            <input
                                type="number"
                                name="height"
                                value={values.height}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            />
                            {errors.height && <p className="text-red-500 text-sm">{errors.height}</p>}
                        </div>

                        <div>
                            <label className="block text-gray-700 font-semibold mb-2">Weight</label>
                            <input
                                type="number"
                                name="weight"
                                value={values.weight}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            />
                            {errors.weight && <p className="text-red-500 text-sm">{errors.weight}</p>}
                        </div>

                        <div>
                            <label className="block text-gray-700 font-semibold mb-2">Role</label>
                            <select
                                name="role"
                                value={values.role}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            >
                                <option value="">Select Role</option>
                                <option value="Job Seeker">Job Seeker</option>
                                <option value="Employee">Employee</option>
                                <option value="Employer">Employer</option>
                            </select>
                            {errors.role && <p className="text-red-500 text-sm">{errors.role}</p>}
                        </div>
                    </div>

                    <div className="mt-6 flex justify-between items-center">
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                            Submit
                        </button>
                        <Link to="/login" className="text-blue-500 hover:underline">Already have an account? Login</Link>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default SignUp;
