## CSF Internship Software Developer Assessment 

## Description
This is a simple web application that allows users to submit a form with their name, age, email, and a comment. The form data is stored in an in-memory SQLite database using Sequelize as the ORM. Additionally, users can fetch a random cat fact and view all submitted responses.

## Features

- Submit form data (name, age, email, comment)
- Retrieve and display all submitted form responses
- Fetch and display a random cat fact
- 
## Technologies Used

- Node.js
- Express
- Sequelize
- SQLite
- HTML/CSS
- JavaScript (Client-side)

## Setup
### Prerequisites

Before you begin, ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (v12 or higher)
- [npm](https://www.npmjs.com/) (v6 or higher)

## Getting Started

Follow these steps to set up and run the project on your local machine.

### 1. Clone the Repository

Clone the repository to your local machine using the following command:

#### Install dependencies and run the server
-cd .\sheep_federation_server\
-npm install
-node server.js

Server is running on http://localhost:3000

- Enter details into form and add a cat fact, or use the cat fact generator to generate a cat fact to you. 
- See all form responses 
- Search form respones by ID
  
## How could the application and api be extended and improved
Firstly, I would enhance the form by adding fields to accept images or videos to supplement the cat facts, and academic papers to verify the facts. Additionally, I would update the design of the form to be more inviting and suitable for a cat facts webpage, aiming for a cheerful and engaging aesthetic. Instead of storing data in memory, which affects persistence and security, I would use a persistent storage solution like file-based SQLite or MongoDB. This ensures that data is not lost when the server restarts. Furthermore, I would improve security measures to protect stored data by implementing encryption and secure authentication methods.

## Discuss how the application should be deployed
To deploy the application, I would use a hosting provider like Heroku, as it is easy to set up and well-suited for small applications like this. First, I would ensure that the project structure is optimized and that environment variables are used for configuration. I would set up separate environments for User Acceptance Testing (UAT) and production. The initial deployment would be made to the UAT server, where the project would be tested by a group of early testers. After addressing any issues identified during testing, I would then deploy the project to the production server for all potential users.
