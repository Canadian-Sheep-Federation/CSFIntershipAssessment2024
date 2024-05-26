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

**Acknowledgements**
- REST Countries API
- Bootstrap
