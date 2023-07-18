const Models = require('../utils/all_Models');

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
        isAuthenticated: req.session.isLoggedIn || false, // Default value when 'Cookie' header is not present
    });
};

const postLogin = (req, res, next) => {

    Models.User.findById('649d7b3fe81b4f425b935f13')
        .then(user => {
            req.session.isLoggedIn = true;
                // 'session' object is added by the 'session middleware' we wrote earlier
                // access the 'session' object to store & retrieve user-specific data
            req.session.user = user;
            res.redirect('/')
        })
        .catch(err => console.log(err));

};

module.exports = {
    getLogin: getLogin,
    postLogin: postLogin
}