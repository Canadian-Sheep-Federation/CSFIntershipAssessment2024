# Fake JSON Data Generator API

## Overview
This RESTful web application generates fake JSON data using Node.js and Express.js. It is designed to help developers test their applications with realistic mock data.

## Installation
1. Clone the repository

2. Install dependencies
- **npm install**

## Configuration

Create a .env file in the root directory to configure environment variables.

- **PORT=5000**

## Running the Application

To start the server, run:

- **npm start**

The application will be accessible at http://localhost:5000.

## API Endpoints

### 1. GET /api/v1/public

Description: Get faker data in json response

**`https://fakerapi.it/en`** all endpoints from public api will work just need to send resource name compulsory in query param with optional params.

Query Param:

- `resource` (string) required: Type of data want generate e.g. company, persons, addresses
- `_quantity` (integer) optional: Count of entries want. e.g. 5, 10

### 2. GET /api/v1/surveys

Description: Get all surveys stored

### 3. GET /api/v1/surveys/{id}

Description: Get survey by id passed in url as a path parameter

### 4. POST /api/v1/surveys

Description: Insert survey details for improvement and categories of data need to include from user to storage

Request Body:

`{
    name : "John Doe",
    email : "abc@gmail.com",
    usageSummary : "Write Summary here",
    feedback : "Write Feedback here",
    rating : 0
}`

## Error Handling

### Common Errors:

- **400 Bad Request**
- **404 Not Found**
- **500 Internal Server Error**