const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const private = require('./verifyToken');
const { registerValidation, loginValidation } = require('../validation')

router.post('/register', async (req, res) => {

    // validate data

    const { error } = registerValidation(req.body);

    if (error) {
        res.status(400).json({error : error.details[0].message});
        return;
    }

    // check if user already exists

    const emailExist = await User.findOne({ email: req.body.email });

    if (emailExist) {
        res.status(400).json({ error: 'Email already exists!' });
        return;
    }

    // hash password

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });


    // save user
    try {
        const savedUser = await user.save();
        res.status(200).json({ user: user.id });
    } catch (error) {
        res.status(400).json({ error });
    }
})

router.get('/getUserId', private, async (req, res) => {
    res.status(200).json({userId: req.user._id});
})


router.post('/login', async (req, res) => {

    // validate data

    const { error } = loginValidation(req.body);

    if (error) {
        res.status(400).json({ error: error.details[0].message });
        return;
    }

    // check if user already registered

    const userName = await User.findOne({ email: req.body.email });

    if (!userName) {
        res.status(400).json({ error: 'Email doesn\'t exists' });
        return;
    }

    // validate password

    const validPass = await bcrypt.compare(req.body.password, userName.password);

    if (!validPass) {
        res.status(400).json({ error: 'Invalid password' });
        return;
    }

    const token = jwt.sign({ _id: userName._id }, process.env.TOKEN_SECRET);
    res.header('token-name', token).json({token, id: userName._id});
})

router.get('/getUserName', private, async (req, res) => {
    const user = await User.findOne({ _id: req.user._id });
    console.log(user);
    res.status(200).json({ userName: user.name });
})


module.exports = router;