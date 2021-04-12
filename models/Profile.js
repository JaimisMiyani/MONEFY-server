const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    age: {
        type: Number,
        required: true
    },
    income: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Profile', profileSchema);
