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

app.use(bodyParser.urlencoded()); // It returns a middleware like any other, plus it does the WHOLE BODY PARSING thing we did manually earlier (in routes.js) 

// app.use(bodyParser.urlencoded({extended: false})); // to avoid the safety alert text

app.use('/products', (req, res, next) => {
    console.log("in the products page");
    res.send(`
        <h1>Products Page</h1>
        <form action="/cart" method="POST">
            <input type="text" name="product"autocomplete="off">
            <button type="submit">Add To Cart</button>
        </form>
    `); 
    // next(); // No Need. Will Result in an Error
});

// app.use('/cart', (req, res, next) => {
//     console.log(req.body); // needs to be parsed separately (else it'll give `undefined`)
//     res.redirect('/'); // much more convenient than conventional code used earlier
// });

// `app.get()`& `app.post()` are same as `app.use()` , but IT ONLY FIRES FOR AN INCOMING GET REQUEST & POST REQUEST respectively

app.post('/cart', (req, res, next) => {
    console.log(req.body); // needs to be parsed separately (else it'll give `undefined`)
    res.redirect('/'); // much more convenient than conventional code used earlier
});

app.use('/', (req, res, next) => {

    if (req.url === '/favicon.ico') {
        // Skip further processing for favicon request
        return res.sendStatus(204);
    }

    // '/' does not mean the full path (after the domain) has to be a `/`, but it has to start with that

    console.log("in the next middleware!");
    res.send(`<h1>Hello World! from NodeJS</h1>`); 
});

app.listen(3000, () => {
    console.log("Server is running at port 3000...");
});