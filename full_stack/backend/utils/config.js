require("dotenv").config();

const PORT = process.env.PORT || 3000;
const VIMEO_CLIENT_ID = process.env.VIMEO_CLIENT_ID;
const VIMEO_CLIENT_SECRET = process.env.VIMEO_CLIENT_SECRET;
const VIMEO_PUBLIC_ACCESS_TOKEN = process.env.VIMEO_PUBLIC_ACCESS_TOKEN;
const MONGODB_URI = process.env.MONGODB_URI;

module.exports = {
    PORT,
    VIMEO_CLIENT_ID,
    VIMEO_CLIENT_SECRET,
    VIMEO_PUBLIC_ACCESS_TOKEN,
    MONGODB_URI,
};
