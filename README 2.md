# Dog Breeds Explorer

Welcome to the Dog Breeds Explorer, a React application designed to showcase the different breeds of dogs using the Dog CEO's Dog API. 

## Table of Contents

- [Features](#features)
- [Screenshots](#screenshots)
- [Using the Application](#using-the-application)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Available Scripts](#available-scripts)
- [Bonus Points](#bonus-points)
- [Contact](#contact)

  
## Features

- **List All Breeds**: Fetch and display a list of all dog breeds using the Dog CEO API.
- **View Random Images**: Upon selecting a breed, users can view a random image of that specific breed.
- **Responsive Design**: Built with mobile-first design principles in mind, ensuring a seamless experience across all devices.
- **Modern UI**: Utilizes Tailwind CSS for styling, providing a clean and modern user interface.

## ScreenShots
### Big Screen:
- Home Page
![Screen Shot 2024-05-24 at 7 12 41 PM](https://github.com/ibrahimkedir10/personal-website-2/assets/93158833/566c26cb-3986-4f1a-82a5-af0ada927265)
- Saved Memories Page
![Screen Shot 2024-05-24 at 7 13 51 PM](https://github.com/ibrahimkedir10/personal-website-2/assets/93158833/f9767787-3ed1-49f0-8b79-7d8d9db06319)
### Meduim Screen Size
![Screen Shot 2024-05-24 at 7 14 58 PM](https://github.com/ibrahimkedir10/personal-website-2/assets/93158833/90879df6-4504-4cb8-9b7d-63c5c7bd2015)
### Small Screen Size
![Screen Shot 2024-05-24 at 7 15 16 PM](https://github.com/ibrahimkedir10/personal-website-2/assets/93158833/28939768-6e25-4bfe-a286-73cfd88fe16c)

## Using the Application
1. Home Page

- On the home page, you will see a header with the title "Dog Breed Explorer".
- Below the header, there are three main sections:
- Dog Breed List: On the left, a list of dog breeds fetched from the Dog CEO API.
- - Form: In the center, a form to name and describe the dog.
- - Dog Image: On the right, a random image of the selected dog breed.


2. Selecting a Dog Breed

- Click on any breed from the list on the left. This will fetch and display a random image of the selected breed on the right side.

3. Naming and Describing the Dog

- Enter a name and description for the selected dog in the form in the center.
- The form includes:
- A text input for the dog's name.
- A textarea for a description of the dog.

4. Saving to Memories

- After selecting a breed and filling out the form, click the "Save to Memories" button below the form.
- This will save the dog's image, name, breed, and description to the "memories" section.

5. Viewing Saved Memories

- Click on the "Memories" link in the navigation menu.
- This will take you to a page where you can see all your saved dogs with their images, names, breeds, and descriptions.

6. Deleting a Memory

- In the "memories" section, each saved dog has a delete button (represented by a trash can icon).
- Click this button to remove the dog from your memories.

## Technologies Used
- React: JavaScript library for building user interfaces
- Jest: JavaScript testing framework
- React Testing Library: Library for testing React components
- Tailwind CSS: Utility-first CSS framework for styling

  
### Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

## Prerequisites

What you need to install the software:

- Node.js
- npm (Node Package Manager)

## Installation

Contributing
Feel free to submit issues and enhancement requests.

1. Fork the repository.
2. Create a new branch (git checkout -b feature-branch).
3. Make your changes.
4. Commit your changes (git commit -m 'Add some feature').
5. Push to the branch (git push origin feature-branch).
6. Open a pull request.

### Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

## `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

## `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

## `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

## Bonus Points
### How the Application and API Could Be Extended and Improved
1. User Authentication: Implement user authentication to allow users to create accounts and save their favorite breeds to their profiles. This would enhance user engagement and personalization.

2. Additional Information: Provide more detailed information about each breed, such as temperament, size, and care requirements. This could be fetched from an additional API or a custom database.

3. Image Gallery: Instead of displaying a single random image, create an image gallery for each breed. Users could browse through multiple images of the selected breed.

4. Search Functionality: Add a search bar to allow users to quickly find specific breeds.

5. Breed Comparison: Allow users to compare different breeds side by side based on various characteristics.

6. Improved Form: Enhance the form with validation and additional fields, such as user comments or ratings.

### How the Application and API Should Be Deployed
1. Frontend Deployment: The React application can be deployed using services like Vercel, Netlify, or GitHub Pages. These platforms offer seamless integration with GitHub repositories and provide continuous deployment capabilities.

2. Backend Deployment: If a backend is required, it can be deployed using platforms like Heroku, AWS, or DigitalOcean. These platforms offer scalable solutions for running Node.js applications and can easily integrate with databases.

3. Database: For storing user data and breed information, a managed database service like MongoDB Atlas, AWS RDS, or Firebase can be used. These services provide reliable and scalable database solutions.

4. Continuous Integration/Continuous Deployment (CI/CD): Implement CI/CD pipelines using GitHub Actions, Travis CI, or CircleCI to automate testing and deployment processes. This ensures that any changes to the codebase are tested and deployed automatically.

5. SSL/TLS: Ensure that the application uses HTTPS by obtaining SSL/TLS certificates. This can be easily managed by platforms like Vercel, Netlify, or using services like Let's Encrypt.

6. Monitoring and Logging: Implement monitoring and logging using services like LogRocket, Sentry, or New Relic. This helps in tracking performance issues and errors in real-time

### Contact
ibrahim.kedir@outlook.com 



