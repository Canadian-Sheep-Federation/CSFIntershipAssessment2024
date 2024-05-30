# Frontend web application for answering Trivia Questions

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Quick view

For purposes of the take-home assignment, here are useful links to begin:

- File that connects to the 3rd-party API: [openTriviaHandler.tsx](./src/api/openTriviaHandler.tsx)
  - Where it get's consumed: [Questionnaire.tsx](./src/Components/Questionnaire.tsx)
- File that connects to my own API: [prevRecordsHandler.tsx](./src/api/prevRecordsHandler.tsx)
  - Where it get's consumed: [Questionnaire.tsx](./src/Components/Questionnaire.tsx)
  - Where it get's consumed: [Answers.tsx](./src/Components/Answers.tsx)

## Install

After cloning the repo, run the following commands:

```
npm install
npm run start
```

This runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Building for deployment

```
npm run build
```

It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!
