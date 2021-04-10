const router = require('express').Router();
const Expenses = require('../models/Expenses');
const private = require('./verifyToken');
const { expensesValidation, expenseUpdateValidation } = require('../validation');
const { string } = require('joi');

router.post('/', private, async (req, res) => {

    // validate data

    const { error } = expensesValidation(req.body);

    if (error) {
        res.status(400).json({ error: error.details[0].message });
        return;
    }

    // Getting the user
    const user = req.user;

    // console.log(user);

    const expensesObj = new Expenses({
        ...req.body, userId: user._id,
    })

    // Saving Expenses
    try {
        const savedExpenses = await expensesObj.save();
        res.status(200).json({ savedExpenses });
    } catch (error) {
        res.status(404).json({ error });
    }

});

router.get('/', private, async (req, res) => {

    const user = req.user;

    try {
        const data = await Expenses.findOne({ userId: user._id });

        if (!data)
            return res.status(400).json({ error: "Expenses are not defined yet ..." });

        res.status(200).json({ data });

    } catch (error) {
        res.status(400).json({ error });
    }
});

router.put('/', private, async (req, res) => {

    const { error } = expenseUpdateValidation(req.body);

    if (error) {
        res.status(400).json({ error: error.details[0].message });
        return;
    }

    const user = req.user;

    try {
        const data = await Expenses.findOne({ userId: user._id });

        if (!data)
            return res.status(400).json({ error: "Expenses are not defined yet ..." });

        const flag = typeof req.body.value;
        let add = req.body.value;
        if(flag == string){
            add = parseFloat(req.body.value);
        }

        const newValue = (add + data[req.body.expense]);
        
        await Expenses.findOneAndUpdate({userId: user._id}, {[req.body.expense]: newValue});

        res.status(200).send("Expenses updated");

    } catch (error) {
        res.status(400).send(error);
    }
});

router.put('/reset', private, async (req, res) => {

    const user = req.user;
    try {
        const data = await Expenses.findOne({userId: user._id});

        if (!data)
            return res.send("Expenses are not defined yet ...");

        Expenses.findOneAndUpdate({ userId : user._id }, { "$set": { "home": 0, "food": 0, "interest": 0, "transportation": 0, "subscriptionAndExpenses" : 0, "misc" : 0, "materialGoods" : 0, "venmo" : 0, "healthAndInsurance" : 0}}).exec(function(err, obj){
            if(err) {
                res.status(400).send(err);
            } 
            res.status(200).send("Expenses reset");       
         }); 
         
    } catch (error) {
        res.status(400).json({ error });
    }
});

module.exports = router;