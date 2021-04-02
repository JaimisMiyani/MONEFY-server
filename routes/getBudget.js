const router = require('express').Router();
const User = require('../models/User');
// const User = require('../models/Budgets');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { registerValidation, loginValidation } = require('../validation');
const Budgets = require('../models/Budgets');


router.get('/', async (req, res) => {
    const { error } = loginValidation(req.body);

    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    // check if user already registered

    const userName = await User.findOne({ email: req.body.email });

    if (!userName) {
        res.status(400).send("Email doesn't exists");
        return;
    }

    try{
        const data = await Budgets.findOne({ userId : userName._id});
        const flag = (data === null);

        if(flag) res.send("Budget is not defined yet ...");
        else res.send(data);
    } catch(error){
        res.status(100).send('Invalid User');
    }
});

module.exports = router;