# Movie Review Web Application

## Overview

This project is a movie review web application that allows users to search for movies, view details, and add reviews. The application uses Node.js, Express, and SQLite for the backend, and HTML, CSS (with Bootstrap), and JavaScript for the frontend.

## Prerequisites

- Node.js and npm installed on your machine
- Internet connection to fetch movie data from the OMDb API

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd project

2. Install dependencies:
   ```bash 
    npm install

## Running the Application

1. Start the server:
    ```bash
    node server.js

2. Open the web application:
Open your web browser and navigate to http://localhost:3000.


## Application Structure
### server.js: Main entry point of the server

### api/: Contains API routes and database configuration
- movieForm.js: API routes for searching movies and managing reviews
- database.js: Database configuration and schema

### web/: Contains frontend files
- index.html: Main HTML file
- style.css: CSS file for styling
- script.js: JavaScript file for frontend functionality


## API Endpoints
### GET /api/form/search/
- : Search for a movie by title
### POST /api/form/reviews: Add a review for a movie
### GET /api/form/reviews/
- : Get reviews for a movie by ID


## Frontend Functionality
-  Search Movie: Allows users to search for a movie and display its details
- Add Review: Allows users to add a review for the displayed movie
- View Reviews: Displays all reviews for the displayed movie


## Extensions and Improvements
### Application and API Extensions
- User Authentication: Add user authentication and authorization to manage user accounts and restrict review submission to logged-in users.
- Enhanced Movie Details: Fetch and display additional movie details such as cast, director, and genre from the OMDb API.
- Pagination: Implement pagination for movie reviews to improve usability when there are many reviews.
- Search History: Add functionality to save and display users' search history.
- Review Editing and Deletion: Allow users to edit and delete their reviews.
- Rating System: Implement a rating system that calculates and displays the average rating for each movie.

### Deployment
- Server Deployment: Deploy the server to a cloud platform like Heroku, AWS, or DigitalOcean. - These platforms provide easy deployment options for Node.js applications.
- Database Deployment: Use a cloud-based database service like MongoDB Atlas or Amazon RDS for SQLite to ensure data persistence and scalability.
- Static File Hosting: Serve the static files (HTML, CSS, JavaScript) using a CDN or a service like Netlify or Vercel for faster load times and better performance.
- Domain Name: Register a custom domain name and configure it to point to your deployed application.