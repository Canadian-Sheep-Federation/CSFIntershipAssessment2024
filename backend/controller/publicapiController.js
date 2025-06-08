const Publicapi = require('../middleware/publicapiMiddleware');

// search meal by name
exports.fetchmealData = async (req, res) => {
    const name = req.query.name || '';
    try {
        const meals = await Publicapi.searchMealByName(name);

        res.json({ meals });

    } catch (error) {
        res.status(500).send('Error fetching meals');
    }
};


// search meal by id
exports.fetchmeanbyID = async (req, res) => {
    const id = req.params.id || '';
    console.log("params>>>>>>>>>>", id);
    try {
        const meal = await Publicapi.searchMealByID(id);

        res.json({ meal });

    } catch (error) {
        res.status(500).send('Error fetching meals');
    }
};