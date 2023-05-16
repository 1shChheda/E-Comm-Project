// routes for what the Users see
const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {

    if (req.url === '/favicon.ico') {
        // Skip further processing for favicon request
        return res.sendStatus(204);
    }

    // '/' does not mean the full path (after the domain) has to be a `/`, but it has to start with that

    console.log("in the next middleware!");
    res.send(`<h1>Hello World! from NodeJS</h1>`); 
});

module.exports = router;