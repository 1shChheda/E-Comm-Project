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
const Product = require('./models/productData');

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
                    //     password : 'password',
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

// ----------------------------------------------------------------------
    // SEQUELIZE

        // To Focus On NodeJS & Bussiness Logic, Not SQL commands/queries

        // What is Sequelize ?
            // a Third Party Package
            // precisely, it's an Object Relational Mapping library (ORM)

            // What is ORM ?
                // Object-Oriented Programming (OOP) <----> Relational Databases

                // It performs all the SQL Code behind the scene &
                // maps it into Javascript Objects with "convenience methods" which we can call to execute that behind the scenes SQL code 
                // so that we never have to write SQL code on our own
            
            // Sequelize allows us to `define models` that represent `database tables`
            // and then interact with those models to perform CRUD (Create, Read, Update, Delete) operations

        // Core Concepts : 
            // Models          e.g. User, Product
            // Instances       const user = User.build()
            // Queries         User.findAll()
            // Associations    User.hasMany(Product)

        // To Install `sequelize` --> `mysql2` package MUST BE INSTALLED AS WELL

        // Main Implementation : 
                // 1) Database Connection (in 'utils/database.js')

            // CREATE (C)
                // 2) Model Creation (using 'sequelize.define(modelName, attributes, options)')
                // 3) Model Instance Creation [i.e. Record feeding in DB] (using `Product.create()`)

            // READ (R)
                // 4) Data Fetching (using 'Product.findAll()')
                        // Product.findAll({
                        //     where : Sequelize.and(
                        //         { name : 'Vansh' },
                        //         { age : {
                        //             gt : 18
                        //         } },
                        //         { income : {
                        //             lte : 100000
                        //         } },
                        //         Sequelize.or(
                        //             { cgpa : { in: [4,5,6] } },
                        //             { cgpa: { gt : 8 } }
                        //         )
                        //     )
                        // })
                
                // 5) Fetching a particular Product/Item from the database (using 'Product.findByPk(productId)' )

            // UPDATE (U)   
                // Retrieve the record you want to update using one of the READ methods
                // Modify the desired fields of the retrieved record object
                // 6) Call the "save()" method on the record object to persist the changes to the database.

            // DELETE (D)
                // To delete a record from the database using Sequelize, follow these steps:

                // Retrieve the record you want to delete using one of the read methods.
                // 7) Call the "destroy()" method on the record object to remove it from the database
    

        // Association 

            // Product <---------------------------Has Many--------------------------- User
            //    |                                                                     |
            //    |                                                                     |
            //    |                                                                     |
            //    ---------Belongs to Many------------> Cart <------------Has One--------
            //    |                                                                     |
            //    |                                                                     |
            //    |                                                                     |
            //    ---------Belongs to Many-----------> Order <------------Has Many-------


// ----------------------------------------------------------------------
    // REST APIs

        // What is it? Why is it required?

            // Not Every FRONTEND (UI) requires HTML Pages { like we've used so far }

                // for Example:
                    // Single Page Web Apps: 
                        // Udemy Course Website

                            // When we go-through OR click on different sections of the page, we notice that the "reload icon" of the browser stays still.

                            // i.e. all these parts do re-render "without the page reloading / page being refreshed"

                            // Reason?

                                // The entire page is rendered through "Browser Side Javascript" (not Server Side Javascript)

                                // & this JS code can manipulate the DOM

                    // so basically what happens is: 
                    // you only fetch one inital HTML page, that does not really contain a lot real HTML content, 
                    // but that does load all these JS script files,
                    // & then these JS scripts reach out to some Backend API, to a Restful API & only fetch the data they need to work with, to then re-render the UI
                    
            // Core Logic : We only want to exchange the data from the Backend, & not render HTML pages

                // --> Transfer Data instead of User Interfaces
                

        // "RE"presentational "S"tate "T"ransfer (REST)

        // NOTE : Only the response (& request data) changes, NOT the general server-side logic !

        // Data Formats :
            // HTML
            // Plain Text
            // XML
            // JSON (recommended)

        // HTTP Method & Path   --->   API Endpoints

            // HTTP methods (HTTP Verbs)

                // GET (get a Resource from the Server)

                // POST (post a Resource to the Server {i.e. create or append Resource})

                // PUT (put a Resource onto the Server {i.e. create or overwrite a Resource})

                // PATCH (Update parts of an existing Resource on the Server)

                // DELETE (Delete a Resource on the Server)

                // OPTIONS (Determine whether follow-up Request is allowed {sent automatically})

