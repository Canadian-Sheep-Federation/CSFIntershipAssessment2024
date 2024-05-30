# Dog Picture Viewer and Favourite Dog Leaderboard

This is a simple web application that allows users to view random pictures of dogs, submit their favourite dog breed along with their name and country, and view a leaderboard of the most popular dog breeds.


## Features

- View random pictures of dogs by entering a dog breed (dog breed database from dog API used to give typing recommendations).
- Submit your favourite dog breed along with your name and country.
- View a leaderboard of the most popular dog breeds, filterable by country.

## Future Considerations

If we wanted to deploy this website, we could have a static website on github pages and then we could consider hosting our backend on a service like firebase. 

Also we could impove the website itself by adding checks to see if the form inputs are valid (constrain to a list of countries, as well as constrain to a list of dog breeds). We could also standardize capitalization for the name inputs.


## Required Dependencies
- **General**: node.js
- **Backend**: express, sqlite3, cors, body-parser
- **Frontend**: axios


## Setup

### Clone the repository:
- git clone (repository)
- cd (repository-directory)

### Backend Setup
- Make sure Node.js is installed

- Navigate to the backend directory:
  - cd ../dog-picture-viewer-backend

- Install the dependencies:
  - npm install express, sqlite3, cors, body-parser

- Start the backend server:
  - npm start
      
- The backend server will start on port 3001 by default.

### Frontend Setup 
- Open a new terminal and navigate to the frontend directory:
  - cd ../dog-picture-viewer-frontend
    
- Install the dependencies:
  - npm install axios
      
- Start the frontend server:
  - npm start

- The frontend server will start on port 3000 by default.
    
- You will automatically be sent to http://localhost:3000 at launch.


## Endpoints


### Backend Endpoints

#### POST /api/favourites
- Description: Create a new user favourite.
- Request Body:
  - `name`: The user's name.
  - `country`: The user's country.
  - `favourite_dog`: The user's favourite type of dog.
- Response: The ID of the newly created user favourite.

#### GET /api/favourites/:id
- Description: Retrieve a specific user favourite by ID.
- Response: The details of the user favourite.

#### GET /api/favourites
- Description: Retrieve all user favourites.
- Response: A list of all user favourites.

#### GET /api/leaderboard
- Description: Retrieve the leaderboard of favourite dog breeds, optionally filterable by country.
- Query Parameters:
  - `country` (optional): Filter the leaderboard by country.
- Response: A list of favourite dog breeds and their vote counts.

#### GET /api/dog/:breed
- Description: Retrieve a random dog picture by breed.
- Response: A random dog picture URL.


### Frontend Endpoints

#### GET https://dog.ceo/api/breeds/list/all
- Description: Fetch the list of all dog breeds.
- Response: A list of all dog breeds.

#### GET https://dog.ceo/api/breed/:breed/images/random
- Description: Retrieve a random dog picture by breed.
- Response: A random dog picture URL.

#### POST http://localhost:3001/api/favourites
- Description: Submit a new user favourite.
- Request Body:
  - `name`: The user's name.
  - `country`: The user's country.
  - `favourite_dog`: The user's favourite type of dog.
- Response: The ID of the newly created user favourite.

#### GET http://localhost:3001/api/leaderboard
- Description: Retrieve the leaderboard of favourite dog breeds, optionally filterable by country.
- Query Parameters:
  - `country` (optional): Filter the leaderboard by country.
- Response: A list of favourite dog breeds and their vote counts.
