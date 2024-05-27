# PROJECT INSTALLATION AND USAGE

## OVERVIEW
As per the understanding, a project of movie survey has been created which will take inputs from customer and store in the database. MongoDB database is used as a data store. API is created which connects with the MongoDB database for storing and fetching the data entries.

## UI WORKING
1. Customer needs to input his/her name, movie name and rating into the designated spaces and press 'Submit'.
![alt text](image.png)
2. After submitting response, all the entries will be visible to the customer.

## WORKING STEPS
1. Install Node.js, npm (Node Package Manager), and MongoDB on the Windows system.
2. Also, mongoose and axios libraries are required to be installed.
3. Download and setup the DataAPI and WebAPI of the movieSurveyApi project .
4. Start mongoDB by running "mongod" in cmd.
5. Start the DataAPI and WebAPI servers with "node index.js" command in powershell terminal of both projects.

## TESTING OF THE WEB APPLICATION
1. Start the server : node index.js
2. Open the web browser and navigate to http://localhost:3001.

    - On the home page, you can view all survey responses.
    - Click the "Submit a new response" link to fill out and submit a new survey.

## Questions asked in the assignment
Question 1: Discuss how the application and api could be extended and improved
Currently, this project is in javascript. To improve the code quality and enhanced developer productivity, it can be cretaed in typescript. 
The UI is very basic. It can also be improved and made more user interactive.

Question 2: Discuss how the application and api should be deployed
This project can be deployed on Github, Netlify. Most importantly, it can be deployed on Azure or other cloud servers with more authorization and authentication provided by the cloud servers.