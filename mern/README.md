# MERN Phone Validation App

## Overview

This is a MERN stack application that allows users to submit a form with their name, email, and phone number. The phone number is validated using the NumVerify API.

## API Endpoints

- **POST /api/forms**: Takes in the form and stores it in the database. Returns the ID of the newly created form response.
- **GET /api/forms**: Returns all responses to the form.
- **GET /api/forms/:id**: Returns the form corresponding to the ID.
- **DELETE /api/forms/:id**: Deletes the form corresponding to the ID.

### Making REST API calls directly to server

POST /api/forms:

Purpose: Create a new form entry.   
Request Body: { "name": "John Doe", "email": "john@example.com", "phone": "1234567890" }   
Response: The ID of the newly created form entry.   

Example using curl:
```curl
curl -X POST -H "Content-Type: application/json" -d '{"name": "John Doe", "email": "john@example.com", "phone": "1234567890"}' http://localhost:5000/api/forms
```

GET /api/forms:

Purpose: Retrieve all form entries.   
Response: An array of form entries.   

Example using curl:
```curl
curl http://localhost:5000/api/forms
```

GET /api/forms/:

Purpose: Retrieve a form entry by its ID.   
Response: The form entry corresponding to the specified ID.   

Example using curl:
```curl
curl http://localhost:5000/api/forms/{id}
```

## Running the Application

### Prerequisites

- Docker and Docker Compose installed.

### Instructions

1. Clone the repository:

```sh
git clone https://github.com/park-jsdev/CSFIntershipAssessment2024.git
cd webdev/mern/mern-app
```

2. Add your NumVerify API key to backend/.env:

backend/.env:
```plaintext
PORT=5000
MONGO_URI=mongodb://mongo:27017/formDB
NUMVERIFY_API_KEY=your_numverify_api_key
```

3. Build and start the Docker containers:

```sh
docker-compose up --build
```

4. Access the application:

Frontend: http://localhost:3000   
Backend: http://localhost:5000/api/forms   

### Technologies Used

- MongoDB
- Express.js
- React.js
- Node.js
- Docker
- NumVerify API
