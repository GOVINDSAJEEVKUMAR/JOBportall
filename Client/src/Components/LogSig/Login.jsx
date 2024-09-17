import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { userAuth } from '../../Conetxt/userAuth'; // assuming you have a context for authentication

const Login = () => {
  const { setToken, setUser, token } = userAuth(); // pulling from Auth context
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (token) {
      // Redirect the user based on their role or default to another page if logged in
      navigate('/login'); // Change to the appropriate page after successful login
    }
  }, [token, navigate]);

  // State for email and password
  const [value, setValue] = useState({
    email: '',
    password: ''
  });

  // Handle input changes
  const handleChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const login = await axios.post('http://localhost:8070/auth/login', value, { withCredentials: true });
      const response = login.data;

      if (response.success) {
        toast.success(response.message);

        // Set the token and user details in the context
        setToken(response.data.token);
        setUser(response.data.user);

        // Redirect based on user role
        const role = response.data.user.role;
        if (role === 'jobseeker') {
          navigate('/job');
        } else if (role === 'Employee') {
          navigate('/inbox');
        } else if (role === 'Employer') {
          navigate( `/jobposting`);
        } else {
          navigate('/');
        }
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Right side image section */}
      <div className="hidden md:flex w-full md:w-1/2 bg-cover bg-center" style={{ backgroundImage: "url('https://i.pinimg.com/564x/7d/c0/13/7dc013379e92d317f7df84e8eed4960e.jpg')" }}>
        <div className="flex items-center justify-center w-full h-full bg-black bg-opacity-50">
          <div className="text-white text-center px-6">
            <h1 className="text-4xl font-bold">Welcome Back!</h1>
            <p className="mt-4">Login to continue your journey with us</p>
          </div>
        </div>
      </div>

      {/* Left side login form section */}
      <div className="flex items-center justify-center w-full md:w-1/2 p-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h3 className="text-xl text-center">Log In</h3>
            <p className="text-center text-gray-600">Enter your credentials to access your account.</p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-5">
              <div>
                <label htmlFor="email-address" className="sr-only">Email address</label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={value.email}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={value.password}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-900 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Log In
              </button>
            </div>
            <h2 className='text-center'>Don't have an account?<span className='ml-5 font-bold hover:text-blue-500'><Link to="/sign">Sign In</Link></span></h2>
          </form>

          <div className="text-center">
            <div className="relative flex py-5 items-center">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="flex-shrink mx-4 text-gray-400">OR</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>
            <button
              className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <span>Log In with Google</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
