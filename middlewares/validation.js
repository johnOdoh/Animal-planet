const { check } = require('express-validator');

exports.registerVal = [
    check('username').trim().escape().not().isEmpty().withMessage('Username is required!').isAlphanumeric().withMessage('Username must contain only alphabets and numbers!'),
    check('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long!'),
    check('passwordConfirm').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Passwords don\'t match!');
        }
        return true;
    })
]

exports.logInVal = [
    check('password').isLength({ min: 5 }).withMessage('Password too short!')
]

exports.addAnimal = [
    check(['name', 'description', 'class', 'habitat']).trim().escape().not().isEmpty().withMessage('Field required')
]