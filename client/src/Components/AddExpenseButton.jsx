import { useNavigate } from 'react-router-dom';
import './AddExpenseButton.css';

const AddExpenseButton = () => {
    const navigate = useNavigate();

    return (
        <button 
            className="add-expense-button"
            onClick={() => navigate('/add-expense')}
        >
            <span className="plus-icon">+</span>
            <span className="button-text">Add Expense</span>
        </button>
    );
};

export default AddExpenseButton; 