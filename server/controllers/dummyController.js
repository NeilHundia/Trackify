const {
    registerUser, 
    loginUser,
    getExpensesByUser,
    getExpensesById,
    updateExpense,
    deleteExpensesById,
    addExpense
    } = require("../models/userModels");

// @desc Create new expense
// @route GET /api/
// @access public 

const getExpensesByUserController = async(req,res,next)=>{
    const {user_id} = req.params;
    try{
        console.log('Fetching expenses for user:', user_id);
        const result = await getExpensesByUser(user_id);
        console.log('Found expenses:', result);
        return res.status(200).json(result);
    } catch(err){
        console.error('Error fetching expenses:', err);
        next(err);
    }
};


const getExpensesByIdController = async(req,res,next)=>{
    const {id, user_id} = req.params;
    try{
        const result = await getExpensesById(id, user_id);
        if(!result) return res.status(404).json({message : "expense not found"});
        return res.status(200).json({result});
    } catch(err){
        next(err)
    }
};
// @desc Create new expense
// @route GET /api/
// @access public 

const addExpenseController = async (req, res, next) => {
    const { amount, category, description, transaction_date, account, note } = req.body;
    const { user_id } = req.params;
    
    // Log the received data
    console.log('Received expense data:', {
        user_id,
        amount,
        category,
        description,
        transaction_date,
        account,
        note
    });

    // Validate required fields
    if (!amount || !category || !description || !transaction_date || !account) {
        console.log('Missing required fields:', {
            amount: !amount,
            category: !category,
            description: !description,
            transaction_date: !transaction_date,
            account: !account
        });
        return res.status(400).json({ 
            message: 'Missing required fields',
            missing: {
                amount: !amount,
                category: !category,
                description: !description,
                transaction_date: !transaction_date,
                account: !account
            }
        });
    }

    try {
        const newExpense = await addExpense(user_id, amount, category, description, transaction_date, account, note);
        return res.status(201).json({ message: "Expense Created", expense: newExpense });
    } catch(err) {
        console.error('Error in addExpenseController:', err);
        next(err);
    }
};



// @desc Edit expense
// @route PUT /api/editExpense/:id
// @access public 
const updateExpenseController = async (req, res, next) => {
    const { amount, category, description, transaction_date, account, note } = req.body;
    const { id, user_id } = req.params;
    try {
        const modExpense = await updateExpense(id, user_id, amount, category, description, transaction_date, account, note);
        if(!modExpense) return res.status(404).json({ message: "expense not found" });
        return res.status(200).json({ message: "Expense updated", expense: modExpense });
    } catch(err) {
        next(err);
    }
};

// @desc Delete expense
// @route DELETE /api/deleteExpense/:id
// @access public 
const deleteExpensesByIdController = async (req,res,next)=>{
    const {id, user_id} = req.params;
    try{
        const deleteExpense = await deleteExpensesById(id, user_id);
        if(!deleteExpense) return res.status(404).json({message : "expense not found"});
        return res.status(200).json({message:"Expense deleted"});
    } catch(err){
        next(err)
    }
        
}

const registerUserController = async (req,res,next) => {
    const {name,email,password} = req.body;
    try{
        const newUser = await registerUser(name,email,password);
        res.status(201).json({message : "User created", "user" : newUser}); 
    } catch(err){
        next(err);
    }
}

const loginUserController = async (req,res,next) => {
    const {email,password} = req.body;
    try{
        const newUser = await loginUser(email,password);
        if(newUser.error){
            return res.status(401).json({error : newUser.error}); 
        }
        return res.status(200).json({message : "Login Successful", "user" : newUser}); 
    } catch(err){
        next(err);
    }
}



module.exports = {
    registerUserController,
    loginUserController,
    getExpensesByUserController,
    getExpensesByIdController,
    addExpenseController,
    updateExpenseController,
    deleteExpensesByIdController
};