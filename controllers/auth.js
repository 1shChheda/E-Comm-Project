const mongodb = require('mongodb'); // NOTE: I've used new mongodb.ObjectId() at "postNewPassword" to convert the userId (which we get from "getNewPassword" page -> in String Format) into ObjectId (so that we can find the user in the database)
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const Models = require('../utils/all_Models');
const Send_Mail = require('../utils/sendMail');

const getSignup = (req, res, next) => {
    res.render('auth/signup', {
        path: '/signup',
        pageTitle: 'Signup',
        errorMessage: req.flash('error'),
        successMessage: req.flash('success'),
        oldInput: {
            username: "",
            email: "",
            password: "",
            confirmPassword: ""
        }
    });
};

const postSignup = (req, res, next) => {
    const { username, email, password, confirmPassword } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {

        console.log(errors.array());

        return res.status(422).render('auth/signup', {
            path: '/signup',
            pageTitle: 'Signup',
            errorMessage: errors.array()[0].msg,
            successMessage: req.flash('success'),
            oldInput: {
                username: username,
                email: email,
                password: password,
                confirmPassword: confirmPassword
            }
        });

    };

            // const user = new Models.User(null, username, email, password, { items: [] });
                // we cannot store password in plain text (as it is) --> {can be dangerous if the DB gets compromised, everything is exposed!}
                // so we need to HASH it (irreversibly, so no-on can construct it back from the hash)

                // package used: "bcryptjs"
            
            bcrypt.hash(password, 12)
                // 1st value: "String that you want to hash"
                // 2nd value: "Salt value" --> rounds of hashing needs to be applied (higher the value, the longer it'll take but the more secure it'll be)
                .then(hashedPassword => {
                    const user = new Models.User(null, username, email, hashedPassword, { items: [] });
                    return user.save();
                })
                .then(result => {
                    req.flash('success', 'User Registered Successfully!');
                    res.redirect('/login');

                    return Send_Mail(
                        email, 
                        'Welcome Aboard - Thank You for Registering with VanShify!', 
                        `
                            Dear ${username},

                            Thank you for choosing VanShify for your online shopping needs! We are thrilled to have you as a new member of our community.
                            
                            Your new account has been successfully created!
                            Happy shopping!

                            PLEASE NOTE: 
                            - This is a FAKE Shopping Website, Just a Ecommerce Website Project.
                            - So you can't buy stuff for Real.
                            - Just Explore the Site, & Have Fun!

                            Best regards,
                            The VanShify Team
                        `
                    )
                        .then(emailSent => {
                            if (emailSent) {
                                console.log('Signup email sent successfully!');
                            } else {
                                console.log('Failed to send the signup email.');
                            }
                        })
                        .catch(err => {
                            console.log('Error sending the signup email:', err);
                        });
                })
                .catch(err => console.log(err));
};

const getLogin = (req, res, next) => {

    console.log(req.session.isLoggedIn);
        // session will be stored in the server-side, &
        // the cookie related to this session will by default, be stored in the memory
        // also NOTE: it wont't be the same for different browsers,
            // meaning, if you now open a different browser, it'll show "undefined" i.e. it'll not have a active session on the server (or not the same cookie set as the one on your previous browser)

        // In SHORT, this session thing can be very useful, since 
            // it separates users from accessing each others data, 
            // even if same user tries stuff on different browser, it'll treat it as a new user 
            // (as in, new session stuff...not related to previous browser's session at all)
            // SUPER USEFUL while "Authentication Stuff", or while building REST APIs

    res.render('auth/login', {
        pageTitle: "Login",
        path: "/login",
        errorMessage: req.flash('error'),
        successMessage: req.flash('success')
    });
};

const postLogin = (req, res, next) => {

    const { email, password } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {

        console.log(errors.array());

        return res.status(422).render('auth/login', {
            path: '/login',
            pageTitle: 'Login',
            errorMessage: errors.array()[0].msg,
            successMessage: req.flash('success')
        });

    };

    // we search for the user-email in the database
    Models.User.findOne({ email: email })
        .then(user => {

            // if no such user exists, we return an error (afterwards)
            if (!user) {
                console.log("No Such User Exists!");
                req.flash('error', 'Invalid Email or Password');
                return res.redirect('/login');
            }
            // else we start to verify the password for the particular user

            // to compare the password entered & the DB user password
            bcrypt.compare(password, user.password)
                // NOTE: In both a matching password and a non-matching password case, we make it into the "then" block
                // result will be a boolean value:
                    // true -> matching password
                    // false -> non-matching password
                .then(doMatch => {
                    if (doMatch) {
                        req.session.isLoggedIn = true;
                            // 'session' object is added by the 'session middleware' we wrote earlier
                            // access the 'session' object to store & retrieve user-specific data
                        req.session.user = user;
                        return req.session.save((err) => { // when we need to be sure that a session was created before we're redirected
                            console.log(err);
                            req.flash('success', 'Login Successful!');
                            res.redirect('/')
                        });
                    }
                    req.flash('error', 'Invalid Email or Password');
                    res.redirect('/login');
                })
                .catch(err => {
                    console.log(err);
                    return res.redirect('/signup');
                });
        })
        .catch(err => console.log(err));

};

