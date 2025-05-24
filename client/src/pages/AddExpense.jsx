import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AddExpense.css';

const AddExpense = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        amount: '',
        category: '',
        description: '',
        transaction_date: '',
        account: '',
        note: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    // Set default date to current date
    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];
        setFormData(prev => ({
            ...prev,
            transaction_date: today
        }));
    }, []);

    const categories = [
        'Food',
        'Transportation',
        'Utilities',
        'Shopping',
        'Entertainment',
        'Education',
        'Health',
        'Others'
    ];

    const accounts = [
        'Cash',
        'UPI',

        'Credit Card',
        'Debit Card',
        'Others'
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleCategorySelect = (category) => {
        setFormData(prev => ({
            ...prev,
            category
        }));
    };

    const handleAccountSelect = (account) => {
        setFormData(prev => ({
            ...prev,
            account
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        setSuccess(false);

        try {
            const userId = localStorage.getItem('userId');
            if (!userId) {
                throw new Error('User not logged in');
            }

            const response = await axios.post('http://localhost:5001/api/expenses', {
                ...formData,
                user_id: userId
            });

            if (response.data) {
                setSuccess(true);
                setFormData({
                    amount: '',
                    category: '',
                    description: '',
                    transaction_date: '',
                    account: '',
                    note: ''
                });
                setTimeout(() => {
                    navigate('/expenses');
                }, 1500);
            }
        } catch (err) {
            console.error('Error adding expense:', err);
            setError(err.response?.data?.message || 'Failed to add expense');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="add-expense-container">
            <div className="add-expense-card">
                <div className="add-expense-header">
                    <h1>Add New Expense</h1>
                    <p className="subtitle">Track your spending with ease</p>
                </div>

                {error && <div className="error-message">{error}</div>}
                {success && <div className="success-message">Expense added successfully!</div>}

                <form onSubmit={handleSubmit} className="expense-form">
                    <div className="form-main">
                        <div className="form-left">
                            <div className="form-group date-group">
                                <label htmlFor="transaction_date">Date</label>
                                <input
                                    type="date"
                                    id="transaction_date"
                                    name="transaction_date"
                                    value={formData.transaction_date}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group amount-group">
                                <label htmlFor="amount">Amount</label>
                                <div className="amount-input-wrapper">
                                    <span className="currency-symbol">₹</span>
                                    <input
                                        type="number"
                                        id="amount"
                                        name="amount"
                                        value={formData.amount}
                                        onChange={handleChange}
                                        placeholder="0.00"
                                        required
                                        min="0"
                                        step="0.01"
                                    />
                                </div>
                            </div>

                            <div className="form-group description-group">
                                <label htmlFor="description">Description</label>
                                <input
                                    type="text"
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    placeholder="What was this expense for?"
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-right">
                            <div className="form-group categories-group">
                                <label>Category</label>
                                <div className="selection-grid">
                                    {categories.map(category => (
                                        <div
                                            key={category}
                                            className={`selection-box ${formData.category === category ? 'selected' : ''}`}
                                            onClick={() => handleCategorySelect(category)}
                                        >
                                            {category}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="form-group accounts-group">
                                <label>Account</label>
                                <div className="selection-grid">
                                    {accounts.map(account => (
                                        <div
                                            key={account}
                                            className={`selection-box ${formData.account === account ? 'selected' : ''}`}
                                            onClick={() => handleAccountSelect(account)}
                                        >
                                            {account}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="form-group note-group">
                                <label htmlFor="note">Note (Optional)</label>
                                <textarea
                                    id="note"
                                    name="note"
                                    value={formData.note}
                                    onChange={handleChange}
                                    placeholder="Add any additional details..."
                                    rows="2"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="form-actions">
                        <button 
                            type="button" 
                            className="cancel-button"
                            onClick={() => navigate('/expenses')}
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit" 
                            className="submit-button"
                            disabled={loading}
                        >
                            {loading ? 'Adding...' : 'Add Expense'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddExpense; 