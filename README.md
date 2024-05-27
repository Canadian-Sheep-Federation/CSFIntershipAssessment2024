# Song Rating Application

This is a web application that allows users to search for songs on Spotify, rate them, and view ratings provided by other users. The application is built using React.js for the frontend, Node.js with Express.js for the backend, and it utilizes SQLite for the database. The application interacts with the Spotify API to search for songs.

## Features

- **Search Spotify Songs**: Users can search for songs by entering the song name in the search bar. The application queries the Spotify API to retrieve matching songs.
- **Rate Songs**: Users can rate songs by providing a rating (from 1 to 5 stars) and optional comments.
- **View Ratings**: Users can view ratings provided by other users for a specific song.
- **Database Storage**: Ratings and comments provided by users are stored in an SQLite database.
  
## Technologies Used

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: SQLite
- **HTTP Client**: Axios
- **CORS**: Cross-Origin Resource Sharing (CORS) middleware is used to enable communication between frontend and backend.
- **Spotify API**: The application interacts with the Spotify API to search for songs.

## Dependencies

- **axios**: HTTP client library for making requests to the backend and Spotify API.
- **cors**: Express middleware for enabling Cross-Origin Resource Sharing.
- **sqlite3**: SQLite library for Node.js to interact with the SQLite database.
- **spotify-web-api-node**: Node.js wrapper for the Spotify Web API.

## Installation



1. Generate a token for Spotify API
```bash
echo -n "536dbf286cdb4a3e961143c3f28cdef7:2aa653219d7b46918ff3f1cfac0b9dbc" | base64
```
Then take the result and run
``` bash
curl -X "POST" -H "Authorization: Basic YOUR_RESULT_HERE" -d grant_type=client_credentials https://accounts.spotify.com/api/token
```

2. Create a .env file for both client and server side 

For the server 
``` bash
PORT=3001
```
For the client
``` bash
REACT_APP_SPOTIFY_TOKEN=TOKEN_FROM_TERMINAL
```

3. Run both client and server 
```bash
npm install
npm start
```

8. Use this application at ```http://localhost:3000/```

## Usage

1. **Search for a Song**: Enter the name of the song you want to search for in the search bar located at the top of the page.
   
2. **Rate a Song**:
   - Once the search results appear, select the song you want to rate from the list.
   - Enter your rating for the song using a scale of 1 to 5 stars.
   - Optionally, provide comments about the song in the designated field.
   - Click the "Submit" button to submit your rating and comments.
   
3. **View Ratings**:
   - After submitting a rating, you can view the average rating and comments provided by other users for the same song.
   - Scroll down to see the average rating and comments displayed below the song details.

4. **Search Again**:
   - To search for another song, simply repeat the process by entering a new song name in the search bar.

5. **View All Songs**:
   - If you want to view all songs again after searching for a specific song, click on the "View All Songs" button.

## Extending and Improving the Application and API

- **Immediate Review Submission**: Implement functionality for users to write a review directly after selecting a song. Display the review under the song details for immediate feedback.
  
- **UI Enhancement**: Improve the user interface to make it more intuitive and user-friendly. Utilize design principles to optimize space usage and enhance visual appeal.

## Deployment Strategy

- **Vercel**: Vercel can be a suitable deployment platform for the application due to its ease of use, seamless integration with frontend frameworks like React.js, and support for serverless functions.

## Intuitive Design and User Interface

- **One-Action-Per-Page**: The design follows a one-action-per-page approach, providing clarity to users and simplifying navigation. This design choice reduces confusion and ensures a clear path for users to follow.