const getReset = (req, res, next) => {
    res.render('auth/reset-password', {
        pageTitle: "Reset Password",
        path: "/reset",
        errorMessage: req.flash('error'),
        successMessage: req.flash('success')
    });
};

const postReset = (req, res, next) => {
    crypto.randomBytes(32, (err, buffer) => {
        if (err) {
            console.log(err);
            req.flash('error', 'Error while Generating Email Token');
            return res.redirect('/reset');
        }

        // now we do have a valid Buffer
        // now we can generate a token from that Buffer
        const token = buffer.toString('hex'); 
            // 'hex' is to tell "toString()" that buffer stores hexadecimal values
        
        Models.User.findOne({ email: req.body.email })
            .then(user => {
                if(!user) {
                    req.flash('error', 'No Such Account Exists!');
                    return res.redirect('/reset');
                }

                // Construct a new User object with resetToken and resetTokenExpiry
                const updatedUser = new Models.User(
                    user._id,
                    user.username,
                    user.email,
                    user.password,
                    user.cart,
                    token, // Set the resetToken
                    Date.now() + 3600000 // Set the resetTokenExpiry to 1hr from now
                );

                return updatedUser.save()
                    .then(tokenSaved => {
                        req.flash('success', `Reset Password Email Sent! Please check your email for further instructions`);
                        res.redirect('/');
                        return Send_Mail(
                            req.body.email,
                            'Password Reset Request', 
                            `<p>
                                    Hello ${user.username},

                                    We have received a request to reset your password. 
                                    If you did not make this request, you can safely ignore this email.

                                    To reset your password, click on the link below:
                                    <a href="http://localhost:5000/reset/${token}">Reset Password</a>

                                    Best regards,
                                    The VanShify Team
                                </p>
                            `
                        );
                    })
                    .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
    });
};

const getNewPassword = (req, res, next) => {

    const token = req.params.token;

    Models.User.findOne({ resetToken: token, resetTokenExpiry: { $gt: Date.now() } })
        .then(user => {
            if (!user) {
                req.flash('error', 'Invalid or Expired Token. Please request a new password reset link.');
                return res.redirect('/reset');
            }

            res.render('auth/new-password', {
                pageTitle: "New Password Reset",
                path: "/new-password",
                errorMessage: req.flash('error'),
                successMessage: req.flash('success'),
                userId: user._id.toString(),
                passwordToken: token
            });
        })
        .catch(err => console.log(err));

};

const postNewPassword = (req, res, next) => {
    const { newPassword, userId, passwordToken } = req.body;

    Models.User.findOne({ 
        resetToken: passwordToken, 
        resetTokenExpiry: { $gt: Date.now() },
        _id: new mongodb.ObjectId(userId)
    })
    .then(user => {
        console.log("User found:", user); // to check if user is found

        if (!user) {
            req.flash('error', 'Invalid password reset link or link has expired.');
            return res.redirect('/reset');
        }

        // First, update the password and reset the tokens
        return bcrypt.hash(newPassword, 12)
            .then(hashedPassword => {
                
                const updatedUser = new Models.User(
                    user._id,
                    user.username,
                    user.email,
                    hashedPassword,
                    user.cart,
                    undefined, // set resetToken to undefined
                    undefined // set resetTokenExpiry to undefined
                );

                return updatedUser.save()
                    .then(result => {
                        req.flash('success', 'Password Reset Successful!');
                        return res.redirect('/login');
                    })
            })
            .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
};

const postLogout = (req, res, next) => {
    req.session.destroy((err) => {
        console.log(err);
        res.redirect('/');
    }); // to destroy/delete the session after LogOut

    // Now what will happen?
        // When you LogIn fresh, a new session will be created, & its corresponding cookie will also be created in the browser.
        // Now, when you "LogOut",
            // the session will be deleted from the database.
            // BUT, you might see that session's cookie still in the browser.
                // Don't worry, Its of NO USE now, since its parent session is deleted, this cookie wont have any effect on anything
                // It'll get overwritten if you start a new session (LogIn again), else
                // It'll be deleted once you close your browser tab
};

module.exports = {
    getSignup: getSignup,
    postSignup: postSignup,
    getLogin: getLogin,
    postLogin: postLogin,
    getReset: getReset,
    postReset: postReset,
    getNewPassword: getNewPassword,
    postNewPassword: postNewPassword,
    postLogout: postLogout
}