// Importing necessary CSS file for styling
import "../css/ForgotPassword.css";

// Importing React and necessary hooks from 'react'
import React, { useState } from 'react';

// Importing axios for making HTTP requests
import axios from 'axios';

// Importing hook from 'react-router-dom' for navigation
import { useNavigate } from 'react-router-dom';

// Defining the ForgotPassword component
const ForgotPassword = () => {
  // State hooks for managing form inputs and messages
  const [email, setEmail] = useState(''); // State for email input
  const [errors, setErrors] = useState({}); // State for form validation errors
  const [message, setMessage] = useState(''); // State for success message
  const [error, setError] = useState(''); // State for error message

  // Hook for navigation
  const navigate = useNavigate();

  // Function to validate the form inputs
  const validateForm = () => {
    const newErrors = {};

    // Check if email is provided and is valid
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Invalid email address';
    }

    // Update the errors state
    setErrors(newErrors);

    // Return true if no errors, false otherwise
    return Object.keys(newErrors).length === 0;
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Validate the form inputs
    if (!validateForm()) return; // Stop if validation fails

    try {
      // Make a POST request to request a password reset
      const response = await axios.post('/api/auth/forgot-password', { email });

      // Update the success message state
      setMessage(response.data.message);

      // Clear any error message
      setError('');

      // Redirect to login page after successful request
      navigate('/login');
    } catch (err) {
      // Update the error message state
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  // JSX to render the forgot password form
  return (
    <div className="forgot-password-container">
      <h2>Forgot Password</h2>
      {message && <div className="success-message">{message}</div>} {/* Display success message if present */}
      {error && <div className="error-message">{error}</div>} {/* Display error message if present */}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Update email state on input change
            placeholder="Enter your email"
          />
          {errors.email && <div className="error">{errors.email}</div>} {/* Display email error if present */}
        </div>
        <button type="submit">Submit</button> {/* Submit button */}
      </form>
      <div className="text-center mt-3">
        Remember your password? <a href="/login">Login here</a> {/* Link to login page */}
      </div>
    </div>
  );
};

// Exporting the ForgotPassword component as default
export default ForgotPassword;