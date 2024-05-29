# TastyTracks API

## Overview

Tasty Tracks is a restaurant review application that allows users to discover, review, and rate restaurants. Users can sign up, log in, and share their dining experiences. The app uses JWT for authentication and supports various CRUD operations for reviews.

## Features

- **User Authentication**: Sign up, log in, and log out using JWT cookies.
- **Review Management**: Create, read, update, and delete restaurant reviews.
- **Authorization**: Ensure users can only update or delete their own reviews.

## Project Structure (MVC Architecture)

The project follows the MVC (Model-View-Controller) architecture:
The start point of the application is "server.js". This api has a default user registered while creating it using POSTMAN App.

TastyTracks/
│
├── controllers/
│ ├── attachUserMiddleware.js
│ ├── authController.js
│ ├── reviewController.js
│ └── userController.js
│
├── models/
│ ├── reviewModel.js
│ └── userModel.js
│ └── VisitedRestaurantModel.js
│
├── routes/
│ ├── reviewRoutes.js
│ ├── userRoutes.js
│ └── VisitedRestaurantsRoutes.js
│
├── cansheep\CSFIntershipAssessment2024\tastytracks>
│ └── (React components)
├── cansheep\CSFIntershipAssessment2024\tastyTracksBackend>
│└── (Backend)
│
├── middlewares/
│ └── attachUserMiddleware.js
│
|
│
├── app.js
├── server.js
└── README.md

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/AkshayS05/CSFIntershipAssessment2024.git
   cd TastyTracksBackend
   ```
2. Install dependencies
   npm install

3. Create a config.env file
   DATABASE=<your_mongodb_connection_string>
   DATABASE_PASSWORD=<your_database_password>
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRES_IN=90d
   JWT_COOKIE_EXPIRES_IN=90
   PORT=8000

4. Run the Server
   npm start

## API Endpoints

-Authentication

## Sign Up

POST /api/v1/users/signup
Request Body:
{
"name": "User Name",
"email": "user@example.com",
"password": "password",
"passwordConfirm": "password"
}

## Log In

POST /api/v1/users/login
Request Body:
{
"email": "user@example.com",
"password": "password"
}

## Log Out

GET /api/v1/users/logout

## Get Current User

GET /api/v1/users/me

## Reviews

## Create a Review

POST /api/v1/reviews
Request Body:
{
"name": "Restaurant Name",
"username": "User Name",
"rating": 4,
"review": "Great food!",
"suggestion": "Try the pasta.",
"imageCover": "image-url.jpg"
}

## Get All Reviews

GET /api/v1/reviews

## Get Review by ID

GET /api/v1/reviews/:id

## Update Review

PATCH /api/v1/reviews/:id
Request Body:
{
"rating": 5,
"review": "Updated review",
"suggestion": "Updated suggestion"
}

## Delete Review

DELETE /api/v1/reviews/:id

-- Attach User Middleware
-- Attaches the current user to the request if a valid JWT is found in cookies.

## How to Run the API

Ensure MongoDB is running: Make sure you have a running instance of MongoDB. You can use a cloud service like MongoDB Atlas or run a local instance.

Start the server: Use the start script to run the server.
--npm start

## Access the API: The API will be available at http://localhost:8000/.

1. Sign Up: Create a new account by sending a POST request to /api/v1/users/signup.
2. Log In: Log in with your credentials by sending a POST request to /api/v1/users/login.
3. Post a Review: Share your dining experience by sending a POST request to /api/v1/reviews.
4. View Reviews: Browse through all reviews by sending a GET request to /api/v1/reviews.
5. Update/Delete Reviews: Edit or remove your reviews by sending PATCH/DELETE requests to /api/v1/reviews/:id.

## Future Enhancements and Improvements

### Application Extensions

1. **User Profiles**

   - **Feature**: Create detailed user profiles where users can manage their personal information, view their review history, and customize their preferences.
   - **Implementation**: Extend the user model to include additional fields such as bio, profile picture, and preferences. Create new routes and views for managing profiles.

2. **Social Features**

   - **Feature**: Implement social features such as following other users, liking and commenting on reviews, and sharing reviews on social media.
   - **Implementation**: Add new models and relationships to handle social interactions. Update the front-end to display social activities and integrate with social media APIs for sharing.

3. **Advanced Search and Filtering**

   - **Feature**: Enhance the search functionality to include advanced filters based on location, rating, price range, cuisine type, etc.
   - **Implementation**: Update the search API to handle complex queries and refine the front-end to include filtering options.

4. **Restaurant Booking Integration**
   - **Feature**: Integrate with restaurant booking systems to allow users to book a table directly from the app.
   - **Implementation**: Use third-party APIs from booking platforms and create new views and routes for booking functionality.

### API Improvements

1. **Enhanced Security**

   - **Feature**: Implement advanced security measures such as two-factor authentication (2FA), rate limiting, and account lockout mechanisms.
   - **Implementation**: Use libraries and services like Authy for 2FA, express-rate-limit for rate limiting, and account lockout logic based on failed login attempts.

2. **Error Handling**

   - **Feature**: Provide a global error handling mechanism to make the route logic simple and clear.
   - **Implementation**:
     - **Error Handling Middleware**: Create a centralized error handling middleware to manage all the errors in one place. This middleware will catch errors thrown by routes or other middleware and send a standardized error response to the client.
     - **Consistent Error Responses**: Ensure all routes and controllers use consistent error response structures. Define a standard error format that includes an error code, message, and additional details as needed.
     - **Custom Error Classes**: Implement custom error classes to represent different types of errors (e.g., validation errors, authentication errors, database errors). This makes it easier to handle specific error types and provide meaningful error messages.
     - **Logging**: Integrate logging to track errors and their context, which helps in debugging and monitoring the application. Use libraries like `winston` or `morgan` to log errors and other relevant information.
     - **Graceful Error Handling**: Ensure the application gracefully handles unexpected errors without crashing. Implement fallback mechanisms and user-friendly error messages to maintain a good user experience.

3. **Protected Routes for Enhanced Security**
   - **Feature**: Implement protected routes that can only be accessed by authenticated users to enhance the security of the application.
   - **Implementation**:
     - **Authentication Middleware**: Create middleware to verify the JWT token for protected routes. This middleware will check if the token is valid and if the user is authenticated before allowing access to certain routes.
     - **Route Protection**: Apply the authentication middleware to the routes that need protection, ensuring only logged-in users can access them.
     - **Role-Based Access Control**: Optionally, implement role-based access control (RBAC) to allow different levels of access based on user roles (e.g., admin, user).

By implementing these enhancements and improvements, Tasty Tracks can offer a richer user experience, improved performance, and greater scalability.
