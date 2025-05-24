import { Link } from 'react-router-dom';
import './HomeNavbar.css';

const HomeNavbar = () => {
  return (
    <nav className="home-navbar">
      <div className="home-navbar-brand">
        <h1 className="home-navbar-title">Trackify</h1>
      </div>
      
      <div className="home-navbar-actions">
        <Link to="/login" className="home-navbar-link">Login</Link>
        <Link to="/register" className="home-navbar-button">Sign Up</Link>
      </div>
    </nav>
  );
};

export default HomeNavbar; 