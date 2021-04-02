const Joi = require('@hapi/joi');

const registerValidation = (data) => {
    
    const schema = {
        name: Joi.string().max(255).required(),
        email: Joi.string().min(6).max(255).required().email(),
        password: Joi.string().min(6).max(1024).required()
    };

    return Joi.validate(data, schema);
}

const loginValidation = (data) => {

    const schema = {
        email: Joi.string().min(6).max(255).required().email(),
        password: Joi.string().min(6).max(1024).required()
    };

    return Joi.validate(data, schema);
}

const budgetValidation = (data) => {

    const schema = {
        userId: Joi.string().required(),
        budgets: Joi.object().keys({
            home: Joi.number().required,
            healthAndInsurance: Joi.number().required,
            food: Joi.number().required,
            interest: Joi.number().required,
            transportation: Joi.number().required,
            subscriptionAndExpenses: Joi.number().required,
            misc: Joi.number().required,
            materialGoods: Joi.number().required,
            venmo: Joi.number().required,
        })
    };

    return Joi.validate(data, schema);
}

module.exports = {
    registerValidation,
    loginValidation,
    budgetValidation
};