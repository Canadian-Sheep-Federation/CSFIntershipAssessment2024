# Cocktail Favorite App

This project is a web application that allows users to query the public [CocktailDB API](https://www.thecocktaildb.com/api.php), view a list of cocktails, and add their favorite cocktails to a favorites list. The favorites are stored in a MongoDB database, and users can view and manage their favorite cocktails on a dedicated page.

## Features

- Query and display a list of cocktails from the CocktailDB API.
- Add cocktails to a list of favorites.
- View and manage favorite cocktails.

## API Endpoints

### POST /api/cocktails/favorites

Takes in the form and stores it in MongoDB. Should return the id of the newly created form response.

- **URL**: `/api/cocktails/favorites`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "idDrink": "11007"
  }
  ```

Success Response:
Code: 201
Content: { "message": "Favorite added successfully", "favorite": { "idDrink": "11007" } }
GET /api/cocktails/favorites/{id}
TODO add the remaining items. 


## Setup Instructions
Working on nodejs serivce. 
```
<!-- make sure its the root directory -->
npm install 
npm run dev
```
The nodejs app runs in 4000 by default it can be updated with `.env` file. refer to the `.env.example` file.

### How the Application and API Can Be Extended
- Enhancing the Form: Add more fields like comments, date of submission, etc.
- User Authentication: Implement user authentication to associate form submissions with specific users.
- Pagination: Add pagination for the responses if the dataset grows large.
- Search and Filter: Implement search and filter functionalities for the responses.
- Deployment: Deploy the API on a platform like Heroku and the frontend on Netlify or Vercel.
- You could add user authentication so that different users can have their own favorite cocktails.
- UI Improvements: Enhance the UI/UX with more styling and better user interactions.
- Testing: Add unit and integration tests to ensure the API and application are working as expected.
  Deployment
- API: Deploy the API using a cloud provider - AWS

Ref: 
https://www.thecocktaildb.com/api.php

