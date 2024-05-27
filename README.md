***
# Arthitis Tracker API
Sarah Gallaugher \
CSF Internship Assessment 2024
***

There have been many studies on the affects of weather on arithitis symptoms especially in relation to humidity and barometric pressure. My program allows a user to keep track of their symptoms and the weather at the time in their location, which can allow for exploration of trends in the data.

A user can input their geographical location, the symptoms(s) they are experiencing, and the severity of their pain. The location information is then used to query the external api (weatherapi.com) to get the current weather for that location including the temperature, the humidity, and barometric pressure which is then saved to a local database and displayed to the user on the frontend.

Source: https://www.health.harvard.edu/blog/can-the-weather-really-worsen-arthritis-pain-201511208661

### Instructions

First, install node modules by running these commands:
```bash
cd arthritisAPI
npm install
```

To run the backend:
```bash
cd src
node server.js
```

This sets up the server for the endpoints. It's defaulted to run on port 8080, however you can change this in the code if you would like to.

To get the front end running, open a new terminal window/tab connected to the src folder and enter this command in your terminal:
```bash
npm run dev
```

Now go to "localhost:5173" in your web browser (preferably Google Chrome as I have not tested in any others). If that port is not available, go to the available one that it has found as indicated in the terminal.

### Extensions and Improvements

There are many extensions and improvements that could be made including:
- Option to delete entries
- Option to edit entries
- Option to select what weather data a user would like to include
- Better User interface (light mode, )
- Filters and sorting for weather type, pain level, etc.
- Dashboard to analyze the data
- Option for light mode
- Accessibility options

### Deployment

I have never deployed a web application before, but I'm interested in learing how to.

# UI
Hopefully it's clear that the colours (green, orange, and red) around the entries are representative of the severity of the pain, to make it easier to see any trends.
