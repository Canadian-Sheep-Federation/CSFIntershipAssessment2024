# Dog Breed Reviews

## Overview
This project is a web application that allows users to submit and view reviews of various dog breeds. It consists of a REST-ful API that stores form data in a SQLite database and a web application that interacts with both this API and the Dog CEO API to fetch dog breeds.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Web Application](#web-application)
- [What I Don't Know](#what-i-dont-know)
- [Extensions and Improvements](#extensions-and-improvements)
- [Deployment](#deployment)
- [Bonus Points](#bonus-points)

## Installation
1. Clone the repository:
    ```bash
    git clone <repository_url>
    ```
2. Navigate to the project directory:
    ```bash
    cd dog_breed_reviews
    ```
3. Install dependencies:
    ```bash
    npm install
    ```
4. Start the server:
    ```bash
    npm start
    ```

## Usage
1. Open your browser and go to `http://localhost:3000`.
2. You can submit reviews for dog breeds and view existing reviews.

## API Endpoints
### POST /
- **Description**: Stores form data in the database.
- **Request Body**:
    ```json
    {
        "breed": "affenpinscher",
        "rating": 5,
        "comments": "Great breed!"
    }
    ```
- **Response**:
    ```json
    {
        "message": "Review Saved",
        "id": 1
    }
    ```

### GET /:id
- **Description**: Fetches the form data corresponding to the specified ID.
- **Response**:
    ```json
    {
        "id": 1,
        "breed": "affenpinscher",
        "rating": 5,
        "comments": "Great breed!"
    }
    ```

### GET /
- **Description**: Fetches all form data.
- **Response**:
    ```json
    [
        {
            "id": 1,
            "breed": "affenpinscher",
            "rating": 5,
            "comments": "Great breed!"
        },
        ...
    ]
    ```

## Web Application
- Allows users to submit reviews for dog breeds.
- Displays a list of all submitted reviews.
- Fetches dog breeds from the Dog CEO API.

## What I Don't Know
As an intern, there are certain areas I am not fully familiar with:
- **Database Migrations**: How to implement database migrations in a Node.js environment to handle schema changes over time.
- **Testing**: How to write comprehensive tests (unit, integration, end-to-end) for both the API and web application.
- **Security Best Practices**: Detailed understanding of advanced security practices to protect against threats like SQL injection, XSS, CSRF, etc.

### What It Should Do
- **Database Migrations**: Implement tools like `sequelize` or `knex` for managing database migrations.
- **Testing**: Use testing frameworks like `Jest` for unit tests and `Cypress` for end-to-end testing.
- **Security**: Implement input validation, use prepared statements for database queries, sanitize user input, and use security libraries like `helmet` in Express.

## Extensions and Improvements
### Features
1. **User Authentication**: Implement user login and registration to allow personalized reviews.
2. **Advanced Search and Filter**: Allow users to search and filter reviews based on breed, rating, and comments.
3. **Pagination**: Implement pagination for reviews to improve performance and usability.

### Code Improvements
1. **Refactor Code**: Break down large functions into smaller, more manageable pieces.
2. **Error Handling**: Improve error handling to provide more descriptive messages and handle different error scenarios gracefully.
3. **Code Comments**: Add more comments to explain the code logic and improve maintainability.

## Deployment
### Steps to Deploy
1. **Dockerize the Application**: Create Dockerfiles for the API and web application for consistent deployment environments.
2. **CI/CD Pipeline**: Set up a CI/CD pipeline using tools like GitHub Actions, Travis CI, or Jenkins for automated testing and deployment.
3. **Cloud Provider**: Deploy the application to a cloud provider like AWS, Azure, or Heroku.
    - **Database**: Use a managed database service like AWS RDS or Azure SQL Database for production.
    - **Application**: Use services like AWS ECS, Azure App Service, or Heroku for deploying the application.

### Deployment Configuration
- Ensure environment variables are set up correctly for production.
- Use environment-specific configurations for development, testing, and production.

## Bonus Points
### Discussion on Extensions and Improvements
- **Improving the Application**: Implement additional features like user authentication, search and filter, and pagination to enhance the functionality and user experience.
- **Improving the API**: Refactor code, improve error handling, and add comprehensive tests to make the API more robust and maintainable.

### Discussion on Deployment
- **Scalability**: Use container orchestration tools like Kubernetes to manage and scale the application.
- **Security**: Implement security best practices, such as using HTTPS, securing API keys, and monitoring for security threats.
- **Monitoring and Logging**: Use tools like Prometheus and Grafana for monitoring application performance and ELK stack for logging and error tracking.