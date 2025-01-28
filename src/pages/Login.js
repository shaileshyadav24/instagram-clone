// Importing the CSS file for styling the Login component
import "../css/Login.css";

// Importing necessary modules from React and other libraries
import React, { useState } from 'react';
import { makeLoginRequest } from "../services/AuthService";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess, loginStart } from '../store/slices/auth';

// Defining the Login component
const Login = () => {
  // Defining state variables for email, password, errors, message, and error
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  // Using the useNavigate hook to programmatically navigate to different routes
  const navigate = useNavigate();

  // Function to validate the form inputs
  const validateForm = () => {
    const newErrors = {};

    // Checking if email is provided and valid
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Invalid email address';
    }

    // Checking if password is provided
    if (!password) {
      newErrors.password = 'Password is required';
    }

    // Setting the errors state with the new errors
    setErrors(newErrors);

    // Returning true if there are no errors, false otherwise
    return Object.keys(newErrors).length === 0;
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Preventing the default form submission behavior

    // Validating the form and stopping if validation fails
    if (!validateForm()) return;
    dispatch(loginStart());
    try {
      // Sending a POST request to the login API with email and password
      const response = await makeLoginRequest(email, password);

      // Setting the success message and clearing any error messages
      setMessage(response.data.message);
      setError('');
      // Dispatching the login action to update the Redux store
      dispatch(loginSuccess(response.data.user));
      // Saving the received token to localStorage
      localStorage.setItem('token', response.data.token);

      // Navigating to the dashboard after successful login
      navigate('/dashboard');
    } catch (err) {
      // Setting the error message if the request fails
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  // Returning the JSX to render the Login component
  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
          {errors.email && <div className="error">{errors.email}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
          {errors.password && <div className="error">{errors.password}</div>}
        </div>
        {message && <div className="success-message">{message}</div>}
        {error && <div className="error-message">{error}</div>}
        <button type="submit">Login</button>
      </form>
      <div className="text-center mt-3">
        Don't have an account? <a href="/registration">Register here</a>
      </div>
      <div className="text-center mt-3">
        Forgot your password? <a href="/forgot-password">Reset it here</a>
      </div>
    </div>
  );
};

// Exporting the Login component as the default export
export default Login;