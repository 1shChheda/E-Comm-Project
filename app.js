const http = require('http');

const fs = require('fs');

// const requestListener = (request , response) => { } // requestListener is a function that will execute for every incoming request
// http.createServer(requestListener); // here, we use "function reference" in the argument i.e. without parentheses, so that it'll execute the function whenever the request is sent

const server = http.createServer((req, res) => { // this  `createServer` method returns a "server". Thus, we need to store it in a variable

    // console.log(req.url, req.method, req.headers);

    const url = req.url;
    const method = req.method;
    if (url === '/') {
        res.write(`
        <html>
            <head>
                <title>Vansh's Blog</title>
            </head>
            <body>
                <form action="/message" method="POST">
                    <input type="text" name="message"><button type="submit">Send</button>
                </form>
            </body>
        </html>
        `);

            // WHAT'S HAPPENING ?
                // form will take all the input data --> put it into request body as `key:value` pairs --> "name" of the input tag is KEY --> "data" entered in the input area is VALUE

        return res.end(); // so that it stops running the 'writing over the response' & doesn't execute any underlying 'response write' code 
    }

    if(url === '/message' && method === 'POST') {
        // Two Things to Do : 1) Store the user input in a file & 2) Redirect the user to '/' page

        const body = [];

        // 1)
            // `req.on` registers an event listener { basically allows us to listen to certain events }
        req.on('data', (chunk) => {
            console.log(chunk);
            body.push(chunk);
        });
            // the 'data' event will be fired whenever a "new chunk" is ready to be read. { w.r.t Streams & Buffers }

        req.on("end", () => { // when all the data is collected in "body"
            const parsedBody = Buffer.concat(body).toString();
            const finalMessage = parsedBody.split('=')[1].split('+').join(' ');
            // console.log(finalMessage);
            fs.appendFileSync('message.txt', `${finalMessage}\n`);
        });

        // 2) 
        res.writeHead(302, {'Location' : '/'}); 
            // SYNTAX : res.writeHead(statusCode[, statusMessage][, headers]);
                // statusCode <number>: It accepts the status codes that are of number type.
                // statusMessage <string>: It accepts any string that shows the status message.
                // headers <Object>: It accepts any function, array, or string.
            
            // StatusCode 302 means that the requested resource is not available at its original URL, but has been temporarily moved to a new location
            // The 302 status code is often used for URL redirection

        return res.end();
    }
    

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