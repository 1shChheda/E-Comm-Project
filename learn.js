// ----------------------------------------------------------------------
    // What Is Javascript ? (01-A)
        // Javascript is a programming language we typically use in the browser to manipulate the DOM (i.e. to manipulate the page which was loaded in the browser)

        // Vanilla Javascript runs in a browser that allows you to interact with the page after it was loaded (thus important to make a Interactive UI)

    // What is NodeJS ?
        // Basically takes Javascript and puts it into a different environment (i.e. to use JS anywhere outside the browser)

        // NodeJS is build on V8 Engine (built by Google)

    // What is V8? What does V8 do?  
        // V8 Engine --> takes the JS code --> COMPILES it to Machine Code --> which finally runs on the Computer.

        //  V8 is written in C++

        // So, NodeJS basically adds certain JS features (e.g: working with local file system) into the V8's codebase (which is written in C++)

// ----------------------------------------------------------------------

    // NodeJS's Role in Creating A Server (How WEB Works) (01-B)
        
        //          ( https://page-url.com )
        //                  Server              ---> Databases , Authentication , Input Validation 
        //                ^       |
        //      REQUEST   |       |  RESPONSE
        //                |       |  (html/css/js browser side)
        //                |       v
        //              Client (Browser)

        // Whenever we enter a url in browser, it sends a REQUEST to that url (more specifically, sends REQUEST to the IP ADDRESS belonging to that domain)
        // We write the code (in NodeJS, PHP, Ruby, etc) that runs on that computer in the Internet (which has that IP Address) --> Server
        // Server takes the REQUESTS from the browser & returns RESPONSE
        // Server is used to do tasks we can't/don't want to do from inside the browser
        // Server can be used to: 
            // Connect to DATABASES
            // Do USER AUTHENTICATION (since we can't let access to USER)
            // Input Validation
        // --> All this, because USER can manipulate the browser side code (via Dev Tools, etc) but the server side working/code isn't available to the USER, thus making it secure to perform important backend errands

// ----------------------------------------------------------------------
    // What is REPL ? (01-C)
        // READ  --> Read User Input
        // EVAL  --> Evaluate User Input 
        // PRINT --> Print Output (Result)
        // LOOP  --> Returning & waiting for new input

        // R-E-P-L can be accessed by typing 'node' in the command promp
        // in R-E-P-L, the code isn't stored anywhere & all of it vanishes after the session terminates

