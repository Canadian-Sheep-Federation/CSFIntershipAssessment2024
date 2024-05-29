## Backend API

### Requirements
- Node.js
- npm

### Setup
1. Install dependencies: `npm install`
2. Start the server: `npm start`

### Endpoints
- `POST /`: Create a new review. Requires `book_title`, `author`, and `review` in the request body.
- `GET /:id`: Get a review by ID.
- `GET /`: Get all reviews.

## Frontend Application

### Requirements
- Node.js
- npm

### Setup
1. Navigate to the `frontend` directory: `cd frontend`
2. Install dependencies: `npm install`
3. Start the React app: `npm start`

### Usage
- Enter book reviews through the form.
- View all reviews, filter by name and/or author.
- Search for books using the Open Library API.
