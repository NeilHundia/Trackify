import { useState, useEffect } from 'react';
import axios from 'axios';
import AddExpenseButton from '../components/AddExpenseButton';
import './Dashboard.css';

const Dashboard = () => {
  const [summary, setSummary] = useState({
    totalSpent: 0,
    thisMonth: 0,
    thisWeek: 0,
    categories: []
  });
  const [recentExpenses, setRecentExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const userId = localStorage.getItem('userId');
        if (!userId) {
          throw new Error('User not logged in');
        }

        const response = await axios.get(`http://localhost:5001/api/expenses/${userId}`);
        const expenses = response.data;

        // Calculate total spent
        const totalSpent = expenses.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);

        // Calculate this month's expenses
        const now = new Date();
        const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const thisMonthExpenses = expenses.filter(expense => 
          new Date(expense.transaction_date) >= firstDayOfMonth
        );
        const thisMonth = thisMonthExpenses.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);

        // Calculate this week's expenses
        const firstDayOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
        const thisWeekExpenses = expenses.filter(expense => 
          new Date(expense.transaction_date) >= firstDayOfWeek
        );
        const thisWeek = thisWeekExpenses.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);

        // Calculate category totals
        const categoryTotals = expenses.reduce((acc, expense) => {
          const category = expense.category;
          if (!acc[category]) {
            acc[category] = 0;
          }
          acc[category] += parseFloat(expense.amount);
          return acc;
        }, {});

        // Convert category totals to array and sort by amount
        const categories = Object.entries(categoryTotals)
          .map(([name, amount]) => ({
            name,
            amount,
            color: getCategoryColor(name)
          }))
          .sort((a, b) => b.amount - a.amount)
          .slice(0, 5); // Get top 5 categories

        // Get recent expenses (last 3)
        const sortedExpenses = [...expenses]
          .sort((a, b) => new Date(b.transaction_date) - new Date(a.transaction_date))
          .slice(0, 3);

        setSummary({
          totalSpent,
          thisMonth,
          thisWeek,
          categories
        });
        setRecentExpenses(sortedExpenses);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching expenses:', err);
        setError(err.response?.data?.message || 'Failed to fetch expenses');
        setLoading(false);
      }
    };

    fetchExpenses();
  }, []);

  const getCategoryColor = (category) => {
    const colors = {
      'Food & Dining': '#4f46e5',
      'Transportation': '#06b6d4',
      'Shopping': '#ef4444',
      'Entertainment': '#10b981',
      'Bills & Utilities': '#f59e0b',
      'Health & Medical': '#ec4899',
      'Travel': '#8b5cf6',
      'Education': '#14b8a6',
      'Personal Care': '#f97316',
      'Others': '#6b7280'
    };
    return colors[category] || '#6b7280';
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-IN', {
        month: 'short',
        day: 'numeric'
      });
    }
  };

  if (loading) {
    return (
      <div className="dashboard">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard">
        <div className="error-message">{error}</div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Dashboard</h1>
        <AddExpenseButton />
      </div>
      
      <div className="dashboard-content">
        <div className="summary-cards">
          <div className="summary-card">
            <h3 className="summary-card-title">Total Spent</h3>
            <p className="summary-card-value">{formatCurrency(summary.totalSpent)}</p>
          </div>
          
          <div className="summary-card">
            <h3 className="summary-card-title">This Month</h3>
            <p className="summary-card-value">{formatCurrency(summary.thisMonth)}</p>
          </div>
          
          <div className="summary-card">
            <h3 className="summary-card-title">This Week</h3>
            <p className="summary-card-value">{formatCurrency(summary.thisWeek)}</p>
          </div>
        </div>

        <div className="dashboard-section">
          <h2 className="section-title">Spending by Category</h2>
          <div className="categories-container">
            {summary.categories.map((category, index) => (
              <div key={index} className="category-item">
                <div className="category-info">
                  <div 
                    className="category-color" 
                    style={{ backgroundColor: category.color }}
                  ></div>
                  <span className="category-name">{category.name}</span>
                </div>
                <span className="category-amount">{formatCurrency(category.amount)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="dashboard-section">
          <h2 className="section-title">Recent Expenses</h2>
          <div className="recent-expenses">
            {recentExpenses.map((expense, index) => (
              <div key={index} className="expense-item">
                <div className="expense-details">
                  <span className="expense-name">{expense.description}</span>
                  <div className="expense-info">
                    <span className="expense-date">{formatDate(expense.transaction_date)}</span>
                    <span className="expense-account">{expense.account}</span>
                  </div>
                </div>
                <span className="expense-amount">-{formatCurrency(expense.amount)}</span>
              </div>
            ))}
            {recentExpenses.length === 0 && (
              <div className="no-expenses">
                <p>No expenses found. Start adding some!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 