# CSF Software Developer Internship
-I completed this assignment using Node.js, Express.js, and SQLite3 using the public API Sportsmonks football.


## Walkthrough

-The CSF Software Developer Assignment contains all of the code. 

Make sure all neccessary dependencies are installed by running:
```
npm install express sqlite3 path
```
Navigate to this Software Developer folder in your terminal, and run:
```
node server.js
```
Ensure that the server is running successfully, and http://localhost:3000 should be linked to form.html.

On the web application, the form contains three questions. The POST / endpoint will post the user response to the three questions into an SQLite3 database created by the server, and the response id is returned.

Navigating back to http://localhost:3000, the Show All Responses button should display all recent responses on this server.

As the GET / endpoint, all responses are shown in JSON format at http://localhost:3000/responses.

AS the GET /{id} endpoint, the response with the specified response id at http://localhost:3000/responses/{id} is shown in JSON format.

## Public API
The Web Application should allow users to query the public API from Sportsmonks football where all teams are displayed in dropdown menus to help them in the form. 

## Discuss how the application and api could be extended and improved
I implemented a little bit of error handling but a lot more could be added to make the system more robust. By keeping safety design principles in mind, the form can be extended and user input can be guided and made simple with accessibility measures. Unit and coverage testing can be implemented to weed out any bugs and ensure that the system is working smoothly.

## Discuss how the application and api should be deployed
-The front-end web application can be deployed through hosting services onto public servers with custom domain names.

-The back-end web application can be deployed using hosting services, and Git or a CI/CD pipeline.

## Intuitive design and user interface
-The web application is only built with HTML, I can utilize CSS and frameworks like bootstrap to make the interface more intuitive and accessible. 