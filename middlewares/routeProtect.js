module.exports = (req, res, next) => {

    // to check if the user is authenticated first
    if (!req.session.isLoggedIn) {
        return res.redirect('/login');
    }
    next();
}