# Travel Journal

A web application for creating and managing travel journal entries. Users can select countries, add notes, and rate their travel experiences. The application includes light and dark modes, displays country flags, and uses a star-based rating system.

## Features

- **RESTful API**: Backend built with Node.js and Express.
- **Database**: SQLite for storing journal entries.
- **Frontend**: React application for interacting with the API.
- **Public API**: REST Countries API to fetch country data.
- **Light/Dark Mode**: Toggle between light and dark themes.
- **Country Flags**: Display flags for selected countries.
- **Star Ratings**: Dropdown for rating with star symbols.

## Technologies Used

- **Backend**: Node.js, Express, SQLite
- **Frontend**: React, Axios, Bootstrap
- **Public API**: REST Countries API

## Installation

### Prerequisites

- Node.js and npm installed
- Git installed

### Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/travel-journal.git
   cd travel-journal

2. **Backend setup**:
   ```bash
   cd server
   npm install

3. **Frontend setup**:
   ```bash
   cd ../client
   npm install

### Running the Application

1. **Backend Server**:
   ```bash
   cd server
   node server.js

2. **Frontend Start**:
   ```bash
   cd ../client
   npm start

3. **View The Application**
Visit http://localhost:3000 to view the application.

**Usage**

Add Entry:
- Select a country from the dropdown.
- Enter the city/region/province.
- Add your notes.
- Select a rating from 1 to 5 stars.
- Click "Submit" to save the entry.

View Entries:
- All entries will be displayed below the form with the country, city, notes, and star rating.

Toggle Theme:
- Use the "Toggle Dark Mode" button to switch between light and dark themes.

## Bonus

### Application:
1. **Additional Features**: Consider adding features such as user authentication, user profiles, commenting, or social sharing to enhance user engagement.
2. **Data Visualization**: Implement data visualization tools to present travel journal entries in a more engaging and informative manner, such as interactive maps or charts.

### API:
1. **Enhanced Data Storage**: Implement more robust data storage solutions, such as using cloud databases like MongoDB Atlas or Amazon DynamoDB, to scale the API for larger datasets and increased traffic.
3. **Rate Limiting and Authentication**: Add rate limiting and authentication mechanisms to protect the API from abuse and unauthorized access.

### Deployment
1. **Containerization**: Utilize containerization technologies like Docker to package the application and API into lightweight, portable containers for easier deployment across different environments.
4. **Monitoring and Logging**: Set up monitoring and logging solutions (e.g., AWS CloudWatch, ELK stack) to track the performance, health, and security of the deployed application and API.
5. **Security**: Ensure proper security measures are in place during deployment, including HTTPS encryption, secure configuration of server environments, and regular security audits.

### Intuitive Design and User Interface
3. **Visual Hierarchy**: Use visual hierarchy techniques such as color, typography, and spacing to guide users' attention and emphasize important elements within the interface.
4. **Responsive Design**: Ensure the application and API are responsive and optimized for various devices and screen sizes, providing a seamless experience across desktops, tablets, and smartphones.
5. **Accessibility**: Implement accessibility features such as keyboard navigation, screen reader compatibility, and alt text for images to make the application inclusive and usable by all users, including those with disabilities.

**Acknowledgements**
- REST Countries API
- Bootstrap
