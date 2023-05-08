const http = require('http');

const fs = require('fs');

// const requestListener = (request , response) => { } // requestListener is a function that will execute for every incoming request
// http.createServer(requestListener); // here, we use "function reference" in the argument i.e. without parentheses, so that it'll execute the function whenever the request is sent

const server = http.createServer((req, res) => { // this  `createServer` method returns a "server". Thus, we need to store it in a variable

    console.log(req.url, req.method, req.headers);

    // process.exit(); // This kinda makes force exit from the Event Loop after the loop has executed the remaining events (i.e it doesn't wait & just exits)

    res.setHeader('Content-Type', 'text/html'); // to set `Content-Type` HTTP header in the response object
        // `Content-Type` header tells the client what type of data is being sent in the response. 
        // In this case, the `text/html` value tells the client that the response body contains HTML content.

    res.write(`
        <html>
            <head>
                <title>Vansh's Blog</title>
            </head>
            <body>
                <h1>Welcome To My Blog!</h1>
            </body>
        </html>
    `);
    res.end(); // tells Node that we're done with writing in the Response (which is to be sent) {NO MORE WRITING IN THE RESPONSE}
})

server.listen(3000, () => {
    console.log("Server is running at port 3000...");
});