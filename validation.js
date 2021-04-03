const Joi = require('joi');

const registerValidation = (data) => {

    const schema = Joi.object({
        name: Joi.string().max(255).required(),
        email: Joi.string().min(6).max(255).required().email(),
        password: Joi.string().min(6).max(1024).required()
    });

    return schema.validate(data);
}

const loginValidation = (data) => {

    const schema = Joi.object({
        email: Joi.string().min(6).max(255).required().email(),
        password: Joi.string().min(6).max(1024).required()
    });

    return schema.validate(data);
}

const budgetsValidation = (data) => {

    const schema = Joi.object({
        home: Joi.number().required(),
        healthAndInsurance: Joi.number().required(),
        food: Joi.number().required(),
        interest: Joi.number().required(),
        transportation: Joi.number().required(),
        subscriptionAndExpenses: Joi.number().required(),
        misc: Joi.number().required(),
        materialGoods: Joi.number().required(),
        venmo: Joi.number().required()
    });

    return schema.validate(data);
}

const budgetUpdateValidation = (data) => {
    const schema = Joi.object({
        budget: Joi.string().valid(...['home','food','interest','transportation','subscriptionAndExpenses','misc','materialGoods','venmo','healthAndInsurance']).required(),
        value: Joi.number().required()
    });

    return schema.validate(data);
}

const expensesValidation = (data) => {

    const schema = Joi.object({
        home: Joi.number().required(),
        healthAndInsurance: Joi.number().required(),
        food: Joi.number().required(),
        interest: Joi.number().required(),
        transportation: Joi.number().required(),
        subscriptionAndExpenses: Joi.number().required(),
        misc: Joi.number().required(),
        materialGoods: Joi.number().required(),
        venmo: Joi.number().required()
    });

    return schema.validate(data);
}

const expenseUpdateValidation = (data) => {
    const schema = Joi.object({
        expense: Joi.string().valid(...['home','food','interest','transportation','subscriptionAndExpenses','misc','materialGoods','venmo','healthAndInsurance']).required(),
        value: Joi.number().required()
    });

    return schema.validate(data);
}

module.exports = {
    registerValidation,
    loginValidation,
    budgetsValidation,
    budgetUpdateValidation,
    expensesValidation,
    expenseUpdateValidation
};