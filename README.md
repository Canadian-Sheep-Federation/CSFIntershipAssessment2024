# CSF Intership Assessment 2024

If you are interested in an internship opportunity with the Canadian Sheep Federation for Summer 2023, please complete the tasks outlined in the .md file relevant to what you are interested in doing this summer.

E.g. those interested in QA should complete the QA assignment.


# TV Show Rater

## Demo
![Watch Demo](demo.mp4)

## Technologies Used
- Node.js v20.10.0
- MongoDB (local installation)
- Node.js + Express for the Backend
- React for the Frontend
- [TV Maze API](https://www.tvmaze.com/ap)

## Install Instructions

1. **Installing MongoDB**:
   - Follow the instructions [here](https://www.mongodb.com/docs/manual/installation/) to install MongoDB locally on your machine.
   - Ensure MongoDB is running locally at `localhost:27017` as the steps further assume this configuration.

2. **Installing the Dependencies**:
   - Navigate to the `web-app` directory and run `npm install` to install frontend dependencies.
   - Navigate to the `api-server` directory and run `npm install` to install backend dependencies.

3. **Building the Backend**:
   - In the `api-server` directory, run `npm run build` to build the backend.

## Running the Project Locally

1. **Starting the Backend**:
   - Open a terminal and navigate to the `api-server` directory.
   - Run `npm run start` to start the backend server.

2. **Starting the Frontend**:
   - Open another terminal and navigate to the `web-app` directory.
   - Run `npm run start` to start the frontend server.

3. **Viewing the Web Application**:
   - Open your web browser and go to [http://localhost:3000](http://localhost:3000) to view the web application.



## Discuss how the application and api could be extended and improved
- The api can be improved by caching most searched for shows or caching the result from getting all rated tv shows. TV Maze api already implements caching on their end as well.


## Discuss how the application and api should be deployed

- The backend can be run on a dedicated server on something like AWS or Azure, however after doing this, the frontend needs to be updated where all the API URLs need to start with the web host's public URL. For example, changing `localhost:5000/show` to `(web host's URL)/show`.

- Similarly for the frontend, we can use the built `index.html` file from react and serve that, so in node+express, we can make another server on a different host that only serves the built frontend. Which would look something like this in node:
```js
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
```
