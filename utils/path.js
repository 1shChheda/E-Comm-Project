// This is just a helper function used for making Navigation easier

// It'll allow you to direct `path` directly from the ROOT DIRECTORY, making it easier to navigate to the required file (instead of thinking how to get to the required file from the current directory)

const path = require('path');

module.exports = path.dirname(process.mainModule.filename);
    // `process.mainModule.filename` --> used to obtain the file path of the main module file (here, `app.js`) of the Node.js application
    // By applying `path.dirname()` to this file path, we get the directory path of the main module file (`app.js`)