// Working with Core Modules (02-B)

const fs = require('fs');

const requestHandler = (req, res) => {

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
                    <input type="text" name="message" autocomplete="off"><button type="submit">Send</button>
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

        return req.on("end", () => { // when all the data is collected in "body"
            const parsedBody = Buffer.concat(body).toString();

            const finalMessage = decodeURIComponent(parsedBody.split('=')[1].split('+').join(' ')); // `decodeURIComponent` --> decodes the special character's encoded form, which comes as the part of URL-encoding of form data
            console.log(finalMessage);

            fs.appendFile('message.txt', `${finalMessage}\n`, (err) => {
                // 2) 
                res.writeHead(302, {'Location' : '/'}); 
                    // SYNTAX : res.writeHead(statusCode[, statusMessage][, headers]);
                        // statusCode <number>: It accepts the status codes that are of number type.
                        // statusMessage <string>: It accepts any string that shows the status message.
                        // headers <Object>: It accepts any function, array, or string.
                    
                    // StatusCode 302 means that the requested resource is not available at its original URL, but has been temporarily moved to a new location
                    // The 302 status code is often used for URL redirection
        
                return res.end();
            }); // 3rd argument: `callback function` --> simply executes AFTER the write/read/appending this done.
        });


        // NOTE: 
            // `req.on()` works Asynchronously
            // `fs.appendFileSync()` will execute after `2)` has executed
            // `2)` --> sends the response 
            // This means that EVENT LISTENER's CODE { i.e. code of req.on() } will STILL EXECUTE EVEN AFTER THE RESPONSE IS ALREADY GONE . 
            // Thus, if the EVENT LISTENER's code has something to do with the Final Response, then the `2)` should also be included inside the Event Listener's code, so that it does not send the final response before the code could add its inputs to the final response.
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
}

// module.exports = requestHandler; // to export single Thing

module.exports = {  // to export Multiple Things
    handler: requestHandler,
    randomText: `Backend is Ready!`
}

// OBSOLETE after the use of ExpressJS