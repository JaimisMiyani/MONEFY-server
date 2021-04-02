const router = require('express').Router();
const Budgets = require('../models/Budgets');
const private = require('./verifyToken');
const { budgetsValidation } = require('../validation');

router.post('/', private, async (req, res) => {

    // validate data

    // const { error } = budgetsValidation(req.body);

    // if (error) {
    //     res.status(400).send(error.details[0].message);
    //     return;
    // }

    const error = budgetsValidation(req.body);

    if(error) {
        res.status(400).send(error);
        return;
    }

    // Getting the user
    const user = req.user;

    const budgetsObj = new Budgets({
        ...req.body, userId: user.id,
    })

    // Saving Budgets
    try {
        const savedBudgets = await budgetObj.save();
        res.status(200).send(savedBudgets);
    } catch (error) {
        res.status(404).send(error);
    }

});

module.exports = router;