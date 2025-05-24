import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddExpenseButton from '../components/AddExpenseButton';
import './Expenses.css';

const Expenses = () => {
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [totalExpenses, setTotalExpenses] = useState(0);

    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                const userId = localStorage.getItem('userId');
                console.log('Fetching expenses for user:', userId);
                
                if (!userId) {
                    throw new Error('User not logged in');
                }

                const response = await axios.get(`http://localhost:5001/api/expenses/${userId}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                });
                
                console.log('Received expenses:', response.data);
                
                if (Array.isArray(response.data)) {
                    setExpenses(response.data);
                    const total = response.data.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);
                    setTotalExpenses(total);
                } else {
                    console.error('Unexpected response format:', response.data);
                    setError('Invalid data format received from server');
                }
                
                setLoading(false);
            } catch (err) {
                console.error('Error fetching expenses:', err);
                setError(err.response?.data?.message || err.message || 'Failed to fetch expenses');
                setLoading(false);
            }
        };

        fetchExpenses();
    }, []);

    const formatDate = (dateString) => {
        if (!dateString) return 'No date';
        
        try {
            // Parse the date string and create a new Date object
            const date = new Date(dateString);
            
            // Check if the date is valid
            if (isNaN(date.getTime())) {
                console.error('Invalid date:', dateString);
                return 'Invalid date';
            }

            // Format the date in Indian format
            return date.toLocaleDateString('en-IN', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        } catch (err) {
            console.error('Error formatting date:', err);
            return 'Invalid date';
        }
    };

    const formatAmount = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR'
        }).format(amount);
    };

    if (loading) {
        return (
            <div className="expenses-container">
                <div className="loading-spinner"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="expenses-container">
                <div className="error-message">{error}</div>
            </div>
        );
    }

    return (
        <div className="expenses-container">
            <div className="expenses-header">
                <h2>Your Expenses</h2>
                <div className="total-expenses">
                    Total: <span className="total-amount">{formatAmount(totalExpenses)}</span>
                </div>
            </div>

            {expenses.length === 0 ? (
                <div className="no-expenses">
                    <p>No expenses found. Start adding some!</p>
                </div>
            ) : (
                <div className="expenses-grid">
                    {expenses.map((expense) => (
                        <div key={expense.id} className="expense-card">
                            <div className="expense-header">
                                <h3>{expense.description}</h3>
                                <span className="expense-amount">{formatAmount(expense.amount)}</span>
                            </div>
                            <div className="expense-details">
                                <div className="expense-info">
                                    <p className="expense-category">{expense.category}</p>
                                    <p className="expense-account">{expense.account}</p>
                                </div>
                                <p className="expense-date">{formatDate(expense.transaction_date)}</p>
                            </div>
                            {expense.note && (
                                <p className="expense-note">{expense.note}</p>
                            )}
                        </div>
                    ))}
                </div>
            )}

            <AddExpenseButton />
        </div>
    );
};

export default Expenses; 