# Project Preview

# Running The Project

You need to run the frontend and the backend for the project to work

To start the backend cd to the `server` directory and use the command

```
npm start
```

To start the frontend cd to the `client` directory and use the command

```
npm start
```

**Important: make sure to run the backend before running the frontend!**

*Note: You need to have two seperate terminals open to run the project*

# Interacting with the project

The frontend will be running at `localhost:3000` and the backend at `localhost:8000`

Once you load the frontend
you are able to add new quotes to the database using the form on the left and hitting submit
and randomly get a new quote using the button

Going to the backend directory you can see the json that gets sent from the endpoints.

The endpoints are
- /
    - This will return all the quotes in the database
- /random
    - This will get a random quote from the database
- /:id
    - This will get a quote with a specified id

# Future Improvements / Extensions

- Make the UI work on mobile
- Allow users to filter quotes from the api by genre or author
- Make the image in the back load faster upon first launch
- Make the app able to see all the quotes added to the database
- Make it so a user can get multiple random quotes from the database at once
    - maybe use an endpoint like `/random/amount` or a query with the amount
- Make it so a user can filter the results of an api call
    - like getting all quotes in the database with a certain genre or author
    
# Deployement

**Frontend**

To deploy the frontend you would have to use `npm build` in the client folder to compile the react app.
Then you can package the build up and either put it right on the website it needs to be on using something like cpanel or fit it into your infrastructure where it needs to go.

*Note: Some things in the frontend files would need to change, like the proxy in the `package.json` file. it would need to be changed to the url of the backend or api so that the calls are correct.*

**Backend**

To deploy the backend you would have to first change a couple of relative paths in the files so that they would work once deployed. The process for deployment highly relies on the infrastructure you are deploying to. You may need to containerize it so that it would work on kube or other similar services or it may work the same as the frontend where you can just plop it into cpanel or a similar application and it just works.