import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
const img = require("../../assects/logo.jpeg")

const Login = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://digitalflakeassignment-backend.onrender.com/api/users/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', data.userId);
        alert('Login Successfull')
        navigate('/home');
      } else {
        const errorData = await response.json();
        alert(errorData.error); 
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while logging in');
    }
  };

  return (
    <>
      <div className="flex justify-center min-h-screen bg-gray-100">
        <div className="px-8 py-6 mx-4 text-left bg-white shadow-lg md:w-1/3 lg:w-1/4 sm:w-1/3 h-3/4 mt-28">
          <div className="flex justify-center">
           
            <img className='login-image' src={img}/>
          </div>
          <p className="text-2xl text-center font-bold"><span className='digital-name'>digital</span>flake</p>
          <form onSubmit={handleSubmit}>
            <div className="mt-4">
              <div className="mt-4">
                <label className="block" htmlFor="email">Email</label>
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-teal-600"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mt-4">
                <label className="block">Password</label>
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-teal-600"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              <div className="flex">
                <div className="mt-6 text-grey-dark">
                  <span className="mr-2">Forget Password</span>
                </div>
              </div>
                <button
                  type='submit'
                  className="w-full px-6 py-2 font-bold mt-4 text-white bg-purple-700 rounded-lg hover:bg-purple-700 transition duration-200"
                >
                  Log In
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
