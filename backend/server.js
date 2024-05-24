
/**
 * 
 * This is the server of the backend written in Node.js. It contains the routes to communicate with the Nutritionix API.
 * 
 * Name: Nilushanth Thiruchelvam
 * Date: May 24, 2024
 * 
 * 
 * API credentials
 * Application ID: 4019d9a5
 * Application Key: 472243e99877e5c231f3a541152f4051	
 */

const express = require("express");
const axios = require("axios");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./db"); // Import the database connection

const app = express();
app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json()); // Use body-parser middleware to parse JSON bodies

const PORT = 5000;

const calcNutrition = (value, servingWeightGrams, feedQuantityInGrams) => {
    return (value / servingWeightGrams) * feedQuantityInGrams;
};

app.listen(PORT, () => {
    console.log(`Server running, app listening on port ${PORT}`);
});

app.post('/', async (req, res) => {
    /**
     * This endpoint is used to desrtucure the form data from the frontend and make a call to the endpoint 'https://trackapi.nutritionix.com/v2/natural/nutrients' to save the nutrition data from the api call to the database. 
     */
    const {
        sheepId,
        healthStatus,
        conditionDescription,
        feedType,
        feedQuantity,
        feedWeight,
        feedDate
    } = req.body;

    const sheepFeedNutritionalValues = {
        // Predefined feeds for grass because the api call does not work for grass and hay. This is data I found online related to animal science websites.
        grass: {
            serving_weight_grams: 100,
            food_name: "grass",
            photo: { highres: "../images/grass-image.png" },
            nf_calories: 41,
            nf_total_fat: 0.5,
            nf_saturated_fat: 0.1,
            nf_cholesterol: 0,
            nf_sodium: 4,
            nf_total_carbohydrate: 7,
            nf_dietary_fiber: 4,
            nf_sugars: 3,
            nf_protein: 3,
            nf_potassium: 300
        },
        hay: {
            serving_weight_grams: 100,
            food_name: "hay",
            photo: { highres: "../images/hay-image.png" },
            nf_calories: 79,
            nf_total_fat: 0.6,
            nf_saturated_fat: 0.1,
            nf_cholesterol: 0,
            nf_sodium: 6,
            nf_total_carbohydrate: 14,
            nf_dietary_fiber: 8,
            nf_sugars: 2,
            nf_protein: 5,
            nf_potassium: 500
        }
    };

    if (sheepFeedNutritionalValues[feedType.toLowerCase()]) {
        nutritionData = { foods: [sheepFeedNutritionalValues[feedType.toLowerCase()]] };
    } else {
        const endpoint = 'https://trackapi.nutritionix.com/v2/natural/nutrients';
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'x-app-id': '4019d9a5',
                'x-app-key': '472243e99877e5c231f3a541152f4051'
            }
        };

        const requestBody = {
            query: feedType
        };

        try {
            const response = await axios.post(endpoint, requestBody, config);
            nutritionData = response.data;
        } catch (error) {
            console.log(error);
            return res.status(500).send("Error fetching nutrition data from the API");
        }
    }

    let feedQuantityInGrams;
    if (feedWeight === "kg") {
        feedQuantityInGrams = feedQuantity * 1000;
    } else if (feedWeight === "lbs") {
        feedQuantityInGrams = feedQuantity * 453.592;
    } else if (feedWeight === "grams") {
        feedQuantityInGrams = feedQuantity;
    } else {
        return res.status(400).send("Invalid feed weight unit");
    }

    const servingWeightGrams = nutritionData.foods[0].serving_weight_grams;
    const foodName = nutritionData.foods[0].food_name;
    const foodPhoto = nutritionData.foods[0].photo.highres;
    const nfCalories = nutritionData.foods[0].nf_calories;
    const nfTotalFat = nutritionData.foods[0].nf_total_fat;
    const nfSaturatedFat = nutritionData.foods[0].nf_saturated_fat;
    const nfCholesterol = nutritionData.foods[0].nf_cholesterol;
    const nfTotalCarbohydrate = nutritionData.foods[0].nf_total_carbohydrate;
    const nfDietaryFiber = nutritionData.foods[0].nf_dietary_fiber;
    const nfSugars = nutritionData.foods[0].nf_sugars;
    const nfProtein = nutritionData.foods[0].nf_protein;
    const nfPotassium = nutritionData.foods[0].nf_potassium;
    const nfSodium = nutritionData.foods[0].nf_sodium;

    const totalCalories = calcNutrition(nfCalories, servingWeightGrams, feedQuantityInGrams);
    const totalFat = calcNutrition(nfTotalFat, servingWeightGrams, feedQuantityInGrams);
    const saturatedFat = calcNutrition(nfSaturatedFat, servingWeightGrams, feedQuantityInGrams);
    const cholesterol = calcNutrition(nfCholesterol, servingWeightGrams, feedQuantityInGrams);
    const sodium = calcNutrition(nfSodium, servingWeightGrams, feedQuantityInGrams);
    const totalCarbohydrate = calcNutrition(nfTotalCarbohydrate, servingWeightGrams, feedQuantityInGrams);
    const dietaryFiber = calcNutrition(nfDietaryFiber, servingWeightGrams, feedQuantityInGrams);
    const sugars = calcNutrition(nfSugars, servingWeightGrams, feedQuantityInGrams);
    const protein = calcNutrition(nfProtein, servingWeightGrams, feedQuantityInGrams);
    const potassium = calcNutrition(nfPotassium, servingWeightGrams, feedQuantityInGrams);

    const insertSheepQuery = `
        INSERT INTO sheep (sheep_id, health_status, condition_description)
        VALUES (?, ?, ?)
        ON CONFLICT(sheep_id) DO UPDATE SET
        health_status=excluded.health_status,
        condition_description=excluded.condition_description
    `;

    db.run(insertSheepQuery, [sheepId, healthStatus, conditionDescription], function (err) {
        if (err) {
            console.error(err);
            return res.status(500).send("Error saving sheep data to the database");
        }

        const insertFeedLogQuery = `
            INSERT INTO feed_logs (
                sheep_id, feed_type, feed_quantity, feed_weight, feed_date,
                total_calories, total_fat, saturated_fat, cholesterol, sodium,
                total_carbohydrate, dietary_fiber, sugars, protein, potassium, food_photo
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        db.run(insertFeedLogQuery, [
            sheepId, feedType, feedQuantity, feedWeight, feedDate,
            totalCalories, totalFat, saturatedFat, cholesterol, sodium,
            totalCarbohydrate, dietaryFiber, sugars, protein, potassium, foodPhoto
        ], function (err) {
            if (err) {
                console.error(err);
                return res.status(500).send("Error saving feed log to the database");
            }

            console.log("Data saved to the database");
            res.status(200).send({
                id: this.lastID, // Return the ID of the newly created form response
            });
        });
    });
});

app.get('/:id', (req, res) => {
    /**
     * This '/:id' endpoint is used for getting a record by a specific id from the database.
     */
    const query = `
        SELECT s.sheep_id, s.health_status, s.condition_description, 
               f.feed_type, f.feed_quantity, f.feed_weight, f.feed_date,
               f.total_calories, f.total_fat, f.saturated_fat, f.cholesterol,
               f.sodium, f.total_carbohydrate, f.dietary_fiber, f.sugars,
               f.protein, f.potassium, f.food_photo
        FROM sheep s
        LEFT JOIN feed_logs f ON s.sheep_id = f.sheep_id
        WHERE s.sheep_id = ?
    `;
    db.all(query, [req.params.id], (err, rows) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Error fetching records from the database");
        }
        console.log("Fetched record by ID from the database");
        res.status(200).json(rows);
    });
});

app.get('/', (req, res) => {
    /**
     * This '/' endpoint is used for getting all the records from the database. 
     */
    const query = `
        SELECT s.sheep_id, s.health_status, s.condition_description, 
               f.feed_type, f.feed_quantity, f.feed_weight, f.feed_date,
               f.total_calories, f.total_fat, f.saturated_fat, f.cholesterol,
               f.sodium, f.total_carbohydrate, f.dietary_fiber, f.sugars,
               f.protein, f.potassium, f.food_photo
        FROM sheep s
        LEFT JOIN feed_logs f ON s.sheep_id = f.sheep_id
    `;
    db.all(query, [], (err, rows) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Error fetching records from the database");
        }
        console.log("Fetched records from the database");
        res.status(200).json(rows);
    });
});
