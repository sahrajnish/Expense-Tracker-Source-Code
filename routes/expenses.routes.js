const express = require("express");
const { handleAddExpenses, handleAllExpenses, handleEditExpenses, handleDeleteExpense } = require("../controllers/expenses.controllers");

const router = express.Router();

// POST -> Expenses
router.post('/expenses', handleAddExpenses)

// PATCH -> Expenses
router.patch('/expenses/:id', handleEditExpenses)

// GET -> All Expenses
router.post('/allExpenses', handleAllExpenses)

// DELETE -> Expense
router.delete('/expenses/:id', handleDeleteExpense)

module.exports = router;