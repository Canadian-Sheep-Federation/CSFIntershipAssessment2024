# CSF Intership Assessment 2024

## Marvel API Form

Marvel API Form is a web application that allows users to submit responses to a custom form and view responses from other users. Additionally, users can search for Marvel characters and view their details fetched from the Marvel API.

## Features

- Submit responses to a custom form, including name, email, favorite Marvel character, and comments.
- View all responses submitted by users.
- Search for Marvel characters and view their details, including name and description.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Axios
- Crypto (for generating hashes)
- HTML
- CSS

## Installation

1. Clone the repository:
```bash
    git clone <repository-url>
 ```


2. Install dependencies:
```bash
    npm install
 ```


3. Set up MongoDB:
    - Ensure MongoDB is installed on your system.
    - Start MongoDB by running mongod.


4. Obtain Marvel API credentials:
    - Sign up for a Marvel Developer account to get your public and private API keys.



5. Update your publicKey and privateKey variables in routes/api.js with the values obtained in step 4.



6. Run the app:
```bash
    npm start
 ```

7. Access the application in your browser at http://localhost:3000.

## API Endpoints
1. POST /api: Save a new form response.
2. GET /api: Get all form responses.
3. GET /api/:id: Get a form response by ID.
4. GET /api/marvel/:characterName: Fetch Marvel character data by character name.

## Usage

1. Fill out the form with your name, email, favorite Marvel character, and comments.
2. Click "Submit" to submit your response.
3. View all submitted responses below the form.
4. Use the Marvel Character Search to search for a Marvel character by name.
5. Click "Search" to view the character details fetched from the Marvel API.

## Deployment

To deploy the application and API we'd need:

1. Containerization: Dockerize both the API and web application for easier deployment and management across different environments.
2. Choose a hosting provider such as Heroku, AWS, or DigitalOcean. (I prefer AWS)
3. Set up CI/CD pipelines to automate the deployment process, including testing, building, and deploying new changes to production.
4. Security: Configure security measures such as HTTPS, firewalls, and intrusion detection systems to protect the deployed applications from potential threats and vulnerabilities.

## Improvements 

1. Set up environment variables for production environment, including database connection strings and Marvel API credentials and avoid exposing these variables for security purposes
2. Set up a database service such as MongoDB Atlas for storing form responses.
3. Add form validation and introduce error handling
4. Write tests
5. Introduce caching
6. Pagination and Filtering: Implement pagination and filtering options for retrieving form responses from the API
7. Frontend Enhancements: Enhance the web application's UI/UX with better styling, interactive features, and error feedback to improve user experience.
8. Use Separate Directories: Organize the project structure into separate directories for front-end and back-end code.
9. Separate Deployment: Deploy front-end and back-end components independently to separate hosting environments. This allows easier scaling and proper managing of components independently and optimally.
