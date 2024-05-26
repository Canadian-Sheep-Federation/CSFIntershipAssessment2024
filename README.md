# CSF Intership Assessment 2024

If you are interested in an internship opportunity with the Canadian Sheep Federation for Summer 2023, please complete the tasks outlined in the .md file relevant to what you are interested in doing this summer.

E.g. those interested in QA should complete the QA assignment.

## Solution Overview
Solution to SoftwareDeveloperAssessment.md

### Technology Stack
- Built with Express.js and Typescript
- Utilized Test-Driven Development (TDD) methodology to ensure robustness and reliability

### Public API Used
For this project, I utilized the following public API:
- [TestData -> Comments](https://jsonplaceholder.typicode.com/)

# Getting Started
To run the project locally, follow these steps:
1. Install dependencies `npm i`
2. If you would like to start the server `npm start`
3. If you would like to run integration test `npm run test`

## Dependencies
1. Express
2. Sqlite3
3. Dotenv

## Development Dependencies
1. Jest
2. Supertest
3. Prettier

## Endpoints
- To create a comment, in your terminal `curl -H 'Content-Type: application/json' -d '{ "name":"foo","body":"lorem500", "email": "foo@email.com"}' -X POST http://localhost:3000/api/v1/comment`
- To get created comment, in your terminal `curl http://localhost:3000/api/v1/comment/1`;
- To get all comments, in your terminal `curl http://localhost:3000/api/v1/comment`;