// Working with Core Modules (02-A)

    // const http = require('http');

    // const routes = require('./routes');

    // console.log(routes.randomText);

    // // const requestListener = (request , response) => { } // requestListener is a function that will execute for every incoming request
    // // http.createServer(requestListener); // here, we use "function reference" in the argument i.e. without parentheses, so that it'll execute the function whenever the request is sent

    // const server = http.createServer(routes.handler);

    // server.listen(3000, () => {
    //     console.log("Server is running at port 3000...");
    // });


// ----------------------------------------------------------------------

// Working with Express (04-B)

const express = require('express');

const app = express(); 

const path = require('path');

const bodyParser = require('body-parser');

const session = require('express-session');

const MongoDBStore = require('connect-mongodb-session')(session);
    // The require('connect-mongodb-session') statement returns a function
    // By adding (session) after it, we are immediately invoking that function and passing session as a parameter to it
    // the final yield is a "Constructor Function"

const csrf = require('csurf');

const flash = require('connect-flash');

const errorController = require('./controllers/404error');

const db = require('./utils/database');

const Models = require('./utils/all_Models');

require('dotenv').config(); // necessary to load the environment variables from the ".env" file into the "process.env" object

const PORT = process.env.PORT || 3000; // if "PORT" env variable will have any value set, it'll use that value ... else it'll use 5000

// Configuring Session Store
    // Creating an instance of MongoDBStore to configure the session store
const store = new MongoDBStore({
    uri: process.env.DB_URI,
    collection: 'sessions'
});

const csrfProtection = csrf(); // we get a Middleware from this, which we use after we have initialized the session (line 71 - 83) {since this will use the session too}

app.use(bodyParser.urlencoded({ extended: true })); // It returns a middleware like any other, plus it does the WHOLE BODY PARSING thing we did manually earlier (in routes.js) 

// app.use(bodyParser.urlencoded({extended: false})); // to avoid the safety alert text

app.use(express.static(path.join(__dirname, 'public'))); // for serving static files
    // When a request is received (let say, the homepage wants `main.css` while being served), Express.js will check if the requested URL matches a file in the "public" directory. If a match is found, it will serve that file directly to the client

// app.set(`key`, `value`) basically assigns a `value` to default configurations, so that it can we used globally in the code, with the same `value`
app.set('view engine', 'ejs'); // telling expressJS we want to compile dynamic templates with the ejs engine

app.set('views', 'views'); // telling expressJS where to find these templates

app.use(session({
    secret : 'its a secret', 
        // used to sign the session ID cookie // in production, it should be a long randomly generated string value
    resave: false, 
        // means that the session will not be saved on every request that is done, so on every response that is sent, BUT ONLY if something changed in the session
    saveUninitialized: false,
        // to ensure that no session gets saved for a request where it doesn't need to be saved because nothing was changed about it

    // basically these two ensure ki baar-baar auto-save nahi karega session ko, unecessary
    // cookie: {}, // we can also configure the cookie settings for this cookie (which'll store session ID)

    store: store // tells the session middleware to store the session data in MongoDB
}));

app.use(csrfProtection);

app.use(flash());

// By the time we reach here, our Session Data will be loaded
// So we just want to use that session data to load our real user, 
// & create a MongoDB User Model, BASED ON THE DATA STORED IN THE SESSION (i.e the data that persists across requests)
// & store it in the req.user (so it will also remain accross requests, but fueled by the data stored in the session)
// we need to make this model, since we need to work with model (for Cart & Order)
// when we try to use "req.session.user" in Cart & Order, it fails, since IT IS PLAIN DATA of User, NOT A MODEL we can work with
app.use((req, res, next) => {
    if (!req.session.user) {
        return next();
    }
    Models.User.findById(req.session.user._id)
        .then(user => {
            req.user = new Models.User(user._id, user.username, user.email, user.password, user.cart);
            next();
        })
        .catch(err => console.log(err))
});


// "res.locals" is an object in Express that allows you 
    // --> to set local variables that are accessible within your templates when rendering views
    // --> so, "isAuthenticated" and "csrfToken" variables can be accessed from any view template that is rendered after this middleware is executed
    // --> Thus, we don't ned to include these variables in the object for each individual page render
app.use((req, res, next) => {
    res.locals.isAuthenticated = req.session.isLoggedIn;
    res.locals.csrfToken = req.csrfToken();
    next();
});

const shopRoutes = require('./routes/shop');
app.use(shopRoutes);

const adminRoutes = require('./utils/all_admin_routes');
adminRoutes.All_admin_routes(app); // FILTERING: only routes starting with `/admin` will go in to the admin routes file
// This allows us to add a specific url before all the routes of a particular file, & also only visiting those routes when the specific url is attached before the route's url
    
    // NOTE: as said before, ORDER MATTERS! But...
    // But, in `shopRoutes, we've used 'router.get' which will only fire first if there was a GET method mentioned in it (which is not)

const authRoutes = require('./routes/auth');
app.use(authRoutes);

app.use('/', errorController.get404page); // I've SPLIT THE CODE into `MVC`

// Connecting to the database
db.mongoConnect(() => {

    app.listen(PORT, () => {
        console.log(`Server is running at port ${PORT}...`);
    });

});