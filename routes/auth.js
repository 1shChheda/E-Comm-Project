const express = require('express');
const { check, body, validationResult } = require('express-validator');
const router = express.Router();
const authController = require('../controllers/auth');
const Models = require('../utils/all_Models');

router.get('/login', authController.getLogin);

router.post('/login', authController.postLogin);

router.get('/signup', authController.getSignup);

router.post(
    '/signup',
    [
        body('username')
            .custom(value => {
                if (value.toLowerCase() === 'admin') {
                    throw new Error('Username "admin" is not allowed');
                }
                return true;
            }),
        check('email')
            .isEmail().withMessage('Please Enter a Valid Email!')
            .custom((value, { req }) => {
                if (!value.endsWith('@gmail.com')) {
                    throw new Error('Only Gmail accounts are allowed for signup');
                }
                return Models.User.findOne({ email: value })
                    .then(existingUser => {
                        if (existingUser) {
                            return Promise.reject('E-mail Already Registered');
                        }
                    });
            }),
        body(
            'password', 
            'Please Enter a Alphanumeric Password, min. 8 characters long'
        )
            .isLength({ min: 8 })
            .isAlphanumeric(),
        body('confirmPassword')
            .custom((value, {req}) => {
                if (value !== req.body.password) {
                    throw new Error('Passwords Do No Match!');
                }
                return true;
            }),
    ],
    authController.postSignup
);

router.get('/reset', authController.getReset);

router.post('/reset', authController.postReset);

router.get('/reset/:token', authController.getNewPassword);

router.post('/new-password', authController.postNewPassword);

router.post('/logout', authController.postLogout);

module.exports = router;