// ----------------------------------------------------------------------
    // Javascript Brush-Up (01-D)
        
        // Difference between 'let' & 'var'

            // `var` have FUNCTION-LEVEL scope
            // variable declared with `var` --> becomes a GLOBAL VARIABLE --> accessible throughout the entire program

                const example1_var = () => {
                    var b = 10;
                    if (true) {
                    var b = 20; // this will overwrite the value of b declared above
                    console.log(b); // 20
                    }
                    console.log(b); // 20
                }
                example1_var();

            // `var` variables are "hoisted", which means they are moved to the top of their scope and can be accessed before they are declared
                // can be troublesome since it DOESN'T SHOW ANY CLEAR ERROR
                const example2_var = () => {
                    console.log(a); // undefined
                    var a = 10;
                    console.log(a); // 10
                }
                example2_var();


            // `let` have BLOCK-LEVEL scope
            // variable decalred with `let` INSIDE A LOOP --> NOT ACCESSIBLE OUTSIDE THE LOOP

                const example1_let = () => {
                    let c = 10;
                    if (true) {
                    let c = 20; // this will create a new variable c that is only accessible within this block
                    console.log(c); // 20
                    }
                    console.log(c); // 10
                }
                example1_let();

            // `let` or `const` variables are not "hoisted", which means they cannot be accessed before they are declared

                const example2_let = () => {
                    // console.log(d); // Uncaught ReferenceError: d is not defined
                    let d = 10;
                    console.log(d); // 10
                }
                example2_let();


        // Data Types (in Brief)
                
            // Javascript is a DYNAMICALLY TYPED Language  --> we do not explicitly mention the 'int', 'String', etc

            // There are two categories of Data Types in JS :
                // PRIMITIVE - Numbers , String , boolean , NULL , Undefined , (ES6)Symbols

                // REFERENCE - Objects , Functions , Arrays , Dates , Collections

            // Difference ? (Refer the below links)
                // https://www.youtube.com/watch?v=9ooYYRLdg_g
                // https://www.freecodecamp.org/news/primitive-vs-reference-data-types-in-javascript/

            // NOTE : If you want to MAKE A DUPLICATE COPY OF THE REFERENCE TYPES....
                // Object : 
                    // let secondObject = Object.assign({}, firstObject); 
                    // OR
                    // spread OPERATOR
                    const profile = {
                        name : 'Vansh',
                        age : 20,
                        dept : 'AI&DS'
                    }

                    const copiedObject1 = {...profile};
                    profile.name = 'Venom'; // to check if our object has been copied or not
                    console.log(copiedObject1);
                    delete profile.dept; // Deleting a property (IMPORTANT EXTRA INFO)
                    console.log(profile);

                // Array :
                    // let array2 = array1.slice();
                    // OR
                    // spread OPERATOR
                    const hobbies = ['Chess', 'Checkers'];
                    console.log(hobbies);
                    
                    const copiedArray = [...hobbies];
                    hobbies.unshift('Karting'); // to check if our array has been copied or not
                    console.log(copiedArray);


        // What Is SPREAD OPERATOR (...) ?

            // It takes out the array or object after the `...` --> pulls out all elements(of array) or properties(of object) --> puts it into whatever is around that spread operator
            // spread Operator can also used to UPDATE or ADD a KEY-VALUE PAIR in an existing OBJECT
            const copiedObject2 = {...profile, career: 'Engineer', age: 104}; // to demonstrate UPDATION & ADDING in an Object
            console.log(copiedObject2);

            const copiedArray2 = [...hobbies, 'Ludo']; // adds an element at the END of the Array items
            console.log(copiedArray2);


        // What is REST OPERATOR (...) ?

            // It is used to merge multiple arguments of the function (in which it is used) into an array
            // LAYMAN TERMS: When `...` is used in the argument list of the function, its the REST operator
            const convertToArray = (...args) => {
                return args;
            }
            console.log(convertToArray(1,2,3,"K"));


        // USE OF `this`
            // 1) `this` keyword refers to the current execution context. Basically used to grab & use the Objects's keys within the Object itself
            const person = {
                name : 'Nicholas',
                age : 38,
                greet: function() {
                    console.log('Hello, I am ' + this.name);
                }
            }
            person.greet();

            // 2) `this` keyword can also be used in constructor functions to refer to the instance of the object being created
                    // What Is A CONSTRUCTOR FUNCTION ?
                        // a constructor function is a special type of function that is used to create and initialize objects

                        function Patient(...args) {
                            this.entries = args.length;
                            this.firstName = args[0];
                            this.lastName = args[1];
                            this.age = args[2];
                            this.disease = args[3];
                            this.information = function() {
                                return 'Total DataPoints Entered:' + ' ' + this.entries + '\n' + 'Patient Name:' + ' ' + this.firstName + ' ' + this.lastName + '\n' + 'Patient Age:' + ' ' + this.age + '\n' + 'Patient Disease:' + ' ' + this.disease;
                            };
                        }

                        let patient1 = new Patient("Jer", "Koff", 69, "AIDS", "Male", "Unmarried");
                        console.log(patient1.information());

            // NOTE: USE ONLY NORMAL FUNCTION (NOT ARROW-HEAD ES6 FUNCTION) WHILE USING `this` Keyword INSIDE THAT FUNCTION


        // OBJECT DESTRUCTURING
            // It allows us to access elements in the object QUICKLY by their name & to DROP (NOT DELETE) the Data we don't need in that function (or in that block of code)
            // General Syntax:
                const { name } = person;
                console.log(name);

            // Use in FUNCTIONS:
                const printName = ({ firstName, lastName }) => {
                    console.log(firstName, lastName);
                }
                printName(patient1);


        // ASYNCHRONOUS

            // This is an ASYNC code, because it doesn't finish immediately (i.e THERE IS ANOTHER DELAY other than the Hardware)

                // PROMISES 
                const dataFetching = () => {
                    return new Promise((resolve, reject) => { // resolve: completes the promise successfully.....reject: rejects the promise (kinda throws an error)
                        let data = null;
                        setTimeout(() => {
                            if(data){
                                resolve(`Data: ${data}`);   
                            } else {
                                reject("Oops, Data NOT FOUND!");

                            }
                        }, 4000);
                    });
                }

                setTimeout(() => {
                    console.log("DATA FETCHING....");
                    dataFetching()
                        .then((value) => {
                            console.log(value);
                            // return dataFetching();
                        }, (error) => {
                            console.log(error);
                        });
                }, 2000);

            // These are SYNC code, because they are executed right after each other (i.e THERE IS NOT OTHER DELAY other than the Hardware)
                console.log('Hello!');
                console.log('How Are You?');

