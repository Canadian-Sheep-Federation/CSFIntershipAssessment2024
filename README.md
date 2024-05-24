# CSF Intership Assessment 2024 (software developer assessment)

# Sheep Health and Nutrition Monitoring web app

## Overview
The Sheep Health and Nutrition Monitoring application is designed to help farmers track the health and nutrition of their sheep. By utilizing the Nutritionix API this application provides detailed nutritional information for various types of feed like corn, barley and beet which are common foods that sheep eat. This ensures that sheep are receiving balanced nutrition, which is crucial for their health and productivity.

## Chosen API: Nutritionix API
The Nutritionix API provides detailed nutritional information for various foods. For this assessment, I wanted to create an API related to a sheep farming context. This can be useful to track the nutritional content of the feed provided to sheep, helping farmers ensure that their sheep receive balanced nutrition, which is crucial for their health and productivity.

## Form Fields
- **Sheep ID**: A unique identifier for each sheep (e.g., A1, A2, A3, B1, B2, B3, etc.).
- **Health Status**: The current health status of the sheep (e.g., Healthy, Sick, Injured, Deceased).
- **Condition Description**: Additional details about the sheep's condition (optional).
- **Feed Type**: The type of feed provided (e.g., Corn, Oats, Barley, Beet, Alfalfa, Bran).
- **Feed Quantity**: The quantity of feed provided (e.g., 5kg, 10kg, etc.).
- **Feed Weight Unit**: The unit of measurement for the feed quantity (grams, lbs, kg).
- **Feed Date**: The date when the feed was provided.

## API Endpoints
- **POST /**: Takes in the form data and stores it in the SQLite database. Returns the ID of the newly created form response.
- **GET /{id}**: Returns the form data corresponding to the given ID.
- **GET /**: Returns all responses to the form.

## Instructions to Run the API

### Steps to Run the Application

1. **Run the Backend Server**
   - Install the dependencies with:
     ```sh
     npm install
     ```
   - To locally run the server (Node.js), navigate to the backend folder and run:
     ```sh
     node server.js
     ```
   - You can confirm that the server is running (on port 5000) from the console log output: 
     ```
     Server running, app listening on port 5000
     ```

2. **Run the Frontend**
   - Simply open the `index.html` file in your web browser to interact with the frontend. I used the 'Live Sever' VS Code extension to open the index.html file in the development environment. 

## Questions
1. **Discuss how the application and API could be extended and improved**
    Here are following ways the application and API can be extended and improved; I would also use React.js to extend these features to improve the frontend as a whole:
   - **Tailor for specific sheep food**: Tailor for specific sheep food i.e, Timothy grass. Since, nutritionix api is more tailored to human food consumption I can explore different feed apis to get optimal sheep specific food results. 
   - **Sheep Removal Feature**: Implement a feature to remove sheep records from the database. This can help maintain an updated and clean dataset.
   - **Sorting and Filtering**: Add sorting and filtering functionalities to easily sort sheep by health status, feed type, or date.
   - **A Ranking feature**: Implement analytics to compare sheep nutrition data over time. Rank sheep by nutritional intake to identify those receiving the lowest and highest nutrition so the farmers can identify them quickly.
   - **Historical Data Analysis usign AI**: Extend the application to analyze historical data to identify trends and make predictions about sheep health and nutrition. Using machine learning algorithms for predictions and classifications.
   - **User Authentication**: Implement user authentication to ensure that only authorized users can access and modify the sheep records. Such as a sign up form which can be done with firebase.


2. **Discuss how the application and API should be deployed**
    Here are the following ways the API can be deployed from backend and frontend:
   - **Backend Deployment**: Deploy the backend server on a cloud platform like AWS or Heroku. There are also ways to look into using a managed database service like AWS RDS for the SQLite database.
   - **Frontend Deployment**: Host the frontend on a static site hosting service like GitHub Pages or Netlify.
   - **Environment Variables**: Securely storeing API credentials using environment variables. For the purpose of this assessment I stored it locally within the script to ease the process of running the web application when the company tests my app.