import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import AddExpense from './pages/AddExpense'
import Expenses from './pages/Expenses'
// import OCRUpload from './pages/OCRUpload'
// import Settings from './pages/Settings'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import './App.css'

// Layout wrapper component
const AppLayout = ({ children, showSidebar = true }) => {
  return (
    <div className={`flex ${!showSidebar ? 'no-sidebar' : ''}`}>
      {showSidebar && <Sidebar />}
      <div className="app-content">
        <Navbar />
        <main className="container p-4">
          {children}
        </main>
      </div>
    </div>
  );
};

// Router observer to determine current route
const AppContent = ({ isAuthenticated, setIsAuthenticated }) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  if (!isAuthenticated) {
    return (
      <div className="full-page-layout">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        </Routes>
      </div>
    );
  }

  return (
    <>
      {isHomePage ? (
        <div className="full-page-layout">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      ) : (
        <AppLayout>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/add-expense" element={<AddExpense />} />
            <Route path="/expenses" element={<Expenses />} />
            {/* <Route path="/ocr-upload" element={<OCRUpload />} />
            <Route path="/settings" element={<Settings />} /> */}
          </Routes>
        </AppLayout>
      )}
    </>
  );
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Check if user is authenticated on initial load
  useEffect(() => {
    // This would normally check for a valid token in localStorage or cookies
    const token = localStorage.getItem('token');
    if (token) {
      // Validate token with backend
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <div className="app">
      <Router>
        <AppContent isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
      </Router>
    </div>
  );
}

export default App
