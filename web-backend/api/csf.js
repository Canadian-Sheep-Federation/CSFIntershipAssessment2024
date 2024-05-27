const express = require("express");
const axios = require('axios'); // including axios to call public API
const db = require('../database/db');

const router = express.Router();
let sql;

// GET request to display all the surveys 
router.get('/surveys', function (req, res) {

    // SELECT query to display all surveys
    sql = "SELECT * FROM survey"
    try {
        db.all(sql, [], (err, rows) => {
            if (err) {
                return res.json({ status: 300, success: false, error: err.message });
            }
            // no data found
            if (rows.length < 1) {
                return res.json({ status: 300, success: false, error: "No Match" });
            }
            // returning results with data
            return res.json({ status: 200, success: true, data: rows });
        });
    } catch (error) {
        return res.json({ status: 400, success: false, error: err.message });
    }
});

// GET request with survey ID to display specific survey details of ID passed as a path parameter
router.get('/surveys/:id', function (req, res) {

    // extract path parameter from url
    const eventId = (req.params.id).toString();

    // SELECT query to display with WHERE clause to display specific survey details
    sql = "SELECT * FROM survey WHERE id = ?";

    try {
        db.get(sql, [eventId], (err, row) => {
            if (err) {
                return res.json({ status: 300, success: false, error: err.message });
            }
            // no data found
            if (!row) {
                return res.json({ status: 300, success: false, error: "No Match" });
            }
            // returning results with data
            return res.json({ success: true, data: row });
        });
    } catch (error) {
        return res.json({ status: 400, success: false, error: err.message });
    }
});

// POST request to insert new survey details in the database or application storage
router.post('/surveys', (req, res) => {

    // defining survey object details from user input data except id
    const survey = {
        // creating unique ID using uuid to avoid overwritting of data and to keep every survey unique
        id: crypto.randomUUID(),
        name: req.body.name,
        email: req.body.email,
        usageSummary: req.body.usageSummary,
        feedback: req.body.feedback,
        rating: req.body.rating
    };

    // INSERT query to survey
    sql = "INSERT INTO survey (id, name, email, usageSummary, feedback, rating) VALUES (?,?,?,?,?,?)"

    try {
        db.run(sql, [survey.id, survey.name, survey.email, survey.usageSummary, survey.feedback, survey.rating],
            (err, row) => {
                if (err) {
                    return res.json({ status: 300, success: false, error: err.message });
                }
                //returning survey id after successful insertion of data in db
                return res.json({ success: true, id: survey.id, data: survey });
            });
    } catch (error) {
        return res.json({ status: 400, success: false, error: err.message });
    }
});

// GET request to call public api with query parameters
router.get('/public', (req, res) => {

    let resource;
    const searchParams = req.query;
    // checking for resource param as because needs to pass in url of public api
    if(Object.hasOwn(searchParams, "resource")) {
        resource = searchParams.resource;
        // removing resource from query params object
        delete searchParams.resource;
    axios
        .get(`https://fakerapi.it/api/v1/${resource}`, {
            params : searchParams
        })
        .then((response) => {
            res.json(response.data);
        })
        .catch((err) => console.log(err));
    }
    else
        res.statusCode(400).response("Enter valid parameters");
});

module.exports = router;