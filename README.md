
# Movie Explorer Web Application

## Overview
Movie Explorer is a web application that allows users to search for movies, get movie recommendations based on genres and moods, compare two movies, and interact with an AI assistant for natural language queries about movies. The app integrates a public movie API (OMDb API) and uses Gemini AI for advanced recommendations and comparisons.

Users can also submit feedback via a built-in feedback form, which is stored persistently.

---

## Features
- Search for movies by title using the OMDb API.
- Get personalized movie recommendations filtered by genre and mood.
- Compare two movies side-by-side.
- Ask natural language questions about movies and receive AI-generated responses.
- Submit and view feedback via a persistent data store.
- RESTful API endpoints to manage feedback responses.

---

## Technologies Used
- Java Spring Boot (Backend)
- Thymeleaf (View templates)
- OMDb API (Public movie data API)
- Gemini AI (Custom AI service for recommendations and Q&A)
- HTML/CSS/JavaScript (Frontend)

---

## Setup and Running the Application

### Prerequisites
- Java 17+ installed
- Maven or Gradle installed
- MongoDB or SQLite configured and running locally (depending on your data store setup)
- Internet connection to access the public APIs

### Configuration

Before running the application, you **must** add your API keys to the `src/main/resources/application.properties` file:

```properties
omdb.api.key=YOUR_OMDB_API_KEY_HERE
gemini.api.key=YOUR_GEMINI_API_KEY_HERE
```

Replace `YOUR_OMDB_API_KEY_HERE` and `YOUR_GEMINI_API_KEY_HERE` with your actual API keys.

---

### Running the App

1. Clone this repository (or fork and clone your fork).
2. Add your API keys to `application.properties` as described above.
3. Run the application using your IDE or command line:

```bash
./mvnw spring-boot:run
```
or
```bash
./gradlew bootRun
```

4. Open your browser and go to `http://localhost:8080` to access the app.

---

## API Endpoints

### Feedback API (REST)

- `POST /api/feedback` — Submit feedback (JSON body).
- `GET /api/feedback/{id}` — Get feedback by ID.
- `GET /api/feedback` — List all feedback entries.

---

## Usage Instructions

- **Home Page:** Search movies by title.
- **Recommend Page:** Get movie recommendations filtered by genres and moods.
- **Compare Page:** Compare two movies side by side.
- **Ask Page:** Chat with AI about movies.
- **Feedback Page:** Submit feedback and view all feedback responses.

---

## Future Improvements

- Add user authentication to personalize recommendations and feedback.
- Integrate more public movie APIs for richer data.
- Enhance UI/UX with a more modern frontend framework.
- Deploy the app to cloud platforms like AWS or Heroku for public access.

---

## Notes

- The app requires valid API keys for the OMDb and Gemini AI services.
- Make sure to keep your API keys secure and do not expose them in public repositories.
- If you encounter issues with API limits, consider upgrading your API plan or implementing caching.

---

## Contact

For questions or contributions, please contact Vraj Contractor at vrajcontractor20@gmail.com.

---

Thank you for using Movie Explorer!
