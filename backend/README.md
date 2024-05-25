# HOW TO RUN

Use ``` npm run start ``` to start the server.

Make sure to create a .env (environment file) specifying the following variables

API_BASE_URL
- BASE URL of the currency exchange rate API
- defaults to https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest

API_VERSION
- API VERSION of the currency exchange rate API
- defaults to v1

DB_URL
- Mongodb connection URI string
- defaults to mongodb://localhost:27017/test

PORT
- Port to run the server on
- defaults to 3000


# Bonus Points

## Discuss how the application and api could be extended and improved

The API can be improved by including more error handling especially with respect to user input.
Right now the API does not sanitize or verify user input, this is very dangerous and can cause server to error out.
In addition, unit tests could be added for each endpoint to ensure API safety for any future changes.

## Discuss how the application and api should be deployed

The application being a node.js instance can be deployed on a cloud provider such as AWS.
For the database, a cloud database provide can be used (ie MongoDB Atlas, AWS...)

## Intuitive design and user interface

The user interface could be a single page that lists all past submissions in card formats (with lazy loading through scrolling).
The page could have a create new form/submission button that displays a dialog for users to submit new forms.
The page could also have a search bar that allows users to search form by id, filtering the listed submissions in the page. 