const getLogin = (req, res, next) => {
    const isLoggedIn = req.get('Cookie')?.split('=')[1] === 'true'; // Cookie Extraction // Using optional chaining to handle undefined
        // Note : Cookies can be manipulated from browser-side
    res.render('auth/login', {
        pageTitle: "Login",
        path: "/login",
        isAuthenticated: isLoggedIn || false, // Default value when 'Cookie' header is not present
    });
};

const postLogin = (req, res, next) => {

    // req.isLoggedIn = true; 
        // Even if we do this, in hopes to use "request" to save the "login status" to "true", IT FAILS (i.e. you wont be able to see "Admin Products" or "Add Products")...but WHY??

        // IMPORTANT:
            // the request is dead, it's done. With a response, we basically finished a request
            // we got a request and we sent a response, & we're done
            // This data does not stick around
            // This data is lost after the request or after we send the response

        // But you might wonder, why did the "req.user" work so fine then (in app.js),....it should have died too, right?
            // well, that middleware (app.use...) runs on every incoming request before our routes handle it
            // So the data we store here is used in the same request cycle, in our route handlers / controllers

    // res.setHeader('Set-Cookie', 'loggedIn=true'); 
        // 1st Argument: 'Set-Cookie' is a reserved name, to set Cookie
        // 2nd Argument: value of the Header (simplest form => key-value pair)

        // Cookie Configurations:
            // To set a Expiry Date for the Cookie, else it'll die once you close your Browser
            const expiryDate = new Date();
            expiryDate.setDate(expiryDate.getDate() + 7); // Add 7 days to the current date

            // Secure -> this cookie will only be set if the page is served via https

            // Domain: URL -> domain to which the cookies should be sent (for that tracking thing)

            // HttpOnly -> prevents client-side JavaScript from accessing the cookie
            //          -> This adds an extra layer of security against cross-site scripting (XSS) attacks
            res.setHeader('Set-Cookie', `loggedIn=true; Secure; Expires=${expiryDate.toUTCString()}; HttpOnly`);

    res.redirect('/')

};

module.exports = {
    getLogin: getLogin,
    postLogin: postLogin
}