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

const errorController = require('./controllers/404error');

const sequelize = require('./utils/database');

const Models = require('./utils/all_Models');

require('dotenv').config(); // necessary to load the environment variables from the ".env" file into the "process.env" object

const PORT = process.env.PORT || 3000; // if "PORT" env variable will have any value set, it'll use that value ... else it'll use 5000

app.use(bodyParser.urlencoded()); // It returns a middleware like any other, plus it does the WHOLE BODY PARSING thing we did manually earlier (in routes.js) 

// app.use(bodyParser.urlencoded({extended: false})); // to avoid the safety alert text

app.use(express.static(path.join(__dirname, 'public'))); // for serving static files
    // When a request is received (let say, the homepage wants `main.css` while being served), Express.js will check if the requested URL matches a file in the "public" directory. If a match is found, it will serve that file directly to the client

// app.set(`key`, `value`) basically assigns a `value` to default configurations, so that it can we used globally in the code, with the same `value`
app.set('view engine', 'ejs'); // telling expressJS we want to compile dynamic templates with the ejs engine

app.set('views', 'views'); // telling expressJS where to find these templates

// I want to store this user in a 'request' so we can use it anywhere in our App
app.use((req, res, next) => {
    Models.User.findByPk(1)
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => console.log(err));
});

const shopRoutes = require('./routes/shop');
app.use(shopRoutes);

const adminRoutes = require('./utils/all_admin_routes');
adminRoutes.All_admin_routes(app); // FILTERING: only routes starting with `/admin` will go in to the admin routes file
// This allows us to add a specific url before all the routes of a particular file, & also only visiting those routes when the specific url is attached before the route's url
    
    // NOTE: as said before, ORDER MATTERS! But...
    // But, in `shopRoutes, we've used 'router.get' which will only fire first if there was a GET method mentioned in it (which is not)

app.use('/', errorController.get404page); // I've SPLIT THE CODE into `MVC`

// Before we sync our data to the DB, we wanna define our Models Relations first
require('./utils/all_Model_Relationship').Model_Relationship();

// sequelize.sync({ force : true })    
        // since we already have a 'products' table & will not override with new information. 
        // THUS '{ force : true }' to override {not to be used much during development}
    sequelize.sync()
        .then(result => {

            // console.log(result);

            return Models.User.findByPk(1);
            
        })
        .then(user => {
            if(!user) {
                return Models.User.create({ name : "Vansh", email : "test@test.com" });
            }
            return Promise.resolve(user);
        })
        .then(user => {
            // console.log(user);

            // Check if the user already has a cart
            return user.getCart()
                .then(cart => {
                    if (!cart) {
                        return user.createCart();
                    }
                    return Promise.resolve(cart);
                });

        })
        .then(cart => {
            
            // I only want to Start my server Once I know Models are ready
            app.listen(PORT, () => {
                console.log(`Server is running at port ${PORT}...`);
            });

        })
        .catch(err => {
            console.log(err);
        }); // Sync all defined models to the DB