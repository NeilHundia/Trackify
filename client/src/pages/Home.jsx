import { Link } from 'react-router-dom';
import HomeNavbar from '../components/HomeNavbar';
import './Home.css';

const Home = () => {
  return (
    <>
      <HomeNavbar />
      <div className="home-container">
        <div className="home-content">
          <h1 className="home-title">Trackify</h1>
          
          <div className="home-highlight">
            <h2 className="highlight-text">Take control of your finances with smart expense tracking</h2>
            <p className="highlight-subtext">
              Track expenses, analyze spending patterns, and achieve your financial goals with our intelligent expense management system.
            </p>
          </div>
          
          <div className="home-features">
            <div className="feature-item">
              <div className="feature-icon manual-icon"></div>
              <h3 className="feature-title">Manual Entry</h3>
              <p className="feature-description">Quickly add and categorize your expenses with our simple interface</p>
            </div>
            
            <div className="feature-item">
              <div className="feature-icon ocr-icon"></div>
              <h3 className="feature-title">OCR Technology</h3>
              <p className="feature-description">Upload UPI payment screenshots and automatically extract expense details</p>
            </div>
            
            <div className="feature-item">
              <div className="feature-icon analytics-icon"></div>
              <h3 className="feature-title">Smart Analytics</h3>
              <p className="feature-description">Visualize your spending patterns with detailed charts and insights</p>
            </div>
          </div>
          
          <div className="home-actions">
            <Link to="/login" className="action-button login-button">
              Login
            </Link>
            <Link to="/register" className="action-button signup-button">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home; 