const axios = require('axios');

//fetch meals by name from public API
exports.searchMealByName = async (name) => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`;
    const response = await axios.get(url);
    return response.data.meals || [];
};

//fetch meals by id from public API
exports.searchMealByID = async (id) => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    const response = await axios.get(url);
    return response.data.meals || [];
};