const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {

    const url = req.url;
    res.setHeader('Content-Type', 'text/html');
    res.write(`
        <html>
            <head>
                <title>Chheda Lab</title>
                <link rel="icon" href="https://www.favicon.cc/logo3d/472727.png"></link>
            </head>
            <body>
                <h1>Welcome To Chheda Laboratory Website</h1>
            </body>
        </html>
    `);
    res.end();

});


server.listen(5000, () => {
    console.log("Server Running at Port 5000.....");
})