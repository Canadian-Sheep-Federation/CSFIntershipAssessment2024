const axios = require('axios').default;

// This should be kept private, however since you need to register for account I have left mine in for your convenience
// You may replace with your own key if desired
const API_KEY = "c27ab7ca5902484a90a73426242605";

// get current weather (temperature, humidity, barometric pressure, etc. from weatherapi.com)
async function fetchWeather (location) {
    const apiUrl = `http://api.weatherapi.com/v1/current.json?key=` + API_KEY + `&q=${location}`

    try { //success
        const response = await axios.get(apiUrl);
        console.log(response.data);

        return response.data;

    } catch (error) { //fail
        console.log("HERE*******************");
        console.error(error);
        return(error);
    }
};

module.exports = { fetchWeather };