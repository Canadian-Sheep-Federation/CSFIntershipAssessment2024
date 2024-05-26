# What is this project about

This is an software developer internship for Canadian Sheep Federation

# What technologies are used in the project

This is made using React, React Router Dom, and tailwindcss on the frontend and Express and SQLite3 for the backend

# How to run the project

To run the project, Git clone the whole project cd into the inidividual folder for example if its api then cd dog-feedback-api then npm install and npm start for the frontend cd dog-feedback-frontend npm install and npm run dev


# How this application and api can be improved

There are couple of things that can be done to improve the application and api

- Add more information about the breed
- Can compare between multiple breeds to see the differences
- Can create user authentication so that the images can be favorited for later
- Can only update/delete their own reviews


# How to deploy the application


I would deploy both frontend and backend application in vercel, There are couple of things I would need to update my application. First of all is creating .env file which will use to set up the port number for backend. Once that is done, I will link my backend to a new vercel project and configure the port, Since i used sqlite3 i do not need to set up any database so i am good to deploy my backend. Afterwards I will deploy my frontend, same as before i will create a .env file where i will save the base api for example localhost:3000/ for my backend request since it will change. After updating the code i will update the dotenv file in vercel with the new server url which we get from hosting our backend. Select the npm run build command in vercel and deploy the frontend. Now both frontend and backend has been deployed and can use our full fledged web application on vercel.  