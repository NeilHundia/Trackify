import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BellIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import './Navbar.css';

const Navbar = () => {
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    setShowUserMenu(false);
  };

  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
    setShowNotifications(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h1 className="navbar-title">Trackify</h1>
      </div>

      <div className="navbar-menu">
        <div className="navbar-item notification-container">
          <button
            onClick={toggleNotifications}
            className="navbar-icon-btn"
          >
            <BellIcon className="icon" />
            {notifications.length > 0 && (
              <span className="notification-badge">
                {notifications.length}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="dropdown notification-dropdown">
              {notifications.length === 0 ? (
                <p className="notification-empty">No new notifications</p>
              ) : (
                notifications.map((notification, index) => (
                  <div
                    key={index}
                    className="notification-item"
                  >
                    <p className="notification-message">{notification.message}</p>
                    <p className="notification-time">
                      {notification.time}
                    </p>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        <div className="navbar-item user-menu-container">
          <button
            onClick={toggleUserMenu}
            className="navbar-icon-btn"
          >
            <UserCircleIcon className="icon icon-lg" />
          </button>

          {showUserMenu && (
            <div className="dropdown user-dropdown">
              <Link
                to="/profile"
                className="dropdown-item"
              >
                Your Profile
              </Link>
              <Link
                to="/settings"
                className="dropdown-item"
              >
                Settings
              </Link>
              <button
                className="dropdown-item dropdown-btn"
                onClick={() => {
                  // Handle logout logic
                  localStorage.removeItem('token');
                  window.location.href = '/';
                }}
              >
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 