// Importing the CSS file for styling the component
import "../css/Registration.css";

// Importing necessary modules from React and other libraries
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { makeRegisterRequest } from "../services/AuthService";

// Defining the Registration component
const Registration = () => {
  // useState hook to manage form data state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  // useState hook to manage form validation errors
  const [errors, setErrors] = useState({});

  // useState hook to manage success message
  const [message, setMessage] = useState('');

  // useState hook to manage error message
  const [error, setError] = useState('');

  // useNavigate hook to programmatically navigate to different routes
  const navigate = useNavigate();

  // Function to handle input changes and update form data state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Function to validate the form data
  const validateForm = () => {
    const newErrors = {};

    // Check if name is provided
    if (!formData.name) newErrors.name = 'Name is required';

    // Check if email is provided and valid
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }

    // Check if password is provided and meets length requirement
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // Update errors state
    setErrors(newErrors);

    // Return true if no errors, false otherwise
    return Object.keys(newErrors).length === 0;
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Validate form data and stop if validation fails
    if (!validateForm()) return;

    try {
      // Send POST request to register the user
      const response = await makeRegisterRequest(formData);

      // Set success message and clear error message
      setMessage(response.data.message);
      setError('');

      // Navigate to login page after successful registration
      navigate('/login');
    } catch (err) {
      // Set error message if registration fails
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  // Render the registration form
  return (
    <div className="registration-container">
      <h2>Register</h2>
      {message && <div className="success-message">{message}</div>}
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
          />
          {errors.name && <div className="error">{errors.name}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
          {errors.email && <div className="error">{errors.email}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
          />
          {errors.password && <div className="error">{errors.password}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm your password"
          />
          {errors.confirmPassword && (
            <div className="error">{errors.confirmPassword}</div>
          )}
        </div>
        <button type="submit">Register</button>
      </form>
      <div className="text-center mt-3">
        Already have an account? <a href="/login">Login here</a>
      </div>
    </div>
  );
};

// Exporting the Registration component as default
export default Registration;