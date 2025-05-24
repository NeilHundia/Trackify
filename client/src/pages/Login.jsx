import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { authAPI } from '../utils/api';
import axios from 'axios';
import './Auth.css';

const Login = ({ setIsAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiStatus, setApiStatus] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // Check if there's a message from registration
  const registrationMessage = location.state?.message;

  // Check API connection on component mount
  useEffect(() => {
    const testApiConnection = async () => {
      try {
        // Try a direct axios call to the server
        const response = await fetch('http://localhost:5001/api/test-connection', { 
          method: 'OPTIONS',
          mode: 'cors'
        });
        setApiStatus(`API connection: ${response.status}`);
      } catch (err) {
        console.error('API connection test failed:', err);
        setApiStatus(`API connection error: ${err.message}`);
      }
    };
    
    testApiConnection();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Alternative direct approach for debugging
      const response = await axios({
        method: 'post',
        url: 'http://localhost:5001/api/login',
        data: {
          email: formData.email,
          password: formData.password
        },
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      // Store user data and token
      const userData = response.data.user;
      localStorage.setItem('token', 'Bearer ' + userData.id);
      localStorage.setItem('userId', userData.id);
      localStorage.setItem('user', JSON.stringify(userData));
      
      setIsAuthenticated(true);
      navigate('/dashboard');
    } catch (err) {
      console.error('Login error:', err);
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError(`Login failed: ${err.message}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1 className="auth-title">Login</h1>
          <p className="auth-subtitle">Welcome back to ExpenseTracker</p>
          {apiStatus && <p className="api-status">{apiStatus}</p>}
        </div>

        {registrationMessage && (
          <div className="auth-success">
            {registrationMessage}
          </div>
        )}

        {error && <div className="auth-error">{error}</div>}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email ID</label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="form-group-checkbox">
            <div className="remember-me">
              <input 
                id="remember" 
                type="checkbox" 
                className="form-checkbox"
              />
              <label htmlFor="remember" className="checkbox-label">Remember me</label>
            </div>
            <Link to="/forgot-password" className="auth-link">Forgot password?</Link>
          </div>

          <button 
            type="submit" 
            className="auth-button"
            disabled={isLoading}
          >
            {isLoading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <div className="auth-footer">
          <p>Don't have an account? <Link to="/register" className="auth-link">Sign up</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
