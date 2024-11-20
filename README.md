## CSF Intership Assessment 2024 - Movie Review Application

This project is a web application built with React.js that allows users to search for movies, shows, or anime, and add
or view reviews for specific titles. It utilizes a backend API built with Node.js and Express to handle database
operations and interact with the Simkl API for movie data.


## Features

- **Movie Search**: Users can search for movies, shows, or anime by title.
- **Add Review**: Users can submit reviews for specific movies, including their name and review text.
- **Get Review**: View reviews for a specific movie ID, including the reviewer's name and review text.
- **Backend API**: Provides REST APIs to manage and retrieve movie reviews stored in an SQLite database.


## Tech Stack

- **Frontend:**
- React.js
- React Router
- React Bootstrap
- Axios
- **Backend:**
- Node.js
- Express
- SQLite3
- **API:**
- Simkl API (for movie data)


## Installation and Setup

1. **Clone the Repository:**
```bash
git clone https://github.com/jzahmad/CSFIntershipAssessment2024.git
```

2. **Navigate to the Backend Directory:**
```bash
cd backend
```

3. **Install Backend Dependencies:**
```bash
npm install
```

4. **Navigate to the Frontend Directory:**
```bash
cd ../frontend
```

5. **Install Frontend Dependencies:**
```bash
npm install
```

6. **Start the Backend Server:**
```bash
cd ../backend
node index.js
```

7. **Start the Frontend Development Server:**
```bash
cd ../frontend
npm start
```

The app will be served at **http://localhost:3000**. Open your browser and navigate to this address to use the
application.


## Configuration

- **Backend API Configuration:**
- The backend API uses SQLite as the database. The database is created in memory (**:memory:**) by default. For
persistent storage, update the database connection string in `database.js` to point to a file-based database.
- **Simkl API Key:** The frontend application uses the Simkl API to retrieve movie data. To use the app, you'll need to
obtain a free API key from [https://simkl.com/api](https://simkl.com/api) and replace the placeholder API key in
`Movies.jsx`.


## Testing

- **Backend Testing:**
- The backend API is not currently equipped with unit tests. You can add tests using libraries like Jest or Mocha to
ensure API functionality.
- **Frontend Testing:**
- The frontend application also does not have unit tests. Consider adding unit tests using Jest or React Testing Library
to improve code quality.


## Contributing

Contributions are welcome! Here's how to contribute:

1. **Fork the repository.**
2. **Create a branch for your feature or bug fix.**
3. **Commit your changes.**
4. **Push your branch to your fork.**
5. **Submit a pull request.**


## License

This project is licensed under the MIT License - see the LICENSE file for details.
