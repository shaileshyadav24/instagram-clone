// Importing necessary CSS file for styling
import "../css/ResetPassword.css";

// Importing React and necessary hooks from 'react'
import React, { useState } from 'react';

// Importing axios for making HTTP requests
import { makeResetPasswordRequest } from "../services/AuthService";

// Importing hooks from 'react-router-dom' for navigation and accessing URL parameters
import { useNavigate, useParams } from 'react-router-dom';

// Defining the ResetPassword component
const ResetPassword = () => {
  // State hooks for managing form inputs and messages
  const [password, setPassword] = useState(''); // State for new password
  const [confirmPassword, setConfirmPassword] = useState(''); // State for confirming new password
  const [errors, setErrors] = useState({}); // State for form validation errors
  const [message, setMessage] = useState(''); // State for success message
  const [error, setError] = useState(''); // State for error message

  // Hook for navigation
  const navigate = useNavigate();

  // Hook for accessing URL parameters
  const { token } = useParams(); // Get the reset token from the URL

  // Function to validate the form inputs
  const validateForm = () => {
    const newErrors = {};

    // Check if password is provided and meets length requirement
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    // Check if password and confirm password match
    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
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
      // Make a POST request to reset the password
      const response = await makeResetPasswordRequest(token, password);

      // Update the success message state
      setMessage(response.data.message);

      // Clear any error message
      setError('');

      // Redirect to login page after successful reset
      navigate('/login');
    } catch (err) {
      // Update the error message state
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  // JSX to render the reset password form
  return (
    <div className="reset-password-container">
      <h2>Reset Password</h2>
      {message && <div className="success-message">{message}</div>} {/* Display success message if present */}
      {error && <div className="error-message">{error}</div>} {/* Display error message if present */}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="password">New Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Update password state on input change
            placeholder="Enter new password"
          />
          {errors.password && <div className="error">{errors.password}</div>} {/* Display password error if present */}
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)} // Update confirmPassword state on input change
            placeholder="Confirm new password"
          />
          {errors.confirmPassword && (
            <div className="error">{errors.confirmPassword}</div> /* Display confirmPassword error if present */
          )}
        </div>
        <button type="submit">Reset Password</button> {/* Submit button */}
      </form>
      <div className="text-center mt-3">
        Remember your password? <a href="/login">Login here</a> {/* Link to login page */}
      </div>
    </div>
  );
};

// Exporting the ResetPassword component as default
export default ResetPassword;