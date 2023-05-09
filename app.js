const http = require('http');

const routes = require('./routes');

console.log(routes.randomText);

// const requestListener = (request , response) => { } // requestListener is a function that will execute for every incoming request
// http.createServer(requestListener); // here, we use "function reference" in the argument i.e. without parentheses, so that it'll execute the function whenever the request is sent

const server = http.createServer(routes.handler);

server.listen(3000, () => {
    console.log("Server is running at port 3000...");
});