// ----------------------------------------------------------------------

    // MongoDB

        // Why was it Built? 
            // for Large-Scale Applications
            // To Store & Work with Lots & Lots of Data 
            // It's really Fast

        // As we know, It does not have Relations (like SQL)

            // Therefore, there are lot of cases of data duplication

            // there are many times we need to work with that data a lot, & Hence it would change a lot& you'll have to manually update it in all duplicate places

            // using Embedded/Nested Documents is not Ideal here

            // So, we use "References" here instead

// ----------------------------------------------------------------------

    // SetUp & Use MongoDB with NodeJS

        // We can install MongoDB locally, by downloading it from "Community Server" & following instructions

        // OR

        // Use a "Cloud Solution" instead (which is more realistic while deployment + it's free)
            // --> MongoDB Atlas 

        // Choose the "M0 - FREE" Cluster

        // After creating the Cluster,
            // under "SECURITY" --> create a User --> "with `User Privileges` => "Read and Write to any Database"

            // also look into "IP Whitelist"
                // contains all the IP addresses that are allowed to connect to your MongoDB Server

                // "Add your Current IP Address"
                    // Node runs locally on your machine --> so your Node app will have this IP Address

                // When we Deploy the Node app --> use `IP Address of your Server`

            // Now connect your application with MongoDB
                // use the MongoDB URI (srv) --> to connect to the MongoDB & particular database

        // Basic Connection Setup in "utils/database.js" file :

                const { MongoClient } = require('mongodb');

                let _db;
                
                const mongoConnect = callback => {
                MongoClient.connect(process.env.DB_URI)
                    .then(client => {
                        _db = client.db();
                    })
                    .catch(err => {
                    console.log(err);
                    throw err;
                    });
                
                    callback();
                };
                
                const getDb = () => {
                if(_db) {
                    return _db;
                }
                throw "No Database Found!"
                };
                
                module.exports = {
                    mongoConnect : mongoConnect,
                    getDb : getDb
                }

