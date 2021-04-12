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
        groceries: Joi.number().required(),
        housing: Joi.number().required(),
        transportation: Joi.number().required(),
        clothing: Joi.number().required(),
        health: Joi.number().required(),
        disretionary: Joi.number().required(),
        education: Joi.number().required(),
        communication: Joi.number().required(),
        misc: Joi.number().required()
    });

    return schema.validate(data);
}

const budgetUpdateValidation = (data) => {
    const schema = Joi.object({
        expense: Joi.string().valid(...['groceries', 'housing', 'transportation', 'clothing', 'health', 'disretionary', 'education', 'communication', 'misc']).required(),
        value: Joi.number().required()
    });

    return schema.validate(data);
}

const profileValidation = (data) => {
    const schema = Joi.object({
        age: Joi.number().required(),
        income: Joi.number().required()
    });

    return schema.validate(data);
}

const expensesValidation = (data) => {

    const schema = Joi.object({
        groceries: Joi.number().required(),
        housing: Joi.number().required(),
        transportation: Joi.number().required(),
        clothing: Joi.number().required(),
        health: Joi.number().required(),
        disretionary: Joi.number().required(),
        education: Joi.number().required(),
        communication: Joi.number().required(),
        misc: Joi.number().required()
    });

    return schema.validate(data);
}

const expenseUpdateValidation = (data) => {
    const schema = Joi.object({
        expense: Joi.string().valid(...['groceries', 'housing', 'transportation', 'clothing', 'health', 'disretionary', 'education', 'communication', 'misc']).required(),
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
    expenseUpdateValidation,
    profileValidation
};

