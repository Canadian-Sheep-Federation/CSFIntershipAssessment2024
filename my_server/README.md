# Backend for storing Trivia Question answers

This project is made with Express.js and uses Sqlite3 as a database.

## Quick view

For purposes of the take-home assignment, here are useful links to begin:

- File that defines the entry point to start the server: [server.js](./src/server.js)
- File that connects and interacts with the database: [RecordController.js](./src/controllers/RecordController.js)
- File that defines the routes available at our api endpoint: [routes.js](./src/config/routes.js)

## Installation

Run the following commands:

```
npm install
npm run start
```

This will begin the server at http://localhost:3001

In order to reset the database, run the following commands after installing dependencies:

```
cd src/db
rm records.db
sqlite3 records.db < schema.sql>
```

Make a backup of `records.db` if you do not wish to permanently erase all data!

## Usage (API doc)

- `GET /api/v1/records`
  - Can take optional query params: `category`, `difficulty`, `name`.
    - Ex. `GET /api/v1/records?name=John`
    - Ex. `GET /api/v1/records?category=Art&difficulty=hard`
  - Returns a list of all Records stored in the database that match the query
    - Ex.
    ```
    [
      {
        "id": 9,
        "name": "Bob",
        "difficulty": "hard",
        "category": "Entertainment: Film",
        "question": "In the 1974 Christmas flick \"The Year Without a Santa Claus,\" what are the names of the two elves who help Mrs. Claus save Christmas?",
        "answer": "The grinch"
        },
        {
        "id": 12,
        "name": "Bob",
        "difficulty": "hard",
        "category": "Entertainment: Video Games",
        "question": "How many aces can be shot down through the entirety of \"Ace Combat Zero: The Belkan War\"?",
        "answer": "A total of 291, probably"
      }
    ]
    ```
- `POST /api/v1/records`
  - Writes a row into the database.
  - Must contain a body with the following parameters:
    - name: `STRING`
    - difficulty: `STRING`
    - category: `STRING`
    - question: `STRING`
    - answer: `STRING` (default = `""`)
    - Ex.
      ```
      {
        name: "John",
        difficulty: "medium",
        category: "General Knowledge",
        question: "How tall is the Eiffel Tower in meters?",
        answer: "300 meters"
      }
      ```
  - Returns a object containing the ID that was assigned if successful.
    - Ex. `{ id: 1 }`
- `GET /api/v1/records/:id`
  - Finds and returns a specific Record matching the given ID parameter
    - Ex.
    ```
    {
    "id": 9,
    "name": "Bob",
    "difficulty": "hard",
    "category": "Entertainment: Film",
    "question": "In the 1974 Christmas flick \"The Year Without a Santa Claus,\" what are the names of the two elves who help Mrs. Claus save Christmas?",
    "answer": "The grinch"
    }
    ```