// ----------------------------------------------------------------------

    // CRUD Operations With MongoDB

        // "WRITE" Operations --> insert, modify, or delete documents in our MongoDB database

            // Insert Data

                // insertOne() --> to insert a single document 

                    const database = db.getDb();

                    const Product = database.collection("products");

                    const userDoc = { name : "Vansh", age : 20, emailAddress : "test@test.com", country : "India" }

                    Product.insertOne(userDoc)
                        .then(result => {
                            console.log("Document Added!");
                        })
                        .catch(err => console.log(err))

                // insertMany() --> to insert many documents

                    const database = db.getDb();

                    const Product = database.collection("products");

                    const usersDoc = [
                        { name : "Vansh", age : 20, emailAddress : "test01@test.com", country : "India" },
                        { name : "Darshil", age : 22, emailAddress : "test02@test.com", country : "Delhi" },
                        { name : "Kimaya", age : 19, emailAddress : "test03@test.com", country : "Lucknow" }
                    ];

                    Product.insertMany(usersDoc)
                        .then(result => {
                            console.log("Document(s) Added!");
                        })
                        .catch(err => console.log(err))

            // Delete Data

                // deleteOne() --> to delete a single document

                // deleteMany() --> to delete more than one document

            // Retrieve Data

                // If you want to retrieve results based on a certain set of criteria, use "find()" or "findOne()"
                    // find() 
                        // --> to find All Documents matching the given Query
                        // returns a "Cursor" object that represents the result set of the query
                        // Convert the "Cursor" object into an Array { using ".toArray()" } & then use Promise Chaining to return the documents
                    
                    // findOne()
                        // --> to find the first matching document (or Single Document) matching the Query
                        // returns the matching document or "null" if there are no matches

            // Change Data

                // We can change documents in a MongoDB collection using either "update" or "replace" operations.

                // Difference :
                    // Update operations mutate specified fields in one or more documents and leave other fields and values unchanged
                    // Replace operations remove all existing fields in one or more documents and substitute them with specified fields and values

                    // Update Ops
                        // updateOne() --> takes minimum two arguments 
                            // --> 1st Argument : "filter" which defines which document we want to update {a JS Object}
                            // --> 2nd Argument : {a JS Object} to tell how do you want to update the document

                                // Update Operators : (for 2nd Argument)

                                    // $set: replaces the value of a field with a specified one
                                        // db.collection.updateOne(
                                        //     { <filter> },
                                        //     { $set: { <update> } }
                                        // )

                                    // $inc: increments or decrements field values
                                        // db.collection.updateOne(
                                        //     { <filter> },
                                        //     { $inc: { <field>: <value> } }
                                        // )
                                    
                                    // $rename: renames fields itself
                                        // db.collection.updateOne(
                                        //     { <filter> },
                                        //     { $rename: { <oldField>: <newField> } }
                                        // )

                                    // $push : to add an Element to an Array
                                        // db.collection.updateOne(
                                        //     { <filter> },
                                        //     { $push: { <arrayField>: <element> } }
                                        // )                                     
                                    // $unset: removes fields itself
                                    
                                    // $mul: multiplies a field value by a specified number

                        // updateMany() --> to update multiple documents that match the specified filter with the given update
                            // db.collection.updateMany(
                            //     { <filter> },
                            //     { $set: { <update> } }
                            // )


        // Comparison Operators in MongoDB 

            const doc = {
                price : {
                    $gt : 50,
                    $lte : 200
                },
                category : {
                    $nin : ["Healthcare", "Education", "Defence"]
                }
            }

                // 1) Equality Operators:

                //     $eq: Matches values that are equal to a specified value.
                //         Example: { field: { $eq: value } }
                //         Explanation: Selects documents where the value of field is equal to value.

                //     $ne: Matches values that are not equal to a specified value.
                //         Example: { field: { $ne: value } }
                //         Explanation: Selects documents where the value of field is not equal to value.

                // 2) Comparison Operators:

                //     $gt: Matches values that are greater than a specified value.
                //         Example: { field: { $gt: value } }
                //         Explanation: Selects documents where the value of field is greater than value.

                //     $gte: Matches values that are greater than or equal to a specified value.
                //         Example: { field: { $gte: value } }
                //         Explanation: Selects documents where the value of field is greater than or equal to value.

                //     $lt: Matches values that are less than a specified value.
                //         Example: { field: { $lt: value } }
                //         Explanation: Selects documents where the value of field is less than value.

                //     $lte: Matches values that are less than or equal to a specified value.
                //         Example: { field: { $lte: value } }
                //         Explanation: Selects documents where the value of field is less than or equal to value.

                // 3) Inclusion/Exclusion Operators:

                //     $in: Matches any of the values specified in an array.
                //         Example: { field: { $in: [value1, value2, ...] } }
                //         Explanation: Selects documents where the value of field matches any value in the specified array.

                //     $nin: Matches none of the values specified in an array.
                //         Example: { field: { $nin: [value1, value2, ...] } }
                //         Explanation: Selects documents where the value of field does not match any value in the specified array.

                // 4) Existence Operators:

                //     $exists: Matches documents that have the specified field.
                //         Example: { field: { $exists: true } }
                //         Explanation: Selects documents where the field exists.

                //     $type: Matches documents based on the BSON type of a field.
                //         Example: { field: { $type: "type" } }
                //         Explanation: Selects documents where the field has the specified BSON type.

            // What's the USE Of these Operators ? 
                // These operators can be used in various query operations such as 
                    // find, 
                    // update, and 
                    // delete 
                // --> to filter documents based on specific conditions

// ----------------------------------------------------------------------
    // Firebase Token Authentication
        // I had applied this in an another project, so thought to document my understanding of it over here, for future understanding

        // 1) Generating Firebase Key:

            // A service account key file (lemo-project-2143f-firebase-adminsdk-5e83x-f80230b3e2.json) is generated from the Firebase console. This key file contains the necessary credentials for authenticating and accessing Firebase services
        
        // 2) firebaseAdmin.js (in Utils folder):

            // The firebase-admin package is imported, which provides the necessary functionality to interact with Firebase services on the server-side
            // The service account key file is required using require() and assigned to the serviceAccount constant
            // The admin.initializeApp() method is called to initialize the Firebase Admin SDK with the provided service account credentials
            // The admin object is exported to make it accessible in other modules
            // CODE:
                const admin = require('firebase-admin');

                const serviceAccount = require('../lemo-project-2143f-firebase-adminsdk-5e83x-f80230b3e2.json');

                admin.initializeApp({
                credential: admin.credential.cert(serviceAccount)
                });

                module.exports = admin;

        // 3) tokenVerify.js:

            // The firebaseAdmin module (FirebaseAdmin.js) is imported, which provides the initialized admin object for interacting with Firebase services
            // The tokenVerify middleware function is defined, which is responsible for verifying the Firebase ID token sent with the request
            // The token is extracted from the request headers or body
            // If the token is missing, an error response is sent back indicating unauthorized access
            // The admin.auth().verifyIdToken() method is used to verify the Firebase ID token. If the verification is successful, the decoded token is obtained, and the uid property is assigned to the req object for further processing
            // If there is an error during token verification, an error response is sent back
            // CODE:
                const admin = require('../../Utils/firebaseAdmin');
                const logger = require("../../Utils/logger");

                const tokenVerify = async (req, res, next) => {
                    try {
                        // to get the firebase ID token from the request headers or body
                        const token = req.headers.authorization || req.body.token;

                        if (!token) {
                            const RESPONSE = { error: "Unauthorized Access" };
                            logger.writeLog(req, RESPONSE, "view", "user");
                            return res.status(401).json(RESPONSE);
                        }

                        // to verify the firebase ID token
                        const decodedToken = await admin.auth().verifyIdToken(token);
                        logger.writeLog(req, decodedToken, "view", "user");
                        console.log(decodedToken);
                        req.uid = decodedToken.uid; 

                        next();
                    } catch (error) {
                        const RESPONSE = { error: `Token Verification Error: ${error}` };
                        logger.writeLog(req, RESPONSE, "view", "user");
                        return res.status(401).json(RESPONSE);
                    }
                };

                module.exports = tokenVerify;

            // 4) authRoute.js:

                // The express module is imported, and a router object is created using express.Router()
                // The body method from the express-validator package is imported for request body validation
                // The tokenVerify middleware is imported for token verification before accessing the protected routes
                // The signup and login routes are defined using router.post(), and the corresponding controller functions from authCtrl (authController.js) are assigned as route handlers
                // The router object is exported to be used in the main application file
                // CODE:
                    const express = require('express')
                    const router = express.Router();
                    const { body } = require('express-validator');
                    const tokenVerify = require("../Middleware/tokenVerify");
                    const authCtrl = require('../Controllers/authController')

                    router.post("/signup", tokenVerify, authCtrl.userSignup);
                    router.post("/login", tokenVerify, authCtrl.userLogin);

                    module.exports = router

