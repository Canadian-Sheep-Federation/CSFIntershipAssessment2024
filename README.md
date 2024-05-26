# Project: Case Status API

This project was created to fetch information from an external API that shows case statuses.

## Installation

1. Install all dependencies by running:
   ```bash
   npm install
   ```
2. Create a `.env` file in the project root directory and add your API key with the name `API_KEY`:
   ```
   API_KEY=your_api_key
   ```
   Without this step, the project will not work and will give an error.

## Running the Project

To start the project, use the following commands:
```bash
npm run start
```
or
```bash
node ./server
```

The project uses port 1994 and SQLite as the database. It also includes a frontend page and stores all data until the project is restarted to use the API.

The project uses ESLint and Prettier for code formatting. An MVC structure is used, and research was done on SQLite.

## Endpoints

- **GET /api**: Fetches all registered data in JSON format.
- **GET /api/:id**: Fetches the data with the specified ID in JSON format.
- **POST /api**: Adds new data. `city`, `temperature`, and `weather` are required fields. It returns the inserted ID upon success.
- **DELETE /api/:id**: Deletes the data with the specified ID.

## Future Updates

If another version is released, the planned updates are:
- Add PATCH/PUT endpoints for updating data and store city names as unique.
- When adding data, include a timestamp for each entry. If uniqueness is not required, store the data with the timestamp.
- Display data with timestamps in charts to show trends of increases and decreases.
