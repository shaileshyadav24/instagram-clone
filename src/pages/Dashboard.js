import "../css/Dashboard.css";
import React, { useEffect, useState } from 'react';
import { validateUserToken } from '../services/AuthService';
import { useNavigate } from 'react-router-dom';
import { logout, loginSuccess } from '../store/slices/auth';
import { useDispatch } from 'react-redux';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login'); // Redirect to login if no token is found
          return;
        }

        const response = await validateUserToken(token);
        dispatch(loginSuccess(response.data));
        setUser(response.data);
        setLoading(false);
      } catch (err) {
        dispatch(logout())
        setError(err.response?.data?.message || 'Something went wrong');
        setLoading(false);
        navigate('/login'); // Redirect to login if token is invalid
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleLogout = () => {
    dispatch(logout()); // Dispatch the logout action
    localStorage.removeItem('token'); // Remove token from localStorage
    navigate('/login'); // Redirect to login page
  };

  const goToProfile = () => {
    navigate('/profile');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="dashboard-container">
      <h2>Welcome, <a onClick={goToProfile}>{user?.name}!</a></h2>
      <p>Email: {user?.email}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;