// ----------------------------------------------------------------------
    // Cookies

        // What is a Cookie?
            // the user is interacting with the Frontend
            // he submits a request to our node server
            // Now let's say that request requires us to store some kind of data in the browser
            // let's say we have a login page and when the user logs in, we want to store the information that the user is logged in somewhere so that when the user reloads the page and therefore technically a new request is sent, we still have that information around that the user is logged in
            // for that, we can send back a cookie with the response we send back upon the request
            // So the user submits the login data and we return a response (ex: redirect to a view page), BUT we also include our cookie,
            // thus telling us that the user is authenticated
        
        // So, COOKIES are stored on the CLIENT-SIDE
        
        // authController.js CODE:
        const getLogin = (req, res, next) => {
            const isLoggedIn = req.get('Cookie')?.split('=')[1] === 'true'; // Cookie Extraction // Using optional chaining to handle undefined
                // Note : Cookies can be manipulated from browser-side
            res.render('auth/login', {
                pageTitle: "Login",
                path: "/login",
                isAuthenticated: isLoggedIn || false, // Default value when 'Cookie' header is not present
            });
        };
        
        const postLogin = (req, res, next) => {
        
            // req.isLoggedIn = true; 
                // Even if we do this, in hopes to use "request" to save the "login status" to "true", IT FAILS (i.e. you wont be able to see "Admin Products" or "Add Products")...but WHY??
        
                // IMPORTANT:
                    // the request is dead, it's done. With a response, we basically finished a request
                    // we got a request and we sent a response, & we're done
                    // This data does not stick around
                    // This data is lost after the request or after we send the response
        
                // But you might wonder, why did the "req.user" work so fine then (in app.js),....it should have died too, right?
                    // well, that middleware (app.use...) runs on every incoming request before our routes handle it
                    // So the data we store here is used in the same request cycle, in our route handlers / controllers
        
            // res.setHeader('Set-Cookie', 'loggedIn=true'); 
                // 1st Argument: 'Set-Cookie' is a reserved name, to set Cookie
                // 2nd Argument: value of the Header (simplest form => key-value pair)
        
                // Cookie Configurations:
                    // To set a Expiry Date for the Cookie, else it'll die once you close your Browser
                    const expiryDate = new Date();
                    expiryDate.setDate(expiryDate.getDate() + 7); // Add 7 days to the current date
        
                    // Secure -> this cookie will only be set if the page is served via https
        
                    // Domain: URL -> domain to which the cookies should be sent (for that tracking thing)
        
                    // HttpOnly -> prevents client-side JavaScript from accessing the cookie
                    //          -> This adds an extra layer of security against cross-site scripting (XSS) attacks
                    res.setHeader('Set-Cookie', `loggedIn=true; Secure; Expires=${expiryDate.toUTCString()}; HttpOnly`);
        
            res.redirect('/')
        
        };
        
        module.exports = {
            getLogin: getLogin,
            postLogin: postLogin
        }

