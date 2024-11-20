# Backend for Video Review Application  
This project serves as the backend for a Video Review Application, providing REST APIs to manage and retrieve video reviews stored in an SQLite database.  

## Prerequisites  

- Node.js installed  
- SQLite3 installed  

## Installation  
1. Clone the repository: `git clone https://github.com/jzahmad/CSFIntershipAssessment2024.git`

2. `cd backend`
3.  `npm install `
    

Database Setup
--------------

The application uses SQLite as its database. The database is created in memory (**:memory:**) for this example, but for a persistent database, consider updating the database connection string in **database.js** to a file-based database.

Running the Server
------------------

To start the server, run: `node index`

The server will start running on **http://localhost:3100**.

APIs
----

### POST /addReview

Adds a new review to the database.

#### Request Body

`{    "videoId": "string",    "name": "string",    "review": "string"  }   `

#### Response

*   **201 Created**: Review successfully added.
    
*   **500 Internal Server Error**: If an error occurs during insertion.
    

### GET /

Retrieves all reviews for a specific video by **videoId**.

#### Response

*   **200 OK**: Returns an array of review objects.
    
*   **404 Not Found**: If no reviews are found for the given **videoId**.
    
*   **500 Internal Server Error**: If an error occurs during retrieval.
    

### GET /

Retrieves all reviews.

#### Response

*   **200 OK**: Returns an array of all review objects.
    
*   **500 Internal Server Error**: If an error occurs during retrieval.
    

### GET /id/

Retrieves a review by its **id**.

#### Response

*   **200 OK**: Returns the review object.
    
*   **404 Not Found**: If no review is found for the given **id**.
    
*   **500 Internal Server Error**: If an error occurs during retrieval.