// ----------------------------------------------------------------------
    // NPM SCRIPTS (03-A)
        
        // To initialize a Node Project & also to use certain special (easier) functionalities of Node (i.e third-party modules), You first have to do `npm init`

        // This will create a package.json file, which will contain all the essential information regarding your Project (like, What all packages have ya used, etc)

        // Now we come to the `scripts` (inside package.json)

            // here, you can add your own scripts, so as to execute certain useful commands quickly, without typing the entire command in the terminal.

            // "start" command is a special/Reserved name in the `scripts`, where you can enter the 'entry file execution' as the value.

                // NOTE: If you want to share this project, people just have to run npm start {& they dont have to search for the entry file in your js files}

                // For Execution : `npm start`

            // if you execute a normal script (like, any custom script name that you've added) YOU CANT JUST TYPE `npm <script_name>`
                
                // For Execution : `npm run <script_name>`

// ----------------------------------------------------------------------
    // NPM PACKAGES (03-B)

        // npm packages can be divided into two categories :

                // 1) Development dependencies - packages which mostly help you during the development

                // 2) Production dependencies - packages that help you for the app, as it's running on the server
        
        // `npm install <package_name>`

            // Additionally: 

                // `npm install <package_name> --save-dev` 
                    // It will install the package as a 'development dependency'

                // `npm install <package_name> --save`
                    // This will install the package as a 'production dependency'

                // `npm install <package_name> -g`
                    // This will install the package NOT IN THIS PROJECT but GLOBALLY ON THE MACHINE, so we can use it anywhere (in other project as well)
        
        // IMPORTANT DETAIL: 
                // Suppose you have installed `nodemon` locally (in the project, not globally) 

                // & added `"start": "nodemon app.js"`

                // now, if you directly run `nodemon app.js` in the terminal, IT WON'T EXECUTE! (since not installed globally)

                // but, if you type `npm start`, IT WILL EXECUTE nodemon. i.e. NPM SCRIPTS WILL LOOK FOR LOCAL VERSION OF THE PACKAGE & EXECUTE IT


// ----------------------------------------------------------------------
    // ERRORS & Debugging (03-C)
        
        // Types :
    
            // Syntax Error 
                // --> typos in your code
                // --> thrown automatically when you run the program

            // Runtime Error
                // --> not typos
                // --> but when you execute the code, IT JUST BREAKS, WHEN IT RUNS

            // Logical Error
                // --> most difficult ones
                // --> NO ERROR MESSAGE THROWN
                // --> app doesn't work the way it should

