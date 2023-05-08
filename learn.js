// ----------------------------------------------------------------------
    // What Is Javascript ?
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

    // NodeJS's Role in Creating A Server (How WEB Works)
        
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
    // What is REPL ?
        // READ  --> Read User Input
        // EVAL  --> Evaluate User Input 
        // PRINT --> Print Output (Result)
        // LOOP  --> Returning & waiting for new input

        // R-E-P-L can be accessed by typing 'node' in the command promp
        // in R-E-P-L, the code isn't stored anywhere & all of it vanishes after the session terminates

// ----------------------------------------------------------------------
    // Javascript Brush-Up
        
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
        