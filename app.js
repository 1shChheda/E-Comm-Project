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

const bodyParser = require('body-parser');

const adminRoutes = require('./routes/admin');

const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded()); // It returns a middleware like any other, plus it does the WHOLE BODY PARSING thing we did manually earlier (in routes.js) 

// app.use(bodyParser.urlencoded({extended: false})); // to avoid the safety alert text

app.use(shopRoutes);
app.use(adminRoutes); // NOTE: as said before, ORDER MATTERS! But...

// But, in `shopRoutes, we've used 'router.get' which will only fire first if there was a GET method mentioned in it (which is not)

app.use('/', (req, res, next) => { // added a 404 Page Not Found
    res.status(404).send(`<h1>404: Page Not Found</h1>`);
});

app.listen(3000, () => {
    console.log("Server is running at port 3000...");
});