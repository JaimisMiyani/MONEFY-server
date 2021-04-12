const router = require('express').Router();
const Profile = require('../models/Profile');
const private = require('./verifyToken');
const { profileValidation } = require('../validation');

router.post('/', private, async (req, res) => {

    // validate data

    const { error } = profileValidation(req.body);

    if (error) {
        res.status(400).json({ error: error.details[0].message });
        return;
    }

    // Getting the user
    const user = req.user;

    // console.log(user);

    const profileObj = new Profile({ ...req.body, userId: user._id });

    try {
        const savedProfile = await profileObj.save();
        res.status(200).json({ savedProfile });
    } catch (error) {
        res.status(404).json({ error });
    }

});

router.put('/', private, async (req, res) => {

    const { error } = profileValidation(req.body);

    if (error) {
        res.status(400).json({ error: error.details[0].message });
        return;
    }

    const user = req.user;

    try {
        const data = await Profile.findOne({ userId: user._id });

        console.log(data);

        if (!data)
            return res.status(400).json({ error: "Profile is not defined yet ..." });

        await Profile.findOneAndUpdate({ userId: user._id }, { age: req.body.age, income: req.body.income });

        res.status(200).json({ message: "Profile updated!" });

    } catch (error) {
        res.status(400).json({ error });
    }
});

router.get('/', private, async (req, res) => {

    const user = req.user;

    try {
        const data = await Profile.findOne({ userId: user._id });

        if (!data)
            return res.status(400).json({ error: "Profile is not defined yet ..." });

        res.status(200).json({ data });

    } catch (error) {
        res.status(400).json({ error });
    }
});

module.exports = router;