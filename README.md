# Project Overview: Sheep Health Watch
[Live Demo Website](https://sheep-health-watch.onrender.com/)

## Summary

- [1 Min UI & Endpoints Demo Video](https://youtu.be/rmdL0Khwxjc)
- [Endpoint Documentation](EndpointDocumentation.md): Detailed information on API endpoints.
- [Local Setup Guide](LocalSetupGuide.md): Instructions for setting up the project locally.
- [Objective](#objective): The goal and purpose of the project.
- [Key Features](#key-features): Major functionalities provided by the platform.
- [Benefits](#benefits)
- [Tech Stack](#tech-stack): Technologies and tools used.
- [API Improvements](#api-improvements): Planned enhancements for the API.
- [Next Steps](#next-steps): Upcoming development plans and activities.

## Objective

Sheep Health Watch is a web platform designed to enable farmers to report and monitor incidents of sick sheep in their community via an interactive map. The goal is to empower farmers with valuable insights and foster collaboration in managing sheep health, ultimately benefiting agricultural sustainability and productivity.

## Key Features

### Reporting Form
- Reporters can fill out a form to report the health status of their sheep.
- The form includes fields such as the number of sick sheep, symptoms observed, and any treatments administered.

### Interactive Map Display
- Farms locations are pinned on the map with markers based on the submitted reports.
- Clicking on a marker displays detailed information about the farm, including the latest reports on sheep health.

### Mobile-Friendly Interface
- Ensure the website is responsive and accessible on various devices, including smartphones and tablets.

## Benefits

### Community Awareness
- Farmers can see the health status of sheep in their region, facilitating knowledge sharing and early detection of widespread issues.

### Data-Driven Decisions
- Access to regional health trends enables farmers to make informed decisions about their livestock management practices.

### Ease of Use
- No registration or login process makes it simple and quick for farmers to participate and share information.

## Tech Stack

### Logo Design
- Canva

### Front-End Development
- JavaScript, HTML, and CSS

### Back-End Development
- Node.js and Express

### Database
- Utilized Mongoose and MongoDB, along with MongoDB Atlas, for storing health reports.

### Public API Integration
- Utilized the **[Google Maps API](https://developers.google.com/maps/documentation)** for mapping and incorporating map markers.
- Implemented address verification through the **[Nominatim API](https://nominatim.org/release-docs/latest/api/Search/)**.

### Testing
- Unit tests to ensure the correctness of the API endpoints.
- Testing is done using [Jest](https://jestjs.io/) as the testing framework along with [Supertest](https://github.com/visionmedia/supertest) for making HTTP requests to the API.

### Deployment
- Hosted onRender.com

## API Improvements

### Enhanced Health Report Model
- Enrich the reporting system with additional attributes like age, breed, vaccination history, and symptoms for comprehensive data analysis and informed decision-making.

### Implementing Filtering Mechanisms
- Introduce filtering capabilities to manage escalating report volumes, ensuring effective control against potential API abuse.

### Utilizing Caching Strategies
- Boost system efficiency with caching strategies, reducing redundant data retrieval, and improving response times, especially for users with limited internet bandwidth.

### Data Validation and Quality Control
- Introduce robust data validation mechanisms to enhance the accuracy and reliability of submitted information, including address validation and sanity checks.

### Strengthening Security Measures
- Implement user authentication and authorization to safeguard sensitive information, ensuring data privacy and security for all users.

## Advancing Further

### Visualizing Data Insights
- Integrate dynamic charts and graphs into the dashboard to present aggregated data visually, facilitating better insights and decision-making.

### User Engagement and Feedback
- Engage farmers in usability testing and gather feedback to refine system usability and functionality, ensuring alignment with user needs.
- 
### Real-Time Notifications and Alerts
- Develop real-time notification systems to promptly alert farmers about critical health issues or disease outbreaks in their vicinity, enabling swift responses.





