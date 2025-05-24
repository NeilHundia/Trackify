const express = require("express");
const router = express.Router();
const { 
    registerUserController,
    loginUserController,
    getExpensesByUserController,
    getExpensesByIdController,
    addExpenseController,
    updateExpenseController,
    deleteExpensesByIdController
    } = require("../controllers/dummyController");

// Simple test route to check connectivity
router.get("/test-connection", (req, res) => {
    res.status(200).json({ message: "API connection successful" });
});

router.route("/register").post(registerUserController);
router.route("/login").post(loginUserController);
router.route("/expense/:user_id").post(addExpenseController);
router.get("/expenses/:user_id",getExpensesByUserController);
router.get("/expenses/:user_id/:id",getExpensesByIdController);
router.put("/expenses/:user_id/:id",updateExpenseController);
router.delete("/expenses/:user_id/:id",deleteExpensesByIdController);

module.exports = router;