# CSFIntershipAssessment2024 /SoftwareDeveloperAssessment

## Description

This project is a full-stack web application built using the MERN stack (MongoDB, Express.js, React.js, Node.js). It uses a public
anime API to to allow users to search different anime. The users can also write reviews for these anime of their choice.

## Technologies Used

- **Frontend**:
  - React.js
  - React Bootstrap
  - HTML/CSS
- **Backend**:
  - Node.js
  - Express.js
  - MongoDB (with Mongoose ORM)
- **Deployment**:
  - TBD
- **Other Tools**:
  - Git (Version control)
  - ESLint, Prettier (Code linting and formatting)
  - NPM (Package management)

## Getting Started

### Prerequisites

- Node.js installed on your machine
- MongoDB Atlas account for the database

### Installation

1. Clone the repository: `git clone <repository-url>`
2. Navigate to the project directory: `cd SoftwareDeveloperAssessment`
3. Install dependencies for both the frontend and backend:
   ```bash
   cd client
   npm install
   cd server
   npm install
   ```

### Setup Environment Variables

- Create a .env file in the server directory and define the following variables:

```makefile
    DATABASE_URL=<your-mongodb-uri>>
```

### Running the project

- Run the following commands

```bash
   cd server
   npm run start
   cd client
   npm start
```
