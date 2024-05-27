require("dotenv").config(); // inclding for .env file and defined configuration as per it

const app = require("./app");

const port = process.env.PORT || 3000; // set port value as per .env file and if not present then set to 8000 as default

// server starting and listening to request on port defined
app.listen(port, () => {
    console.log(`Server Listening at ${port}`);
});