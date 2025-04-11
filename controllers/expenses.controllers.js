const Expenses = require("../models/expenses.models.js");
const moment = require("moment");

const handleAllExpenses = async (req, res) => {
    try {
        const { user } = req.body;
        const { frequency, selectedDate, type } = req.body;
        
        if (!user) {
            return res.status(400).json({ 
                success: false, 
                message: "User ID is required" 
            });
        }

        const allExpenses = await Expenses.find({
            ...(frequency !== 'all' && frequency !== 'custom' ? {
                date: {
                    $gt: moment().subtract(Number(frequency), 'd').toDate()
                },
            } : {}),

            ...(frequency === 'custom' ? {
                date: {
                    $gte: selectedDate[0],
                    $lte: selectedDate[1]
                }
            }: {}),

            user,

            ...(type !== 'all' && {type}),
        })
        return res.status(200).json(allExpenses)
    } catch (error) {
        console.log("All Expenses error: ", error)
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const handleAddExpenses = async (req, res) => {
    console.log(req.body);
    try {
        await Expenses.create(req.body);
        return res.status(201).json({
            success: true,
            message: "Expenses created"
        })
    } catch (error) {
        console.log("Add Expenses error: ", error)
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

const handleEditExpenses = async (req, res) => {
    try {
        await Expenses.findByIdAndUpdate({_id: req.body.transaction_id}, req.body.payload);
        res.status(200).json({
            success: true,
            message: "Edited successfully."
        });
    } catch (error) {
        console.log("Eddit Expense error: ", error)
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const handleDeleteExpense = async (req, res) => {
    try {
        const id = req.params.id
        await Expenses.findByIdAndDelete(id);
        res.status(200).json({
            success: false,
            message: "Deleted Successfully"
        })
    } catch (error) {
        console.log("Delete expense error: ", error)
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

module.exports = {
    handleAllExpenses,
    handleAddExpenses,
    handleEditExpenses,
    handleDeleteExpense
}