import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  HomeIcon,
  CurrencyDollarIcon,
  PlusCircleIcon,
  DocumentTextIcon,
  Cog6ToothIcon,
  Bars3Icon,ChartBarSquareIcon
} from '@heroicons/react/24/outline';
import './Sidebar.css';

const Sidebar = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(true);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const menuItems = [
    // {
    //     title : 'Home',
    //     path : '/',
    //     icon : <HomeIcon className='sidebar-icon'/>
    // },
    {
      title: 'Dashboard',
      path: '/dashboard',
      icon: <ChartBarSquareIcon className="sidebar-icon" />
    },
    {
      title: 'Expenses',
      path: '/expenses',
      icon: <CurrencyDollarIcon className="sidebar-icon" />
    },
    {
      title: 'Add Expense',
      path: '/add-expense',
      icon: <PlusCircleIcon className="sidebar-icon" />
    },
    {
      title: 'OCR Upload',
      path: '/ocr-upload',
      icon: <DocumentTextIcon className="sidebar-icon" />
    },
    {
      title: 'Settings',
      path: '/settings',
      icon: <Cog6ToothIcon className="sidebar-icon" />
    }
  ];

  return (
    <div className={`sidebar ${collapsed ? 'sidebar-collapsed' : ''}`}>
      <div className="sidebar-header">
        {!collapsed && <h2 className="sidebar-title">ExpenseTracker</h2>}
        <button className="sidebar-toggle" onClick={toggleSidebar}>
          {collapsed ? 
            <Bars3Icon className="sidebar-icon" /> : 
            <Bars3Icon className="sidebar-icon" />
          }
        </button>
      </div>

      <nav className="sidebar-nav">
        <ul className="sidebar-menu">
          {menuItems.map((item) => (
            <li key={item.path} className="sidebar-menu-item">
              <Link 
                to={item.path} 
                className={`sidebar-link ${location.pathname === item.path ? 'sidebar-link-active' : ''}`}
              >
                {item.icon}
                {!collapsed && <span className="sidebar-link-text">{item.title}</span>}
              </Link>
            </li>   
          ))}
        </ul>
      </nav>

      <div className="sidebar-footer">
        {(
          <div className="sidebar-status">
            <p className="sidebar-status-text">v1.0.0</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar; 