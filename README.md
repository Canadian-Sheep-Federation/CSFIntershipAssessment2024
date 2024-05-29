## Welcome to the CSF Ron Swanson API.

# Note
Look at DISCUSSION.md to see answers to the bonus questions.

## Setup
Note -- it may ask you to run it on a different port; just say yes.

1. Install dependencies:
    ```sh
    npm install
    ```
    note: I used axios and cors; you shouldn't have to install them separately, but in case you do, run this:
    ```sh
    npm install axios
    npm install cors
    ```
2. Start the server:
    In the CSFInternshipAssessment2024 directory:
    ```sh
    node index.js
    ```
3. Start the React App:
    In the csf-ron-swanson-app directory:
    ```sh
    npm start
    ```

## Endpoints

# POST /
Takes in the form and stores it.

Request body:

{
    "name": "Colter Wall",
    "email": "colterwall@cowpoke.ca",
    "comment": "Houlihans at the Holiday Inn."
}

Response: { "id": 1}

# GET /{id}
Returns the form corresponding to the id.

Reponse: { "id": 1, "name": "Colter Wall", "email": colterwall@cowpoke.ca, "comment": "Houlihans at the Holiday Inn"}

# GET /
Returns all responses to the form.

Reponse: [{ "id": 1, "name": "Colter Wall", "email": colterwall@cowpoke.ca, "comment": "Houlihans at the Holiday Inn"}]

## DESCRIPTION
Look at Ron Swanson quotes and give us your thoughts on Ron!
