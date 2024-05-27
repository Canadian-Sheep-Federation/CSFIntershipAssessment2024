# Local Setup Guide

## Backend Setup:

1. **Clone Repository**:

   - Clone the repository.

2. **Environment Variables**:

   - Create a `.env` file in the root directory
   - Add the following variables:
     ```env
     MONGODB_URI="your_uri"
     PORT=3000
     FE_PORT=5500
     ```

3. **Install Dependencies**:

   - Open your terminal and navigate to the root directory.
   - Execute `npm install` to install all the required dependencies.

4. **Run Backend**:

   - After installing dependencies, run the backend using `npm run start`.
   - This command will start the backend server on port 3000.

## Frontend Setup:

Run `node index.js` at root folder

5. ** Modify HOST variable in`script.js` **:
   
```javascript
// When in Production, hosted in render
HOST = "https://sheep-health-watch.onrender.com/api"

// Switch to local URL
HOST = "http://localhost:3000/api"
```

## Run Tests:

- After installing dependencies, run the backend using `npm test`.
  - This command will execute all tests.