// ----------------------------------------------------------------------
    // Sessions

        // Why use it?
            // suppose we have to store some user information (for authentication, or activity tracking, etc)
                // NOTE: 
                    // we can't store it in a request (since it won't work, as we saw) -> requests die after we send a response
                    // NOR will we store it in some variable in our express app -> because that would be shared across all users and all requests
                // VERY IMP: 
                    // we only want to share the information across all requests of the same user
                    // so that other users can't see your data, can't assume your role
            // instead of storing essential user information in frontend (in cookies) (which we learnt is a BAD PLACE for such a thing) -> since it can be manipulated easily
            // we'll store it in the backend with a so-called session

        // So, SESSIONS are stored on the SERVER-SIDE

        // Start by storing this info in "Memory" Session Storage
        // After that, move to learn to store it on "Database" Session Storage

        // Now,
            // A client needs to tell the server to which session he belongs
            // we'll use a cookie where we will store the ID of the session
            // we'll not store the actual ID, but a Hashed Id of the session, so that only server can confirm its authenticity 
                // so that even if its manipulated, security is intact
        
        // package used : "express-session"

        // First, setUp the session Middleware in app.js
        // then access & use that session (+ cookie) in your auth.js
        // in your browser, you'll see a new cookie ('connect.sid'), that's the session cookie
            // it'll by default expire when you close your browser
        
        // Now, for storing sessions in Database!
            // go to github docs --> "https://github.com/expressjs/session"
            // there, at the bottom, you can find the packages suitable for the "session store" for the database of your choice

            // install the package

    // IMP: a "Session Cookie" is not necessarily used to identify a session, they're just called so because they only survive as long as you're using that page in the current browser

    // Additionally, There are two major types of Cookies:
        // 1) Session Cookies
        // 2) Permanent Cookies --> one's which we set an expiry date for (i.e. they do not go away necessarily when you close the browser)

// ----------------------------------------------------------------------
    // Authentication!

        // Why need it?
            // We need to be able to differentiate between anonymous users who are not logged-in and logged-in users
            // & We need to provide a flow, a view and the backend logic that allows people visiting our page to sign up and then to sign in
            // & then we can use sessions to store the information whether a user is signed in and well let him interact with the page across requests

        // How is it Implemented?
            // NOTE: assuming User has already Signed-Up
            // A user sends a "Login Request" with "email" & "password"
            // We check & verify his credentials
            // If verified, we create a "Session" for this user (to identify him for future requests)
            // We send a 200 Response & also store the Session info in a "Cookie"
            // Then when the User tries to access Restricted routes, we can use the "session" to check is the user is logged-in or not

// ----------------------------------------------------------------------
    // CSRF ATTACKS
        // Cross Site Request Forgery
            // a special kind of attack pattern WHERE people can abuse your sessions and trick users of your application to execute malicious code
            
            // How does it work?
                // 1) User logs into your website and gets a session cookie
                // 2) Attacker sends an email with a link to a fake website that looks like your real website
                // 3) User clicks the link, thinking it's your real website, and lands on the fake website
                // 4) The fake website sends a hidden request (POST) to your real website, asking to transfer money to another account
                // 5) The request includes the user's valid session cookie (since the user had already logged in at Step 1), making it look like a legitimate request
                // 6) Your server processes the request using the user's session and transfers the money, thinking it's a genuine action by the user

            // How to protect from it?
                // We have to ensure that people can only use your session if they are working with your views (views rendered by your application)
                // so that the session is not available on any fake page
                // to ensure his, we use "CSRF Tokens"

        // CSRF Tokens
            // package used: "csurf"

            // It is a hashed value
            // We embed it into our forms (/ inside our views) for every request that does something on the backend (that changes the users state)
            // We can include such a token in our views then and on the server, this package will check "if the incoming request does have that valid token"

            // How does this protect us?
                // The request sent by the fake site to our backend can theoretically use user session
                // BUT! Such requests will be missing the token 
                // This token is impossible TO GUESS or STEAL (bcoz a new token is generated for every page we render)

        // Implementation:
            // require in app.js --> const csrf = require('csurf');
            // extract the middleware outta it --> const csrfProtection = csrf();
            // use the middleware after session initialization (in app.js) --> app.use(csrfProtection);

            // NOTE: for any NON-GET Request, this package will look for the existance of a CSRF Token (in the request body)

            // for that, we need to make it available in our view first, RIGHT?
                // To start with, add it in Homepage Controller (so we can access it in LogOut button in Navbar)

                // NOTE: the "name" of the hidden input field will be "_csrf"

                // also, we'll need to use it alongisde all our Routes further