const bcrypt = require('bcryptjs');
const Models = require('../utils/all_Models');

const getSignup = (req, res, next) => {
    res.render('auth/signup', {
        path: '/signup',
        pageTitle: 'Signup',
        errorMessage: req.flash('error'),
        successMessage: req.flash('success')
    });
};

const postSignup = (req, res, next) => {
    const { username, email, password, confirmPassword } = req.body;

    Models.User.findOne({ email: email })
        .then(existingUser => {
            if (existingUser) {
                console.log("User Already Exists!");
                req.flash('error', 'E-mail Already Registered');
                return res.redirect('/signup');
            }

            // const user = new Models.User(null, username, email, password, { items: [] });
                // we cannot store password in plain text (as it is) --> {can be dangerous if the DB gets compromised, everything is exposed!}
                // so we need to HASH it (irreversibly, so no-on can construct it back from the hash)

                // package used: "bcryptjs"
            
            return bcrypt.hash(password, 12)
                // 1st value: "String that you want to hash"
                // 2nd value: "Salt value" --> rounds of hashing needs to be applied (higher the value, the longer it'll take but the more secure it'll be)
                .then(hashedPassword => {
                    const user = new Models.User(null, username, email, hashedPassword, { items: [] });
                    return user.save();
                })
                .then(result => {
                    console.log('User created successfully!');
                    req.flash('success', 'User Registered Successfully!');
                    res.redirect('/login');
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
    postLogout: postLogout
}