// ----------------------------------------------------------------------

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
            // The Middleware(s) are always executed from TOP to BOTTOM { with the request going to the next middleware only if we've mentioned `next()` }

        app.use((req, res, next) => { 

            // 1) `Use` allows us to add a new 'middleware' function

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


// ----------------------------------------------------------------------
    // Templating Engines (05-A)

        // EJS 
            // <p><%= name %></p>
            // Use normal HTML and plain JavaScript in yout templates

        // Handlebars
            // <p>{{ name }}</p>
            // Handlebars have bit less features available than EJS
            // Use normal HTML and custom template language

        // Pug (Jade)
            // p #{name}
            // Use minimal HTML and custom template language
            // Indentations matter

// ----------------------------------------------------------------------
    // Model View Controller (MVC)

        // Separation Of Concerns
            // making sure that different parts of your code do different things and you clearly know which part is responsible for what.

        // Models
            // represents the "data" & "business logic" in your code
            // working with data, saving/fetching data, etc --> all under "Models"

        // Views (literally `views`)
            // represents "what users see"
            // It displays the data from the Model to the user
            // handles user interactions
            // It receives input from the user and sends it to the Controller for processing

        // Controllers
            // coordinates the interaction between the Model and the View
            // handles user inputs --> processes requests --> updates Model --> communicates with Views to render the appropriate response

            // ==> ROUTES
                // routes are basically the things which define upon which path for which http method which controller code should execute

// ----------------------------------------------------------------------

    // SQL vs NoSQL
    
        // Goal : Store Data & Make it Easily Accessible
        // That's why we use a Database

        // SQL
            // Characteristics :
                // Strong & Strictly Data Schema 
                    // --> so that for each table, we clearly define how the data in there should look like...
                    // i.e. which fields do we have, 
                    // which type of data does each field store (number, string, boolean, etc)
                
                // Data Relations
                    // we relate our different tables with basically three important kinds of relations,
                        // one to one, 
                        // one to many,
                        // many to many

                // Data is distributed across multiple tables which are then connected through RELATIONS
            
            // e.g:
                // SELECT * FROM users WHERE age > 28

        // NoSQL
            // We have a Main Database (let say `Shop`)
            // Within this, we have:

                // "Collections" ( equivalent to `Tables` in SQL)
                    // --> Users
                    // --> Orders
                // Within this, we store our data:

                    // "Documents" ( records of data )
                        // kind of look like JS Objects
            
            // Characteristics :  
                // We can see that NoSQL doesn't have a Strict Schema ("Documents" can have different strucures, i.e. not necessarily have the same format)

                // No Data Relations 
                    // Instead, we use duplicate data wherever we need that data from the different Collections
                    // No Connectiing of Tables required
                        // Drawback: If we want to update an User's information, then we have to individually change the info wherever it has been used in different Collections

                        // Advantage: Makes NoSQL VERY FAST & EFFICIENT to retrieve data & stuff

                    // you CAN relate documents but you don't have to (and you shouldn't do it too much OR YOUR QUERIES BECOME SLOW!)

                // (instead of RELATIONS) Works with Merged/Nested documents in an existing document

        // Horizontal vs Vertical Scaling

        // As our Application GROWS --> more data needs to be managed --> we need to SCALE OUR DATABASE

            // Horizontal Scaling:

                // In simple terms, it means "adding more servers to handle the increasing data and traffic"

                // the database system becomes distributed, and data is partitioned and spread across multiple machines

                // preferred in `NoSQL databases` as they are designed to scale horizontally by nature, allowing for seamless distribution of data across multiple nodes

            // Vertical Scaling:

                // In simple terms, it involves "upgrading the existing server hardware to handle increased data and traffic"
                    
                    // `upgrading` is done by "adding more resources (CPU, RAM, storage) to a single server"

                // the database system remains on a single machine, but it becomes more powerful and capable of handling larger workloads

                // preferred in traditional `SQL databases` where scaling horizontally can be more challenging due to the complex nature of "maintaining data consistency" across multiple nodes

// ----------------------------------------------------------------------
            

    // How To Use SQL in NodeJS?

        // Download MySQL Installer (for Windows)
            // --> basically downloads all MySQL products in ONE-GO

        // Open the WORKBENCH
            // set-Up a new connection (ONLY IF THERE IS NO EXISITING CONNECTION in the WorkBench)
            // else just open up the current running connection

        // Go To "SCHEMAS" & Create a New Schema

        // Now, we'll connect with this new Schema

        // Install `mysql2` npm package in your Node application

        // Two Ways to connect to our SQL Database

            // 1) we set up one connection which we can then use to run queries and we should always close the connection once we're done with a query

                // Using createConnection
                    // const connection = mysql.createConnection({
                    //     host: 'localhost',
                    //     user: 'root',
                    //     password: 'password',
                    //     database: 'mydatabase'
                    // });
                    
                    // connection.connect((err) => {
                    //     if (err) {
                    //     console.error('Error connecting to database:', err);
                    //     return;
                    //     }
                    //     console.log('Connected to database!');
                    //     // Perform database operations here
                    //     connection.end(); // Close the connection when done
                    // });

                    // Drawback: 
                        // we need to re-execute the code to create the connection for every new query
                        // & NOTE, there will be A LOT OF QUERIES
                    // ( Thus this method is inefficient )

            // 2) we create a so-called "connection pool"
                // it's a "collection of reusable connections"
                // The pool helps manage and reuse connections, improving performance and scalability

                    // const pool = mysql.createPool({
                    //     host : 'localhost',
                    //     user : 'root',
                    //     password : 'chheda1shvenom',
                    //     database : 'node-complete'
                    // });

                    // module.exports = pool.promise();

                // & in `app.js`:

                    // const db = require('./utils/database');

                    // db.execute('SELECT * FROM products')
                    // .then(result => {
                    //     console.log(result);
                    // })
                    // .catch(err => {
                    //     console.log(err);
                    // });