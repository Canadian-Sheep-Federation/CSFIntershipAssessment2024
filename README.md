# CSF Software Developer Assessment 2024

## Background

A simple social media web application that uses [Dog API](https://dog.ceo/dog-api/) to randomly generate images. The API/backend was developed using Node.js, Express.js and SQLite. The frontend was developed with React and React-Router.

### Instructions

#### API

1. In a terminal, navigate to the `api` folder of this project.
2. Run `npm install` to install the server's dependencies. (Only for first time use)
3. Enter  `npm run dev` to start the server. This will start on [http://localhost:3000](http://localhost:3000).

#### Client
1. In a new terminal, navigate to the `client` folder of this project.
2. Enter `npm install` to install the client's dependencies. (Only for first time use)
3. Enter `npm run dev` to start the client. This will start on [http://localhost:5173](http://localhost:5173).


## Discuss how the application and api could be extended and improved

- Additonal routes could be added to provide functionalities such as deleting or editing posts (using DELETE or PATCH)
- Rate limiting to protect API from DOS attacks
- Login/authentication routes/middleware for sign-in/sign-up 
- Could implement caching on client or intermediary key-value datastore with Redis to retrieve data that infrequently changes

## Discuss how the application and api should be deployed

- Various hosting services such as Vercel, AWS, Netifly, GCP etc.
- Could utilize FaaS (AWS Lambda or GCP Cloud Functions) to deploy less computationally heavy API/application
- Could also containerize application with Docker and deploy on virtual machine (AWS EC2)