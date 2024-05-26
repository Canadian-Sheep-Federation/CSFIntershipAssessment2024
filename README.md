# Henry Brown's CSF Internship Assessment 2024

For my assessment I decided to use NodeJS express and vanilla JS for the front end. I used the cocktail database's API (https://www.thecocktaildb.com/api.php) to query through cocktails and add them to my own database along with metadata inputted by the user to be operated on.

Watch my demo video here: https://youtu.be/0cPYpncagfo

Note: you can `node dbInit.js` to reset your cocktail database.

## Installation and Running Instructions

### API

1. Open a terminal window and cd to the api folder.
2. `npm install` if this is first time use, to install API dependencies
3. `npm start` to start the API server, it should run on port 3000

### Website

1. Open a terminal window and cd to the site folder.
2. `npm install` if this is first time use, to install site dependencies
3. `npm start` to start the Website server, it should run on port 1234. Then go to http://localhost:1234 to view the site.

## Discuss how the application and api could be extended and improved

As of now, the website cannot update cocktail items, so this would be a feature that I would love to add. There are also other querying features that could be added, like searching your saved cocktails based on the name or filtering based on specific ingredients that you have. If this was ever to be deployed it would be great to add a user system so that multiple people could use the site at once all with separate cocktail databases.

On a more general note, I would love to build this with React. I am not as familiar with it so I went with vanilla JS but as the project scales I could definitely see some issues with how I have structured it and handling state could become increasingly challenging / frustrating. So building it with a framework like React could potentially be a good improvement.

This was my first time building an API with NodeJS and express so I am sure there is ton of room for improvement. Overall, I think adding more ways to query the user-added items would be an interesting route for improvement.

## Discuss how the application and api should be deployed

I would want to migrate the database to a service that is tailored to handle a more complex database, like MongoDB or AWS RDS prior to deployment. To deploy the API it, first it could be containerized, and it would be best to use a service like Heroku, AWS or Google Cloud Hosting. Then the site could be hosted Netlify, Github Pages or any other site hosting service that would be able to service the needs of the user base.