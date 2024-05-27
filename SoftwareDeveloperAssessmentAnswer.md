# Running Instructions for React TypeScript App with .NET Backend

## Prerequisites

Ensure you have the following installed on your machine:

- Node.js and npm (for the front end)
- .NET SDK (for the back end)
- SQLite (for the database)

## Steps to Run the Application

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/Canadian-Sheep-Federation/CSFIntershipAssessment2024.git
   cd CSFIntershipAssessment2024

- Switch to specific branch

    ```bash
    git checkout nick-submission-for-software-dev
    ```
    
2. **Run the API:**

   - Navigate to the `API` directory:

     ```bash
     cd API
     ```

   - Run the API:

     ```bash
     dotnet watch
     ```

   - The API will be available at `https://localhost:5000`.

3. **Run the Frontend:**

   - Navigate to the `Frontend` directory:

     ```bash
     cd client-app
     ```

   - Install the dependencies:

     ```bash
     npm install
     ```

   - Run the frontend:

     ```bash
     npm --watch start
     ```

   - The frontend will be available at `http://localhost:3000`.

4. **Access the Application:**

   - Open your browser and navigate to `http://localhost:3000`.

5. **Using the Application:**

    - Users can create a new activity.
    - Users can view the list of activities available.
    - Users can view an activity, make edit to its content and delete it.

6. **Stopping the Application:**
  
      - To stop the API, press `Ctrl + C` in the terminal where the API is running.
      - To stop the frontend, press `Ctrl + C` in the terminal where the frontend is running.

7. **Build and Deploy:**

    *Build the .NET API*

    ```bash
    cd API
    dotnet publish -c Release -o ./publish
    ```

    *Build the Vite project*

    ```bash
    cd client-app
    npm run build
    ```

    *Deploy the application*

    - Copy the contents of `my-vite-app/dist` to the `publish/wwwroot` folder of the .NET API.
    - Host the .NET API (e.g., using IIS, Docker, or any cloud provider).

## Additional Notes

- The API is built using .NET Core and Entity Framework Core with SQLite as the database.
- The frontend is built using React with TypeScript.
- The API has the following endpoints:
  - `POST /activities`: Creates a new activity.
  - `GET /activities`: Retrieves all activities.
  - `GET /activities/{id}`: Retrieves a specific activity by ID.
  - `PUT /activities/{id}`: Updates a specific activity by ID.
  - `DELETE /activities/{id}`: Deletes a specific activity by ID.
- The frontend consumes the API to perform CRUD operations on activities.
- The application is a simple example of a full-stack application with a .NET backend and a React frontend.
- The application can be extended by adding more features such as user authentication, search functionality, and pagination.
- The application can be deployed by hosting the API on a server and deploying the frontend to a hosting service like Netlify or Vercel.

## Bonus Points

### Extending and Improving the Application

- **User Authentication:** Implement user authentication using JWT tokens to secure the API endpoints and allow users to log in and access their activities.
- **Search Functionality:** Add a search bar to allow users to search for activities based on keywords or categories.
- **Pagination:** Implement pagination to limit the number of activities displayed on a single page and allow users to navigate through multiple pages.
- **Activity Categories:** Add the ability to categorize activities and filter them based on categories.
- **Activity Comments:** Allow users to add comments to activities and view comments from other users.
- **Activity Likes:** Implement a like feature to allow users to like activities and display the number of likes for each activity.
- **Activity Reminders:** Implement a reminder feature to allow users to set reminders for activities and receive notifications.
- **Activity Images:** Allow users to upload images for activities and display images in the activity details page.
- **Activity Location:** Add a location field to activities and display activities on a map based on their location.
- **Cloud Storage:** Store activity images and other media files in a cloud storage service like AWS S3 or Azure Blob Storage.
- **Real-Time Updates:** Implement real-time updates using WebSockets to notify users of new activities or changes to existing activities.
- **Activity Ratings:** Add a rating system to allow users to rate activities and display the average rating for each activity.
- **Activity Sharing:** Implement a sharing feature to allow users to share activities with others via email or social media.
- **Activity Calendar:** Add a calendar view to display activities based on their date and time and allow users to schedule activities.
- **Dockerize the Application:** Containerize the application using Docker to simplify deployment and ensure consistency across different environments.
- **Logging and Monitoring:** Monitor the application using tools like New Relic or Datadog to track performance metrics and ensure high availability.
- **Automated Testing:** Write unit tests and integration tests for the API and frontend to ensure the application works as expected and catches bugs early in the development process.
- **CI/CD Pipeline:** Set up a continuous integration and continuous deployment pipeline to automate the testing and deployment process for the application.
- **Performance Optimization:** Optimize the application for performance by minifying assets, lazy loading components, and caching data to reduce load times.
- **Internationalization:** Add support for multiple languages by implementing internationalization and localization features in the frontend and backend.
- **Offline Support:** Implement offline support using service workers to allow users to access the application even when they are offline.
- **Dark Mode:** Add a dark mode theme to the application to reduce eye strain and improve readability in low-light environments.

### Deploying the Application

- **Hosting the API:** Deploy the API to a cloud hosting service like Azure, AWS, or Heroku. Configure the database connection and environment variables for the production environment.
- **Deploying the Frontend:** Deploy the frontend to a hosting service like Netlify, Vercel, or GitHub Pages. Set up the deployment pipeline to automatically deploy changes to the frontend when new code is pushed to the repository.

### Intuitive Design and User Interface

- **Responsive Design:** Make the frontend responsive to work on different screen sizes and devices.
- **User-Friendly Interface:** Improve the user interface by adding animations, transitions, and feedback messages to enhance the user experience.
- **Accessibility:** Ensure the application is accessible to users with disabilities by following best practices for web accessibility.
- **Error Handling:** Implement error handling and validation to provide meaningful error messages to users when they encounter issues while using the application.

## Conclusion

This application demonstrates the integration of a .NET Core API with a React frontend to create a full-stack application. The application allows users to perform CRUD operations on activities and showcases the use of TypeScript for type safety in the frontend. The application can be extended and improved by adding more features and enhancing the user interface. Deploying the application involves hosting the API and deploying the frontend to a hosting service. Overall, this project provides a foundation for building scalable and maintainable full-stack applications.

[]: # (END)
