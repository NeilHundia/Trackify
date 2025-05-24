const pool = require("../config/db");
const bcrypt = require("bcrypt");

const registerUser = async (name,email,password)=>{
    const hashedPass = await bcrypt.hash(password,10);
    try{
        const result = await pool.query(
            "INSERT INTO users (name,email,password) VALUES ($1,$2,$3) RETURNING *", [name,email,hashedPass]
        );
        //201 for request successful and resource created
        // res.status(201).json(result.rows[0]);
        return result.rows[0];
    } catch(err){
        //500 for internal server error
        console.log(err);
    }
};

const loginUser = async (email,password) =>{
    try{
        const user = await pool.query("SELECT * FROM users WHERE email=$1",[email]);
        if(user.rows.length==0) return ({error : "User not found"});
        const isMatch = await bcrypt.compare(password, user.rows[0].password);
        if(!isMatch){
            return ({error : "Incorrect password"});
        }
        return user.rows[0];
    } catch(err){
        console.log(err);
    }
}

const addExpense = async(user_id, amount, category, description, transaction_date, account, note) => {
    try {
        const result = await pool.query(
            "INSERT INTO expenses(user_id, amount, category, description, transaction_date, account, note) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
            [user_id, amount, category, description, transaction_date, account, note]
        );
        return result.rows[0];
    } catch(err) {
        console.log(err);
    }
}

const getExpensesByUser = async(user_id) => {
    try {
        const result = await pool.query(
            "SELECT * FROM EXPENSES WHERE user_id = $1 ORDER BY transaction_date DESC",
            [user_id]
        );
        return result.rows;
    } catch(err) {
        console.log(err);
    }
}

const getExpensesById = async(id, user_id) => {
    try {
        const result = await pool.query(
            "SELECT * FROM EXPENSES WHERE id = $1 AND user_id = $2",
            [id, user_id]
        );
        return result.rows[0];
    } catch(err) {
        console.log(err);
    }
}

const updateExpense = async(id, user_id, amount, category, description, transaction_date, account, note) => {
    try {
        const result = await pool.query(
            "UPDATE expenses SET amount = $1, category = $2, description = $3, transaction_date = $4, account = $5, note = $6 WHERE id = $7 AND user_id = $8 RETURNING *",
            [amount, category, description, transaction_date, account, note, id, user_id]
        );
        return result.rows[0];
    } catch(err) {
        console.log(err);
    }
}

const deleteExpensesById = async(id,user_id)=>{
    try{
        const result = await pool.query("DELETE FROM EXPENSES WHERE id = $1 AND user_id = $2 RETURNING *",[id,user_id]);
        return result.rows[0];
    } catch(err){
        console.log(err);
    }
}

module.exports = {
    registerUser,
    loginUser,
    addExpense,
    getExpensesByUser,
    getExpensesById,
    updateExpense,
    deleteExpensesById
}