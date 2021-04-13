const mongoose = require('mongoose');

const expensesSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    groceries: {
        type: Number,
        required: true
    },
    housing: {
        type: Number,
        required: true
    },
    transportation: {
        type: Number,
        required: true
    },
    clothing: {
        type: Number,
        required: true
    },
    health: {
        type: Number,
        required: true
    },
    disretionary: {
        type: Number,
        required: true
    },
    education: {
        type: Number,
        required: true
    },
    communication: {
        type: Number,
        required: true
    },
    misc: {
        type: Number,
        required: true
    },
    totalExpense: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Expenses', expensesSchema);
