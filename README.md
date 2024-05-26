CSF Intership Assessment 2024 Submission by Armaan Mangat

I developed an api using node.js and express with mongodb. Web app using next.js. The idea I had was to use the public coffee api and build another api to build a review database classifying all the different types of coffee in the picture and a review of the picture and whether it would be recommended by the reviewer. 

To run the api, first create a .env file in the api folder and fill in DATABASE_URL = <> with a mongodb cluster connection link
from the /api directory, npm start.
to run web app, from the /react-app/coffee-review/ directory, npm run dev. since the api is running on port 3000, the web app will pick another port, probably 3001. The app will be accessible on localhost:3001. 

The web app gets a random image from the public coffee api and displays it, there is a button under it that goes to a review form. The review form is supposed to submit the data to the api that I designed, but it is not fully functional. There is also a new image button which reloads the page and gets a new image. 
