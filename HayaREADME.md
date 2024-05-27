# Makeup Products API

This project is a web application that allows users to search for makeup products, suggest new products, and view their suggestions. The application uses Node.js, Express, and MongoDB.

## Project Structure

makeup-products/
│
├── models/
│ ├── Product.js
│ └── UserInput.js
│
├── public/
│ ├── index.html
│ └── script.js
│
├── server.js
└── package.json


## Prerequisites

- Node.js (v14 or later)
- MongoDB (running locally on `mongodb://localhost:27017/makeup`)

## Installation

1. Clone the repository:

git clone https://github.com/HayaHabes/CSFIntershipAssessment2024.git
cd Haya_Habes_Software_Dev_Assessment
Install the dependencies:
npm install


Start your MongoDB server

Start the server:
node server.js
The server will be running on http://localhost:3000.

Open your browser and navigate to http://localhost:3000.
Use the search form to find products by brand, category, or tag. (brands examples: almay, nyx, maybelline)
If no products are found, the suggestion form will be displayed.
Fill out the suggestion form to submit a new product suggestion.
View your suggestions by entering the suggestion number or clicking "Show All Suggestions".


API Endpoints
POST /api/user-input
Takes in the form data and stores it in the data store. Should return the ID of the newly created form response.

URL: /api/user-input
Method: POST
Request Body:
json

{
  "suggestion_number": 1,
  "brand": "Brand",
  "category": "Category",
  "tag": "Tag",
  "suggested_name": "Suggested Product Name",
  "suggested_description": "Suggested Product Description"
}
Success Response:
Code: 201
Content:
json

{
  "id": 1
}
GET /api/user-input/
Returns the form corresponding to the suggestion number.

URL: /api/user-input/:number
Method: GET
URL Params: number=[integer]
Success Response:
Code: 200
Content:
json

{
  "suggestion_number": 1,
  "brand": "Brand",
  "category": "Category",
  "tag": "Tag",
  "suggested_name": "Suggested Product Name",
  "suggested_description": "Suggested Product Description"
}
Error Response:
Code: 404
Content: {"error": "User input not found"}
GET /api/user-input
Returns all responses to the form.

URL: /api/user-input
Method: GET
Success Response:
Code: 200
Content:
json

[
  {
    "suggestion_number": 1,
    "brand": "Brand",
    "category": "Category",
    "tag": "Tag",
    "suggested_name": "Suggested Product Name",
    "suggested_description": "Suggested Product Description"
  },
  ...
]
GET /api/products
Returns all makeup products, with optional filtering.

URL: /api/products
Method: GET
Query Params: brand=[string], category=[string], tag_list=[string]
Success Response:
Code: 200
Content:
json

[
  {
    "id": 1048,
    "brand": "colourpop",
    "name": "Lippie Pencil",
    "price": "5.0",
    "price_sign": "$",
    "currency": "CAD",
    "image_link": "https://cdn.shopify.com/s/files/1/1338/0845/collections/lippie-pencil_grande.jpg?v=1512588769",
    "product_link": "https://colourpop.com/collections/lippie-pencil",
    "website_link": "https://colourpop.com",
    "description": "Lippie Pencil A long-wearing and high-intensity lip pencil that glides on easily and prevents feathering. Many of our Lippie Stix have a coordinating Lippie Pencil designed to compliment it perfectly, but feel free to mix and match!",
    "rating": null,
    "category": "pencil",
    "product_type": "lip_liner",
    "tag_list": [
        "cruelty free",
        "Vegan"
    ],
    "created_at": "2018-07-08T23:45:08.056Z",
    "updated_at": "2018-07-09T00:53:23.301Z",
    "product_api_url": "https://makeup-api.herokuapp.com/api/v1/products/1048.json",
    "api_featured_image": "//s3.amazonaws.com/donovanbailey/products/api_featured_images/000/001/048/original/open-uri20180708-4-13okqci?1531093614",
    "product_colors": [
        {
            "hex_value": "#B28378",
            "colour_name": "BFF Pencil"
        }
    ]
  },
  ...
]

Q1: how the application and api could be extended and improved?
1. Enhancing the search functionality by providing autocomplete suggestions as users type in the search fields to improve user experience.
2. Add user registration and login functionality. Allow users to save their favorite products and suggestions.
3. Implement roles such as, admin and user to manage access to different parts of the application and administrative actions like adding new products directly.
4. Ensure the application is responsive and works well on different screen sizes and devices.

Q2: Discuss how the application and api should be deployed
1. Choose a Hosting Provider: Select a hosting provider that supports Node.js and MongoDB. Popular choices include AWS, Heroku, DigitalOcean, and Azure.
2. Use a managed MongoDB service like MongoDB Atlas for scalability and reliability.
3. Use a process manager like PM2 to manage the Node.js application processes.
4. Use CI/CD tools like GitHub Actions, Jenkins, or Travis CI to automate testing and deployment.
5. Set up pipelines to automatically deploy changes to the production environment after passing test
6. Push the application code to the hosting provider.
7. Configure the server to run the application using the chosen process manager.
8. Implement regular backups for the database.



Q3: Intuitive design and user interface
1. The use consistent colors, fonts, and design elements throughout your application.
2. The use of clear labels for navigation items, making the navigation structure simple and easy to understand.
3. The use size, color, and positioning to create a visual hierarchy that guides users' attention to the most important elements first.
4. The use size, color, and positioning to create a visual hierarchy that guides users' attention to the most important elements first.
