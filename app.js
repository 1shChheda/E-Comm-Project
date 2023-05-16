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


// Working with Express (04-A)

    // Writing code with NodeJS alone (i.e. with core modules/packages alone), the code is too long for even simple tasks like extracting data from the incoming request, etc

    // to focus more on Bussiness Logic , & write a neater code --> we use other Packages/Frameworks ( like Express )

    // Alternatives to Express.js

        // Vanilla Node.js
        // Adonis.js
        // Koa
        // Sails.js

const express = require('express');

    // The `express` package exports a function
    // When you require the express package using `const express = require('express');` , 
        // you are essentially importing that exported function

const app = express(); 
    // By invoking that function (`express()`), 
    // you create a new instance of the Express application, 
    // which is assigned to the `app` variable
    // The `app` variable represents the Express application object --> core of your web server

// What Is MIDDLEWARE ?

    // an Incoming Request is automatically funneled through a bunch of functions, until (in the end) you send a Response

    // you can use other third-party packages, which can give such middleware functions

app.use((req, res, next) => { // 1) `Use` allows us to add a new 'middleware' function

    // 2) this arrow-head function (inside the `app.use`) will be executed for every incoming request 

    // 3) three arguments : `req` & `res` (like before) & `next`

    // 4) `next` is itself a function, which needs to be executed, to allow the Request to travel on to the next middleware function

    // 5) you either add a `next()` to send the request to next middleware, OR `send a Response`(to not do anything else)

    // 6) if none of the two is mentioned, then its a "dying request"

    if (req.url === '/favicon.ico') {
        // Skip further processing for favicon request
        return res.sendStatus(204);
    }

    console.log("in the middleware!"); // to see that when we go to host:3000, the Request from the url comes here, & inside this function & this line gets executed after that

    next();
});

app.use((req, res, next) => {

    if (req.url === '/favicon.ico') {
        // Skip further processing for favicon request
        return res.sendStatus(204);
    }

    console.log("in the next middleware!");

    res.send(`<h1>Hello World! from NodeJS</h1>`); 
        // `send` is allows us to send a Response of ANY TYPE! 
        // (can be plain-text, HTML, JSON, Buffer, Status Code, etc...)
        // it automatically sets the appropriate content-type header based on the data you provide
});

// NOTE : I've added " if (req.url === '/favicon.ico') {  return res.sendStatus(204); } " in the above middleware functions, so that THEY DO NOT EXECUTE for `favicon.ico Request` --> previously, console.logs were getting printed TWICE --> so I fixed the odd behaviour by ignoring `favicon.ico Request`

app.listen(3000, () => {
    console.log("Server is running at port 3000...");
});