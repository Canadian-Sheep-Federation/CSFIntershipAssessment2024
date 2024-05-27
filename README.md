# Project Overview: Sheep Health Watch

## Objective

Sheep Health Watch is a web platform designed to enable farmers to report and monitor incidents of sick sheep in their community via an interactive map. The goal is to empower farmers with valuable insights and foster collaboration in managing sheep health, ultimately benefiting agricultural sustainability and productivity.

## Key Features

### Reporting Form

- Reporters can fill out a form to report the health status of their sheep.
- The form includes fields such as the number of sick sheep, symptoms observed, and any treatments administered.

### Interactive Map Display

- Farmers' locations are pinned on the map with markers based on the submitted reports.
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

## Testing

- Unit tests to ensure the correctness of the API endpoints.
- Testing is done using [Jest](https://jestjs.io/) as the testing framework along with [Supertest](https://github.com/visionmedia/supertest) for making HTTP requests to the API.

## Deployment

- onRender.com

## API Improvements

### Enhanced Health Report Model

- Expand the reporting to include additional attributes such as age, breed, vaccination history, and specific symptoms to provide a more comprehensive dataset for analysis and decision-making.

### Data Validation and Quality Control

- Implement data validation mechanisms on the reporting form to ensure the accuracy and reliability of the submitted information, including validating address and performing sanity checks on reported values.

### User Authentication and Authorization

- Implement user authentication and authorization mechanisms to control access to the reporting form and restrict sensitive information. This would enable registered users to access additional features and maintain data privacy and security.

### Real-Time Notifications and Alerts

- Implement real-time notification systems to alert farmers about critical health issues or disease outbreaks in their region. Utilize push notifications, email alerts, or SMS notifications to notify users promptly and facilitate timely responses.

## Next Steps

- **Data Visualization**: Implement charts and graphs to display aggregated data on the dashboard. Use libraries like Chart.js or D3.js for dynamic and interactive visualizations.
- Gather requirements and feedback from potential users (farmers) to refine the feature set.
- Develop a prototype and conduct user testing to ensure usability and functionality.
- Iterate on the design based on feedback and launch a beta version for broader testing.
