import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validate = () => {
    let formErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^[0-9]{10}$/;

    if (!emailPattern.test(formData.email)) {
      formErrors.email = 'Invalid email format';
    }

    if (!phonePattern.test(formData.phone)) {
      formErrors.phone = 'Phone number must be exactly 10 digits';
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const response = await axios.post('https://recipe-theta-six.vercel.app/signup', formData,{ withCredentials: true });
        console.log('Success:', response.data);
        navigate('/Login');
      } catch (err) {
        console.error('Error:', err);
      }
    } else {
      console.log('Form not submitted');
    }
  };

  return (
    <div className="signup-container">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        {errors.email && <span className="error">{errors.email}</span>}

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <label htmlFor="phone">Phone Number:</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        {errors.phone && <span className="error">{errors.phone}</span>}

        <button type="submit">Signup</button>
      </form>

      <style>
        {`
          * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
          }

          body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
              margin: 0;
          }

          .signup-container {
              background-color: #fff;
              padding: 20px;
              border-radius: 10px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              width: 300px;
              text-align: center;
              margin-top: 100px;
          }

          .signup-container h2 {
              margin-bottom: 20px;
          }

          .signup-container label {
              display: block;
              text-align: left;
              margin-bottom: 5px;
              font-weight: bold;
          }

          .signup-container input {
              width: 100%;
              padding: 10px;
              margin-bottom: 15px;
              border-radius: 5px;
              border: 1px solid #ccc;
              font-size: 16px;
          }

          .signup-container button {
              width: 100%;
              padding: 10px;
              background-color: #4CAF50;
              color: white;
              border: none;
              border-radius: 5px;
              font-size: 16px;
              cursor: pointer;
          }

          .signup-container button:hover {
              background-color: #45a049;
          }

          .error {
              color: red;
              font-size: 12px;
              margin-top: -10px;
              margin-bottom: 10px;
          }
        `}
      </style>
    </div>
  );
};

export default SignUp;
