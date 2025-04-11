const mongoose = require("mongoose");
const {Schema} = require("mongoose");

const expensesSchema = new mongoose.Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        amount: {
            type: Number,
            required: [true, "Amount is required"]
        },
        type: {
            type: String,
            required: [true, "Type is required"]
        },
        category: {
            type: String,
            required: [true, "Category is required"]
        },
        description: {
            type: String,
            required: [true, "Description is required"]
        },
        date: {
            type: Date,
            required: [true, "Date is required"]
        }
    }, {
        timestamps: true
    }
)

const Expenses = mongoose.model("expenses", expensesSchema);

module.exports = Expenses;