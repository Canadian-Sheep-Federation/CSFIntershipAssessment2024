To use this application install node.js and nodemon npm

npm install -g nodemon

run the application from the /softwaredev folder
nodemon app.js 

================================================================================================
Background

    - An API that writes to a data store(MongoDB using Mongoose
    - A web application that consumes the API you've developed and a public API of your choosing(TheCatAPI)


================================================================================================
API

To run this program, move to my CSFIntershipAssessment2024\softwaredev directory and run
nodemon app.js to start the program

-   POST /: Takes in the form and stores it in your chosen data store.
    Should return the id of the newly created form response.
	= My api takes in breed,img url, wikipedia url, and an ID and POSTs it to the MongoDB database
	
-   GET /{id}: Returns the form corresponding to the id. E.g. GET /1
    would return the form corresponding to the id 1
	= My api takes an ID and GETs it to the MongoDB database
	
-   GET /: Returns all responses to the form
	= My api gets a response on /getcats and will return the json containing all the cats