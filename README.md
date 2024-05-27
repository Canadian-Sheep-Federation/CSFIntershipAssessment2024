# CSF Intership Assessment 2024

HOW TO RUN MY PROJECT

For the backend I decided to use Django DRF to create my rest API (sqlite for data ) and for the frontend I used React.

FIRST you may most likely have to install the following if you've never ran a django DRF + react project before 

pip install django
pip install djangorestframework
npm install axios
pip install django-cors-headers

After cloning my repo follow these steps. Both the frontend and backend need to be running at the same time.


1) Running the Backend
    - Navigate into the restAPI Folder (pwd should be CSFIntershipAssessment2024/restAPI)
    - Run the following command  " python manage.py runserver "
    - Afterwards head to this URL -> http://127.0.0.1:8000/api/ 
    - This is where all APIS that are created will show up. For this project I only created moviereviews. Click on " http://127.0.0.1:8000/api/moviereviews/ " and it'll take you to the API For this specific project.
    - If everything is succesfull this is where u can view all the API calls we have made to our backend and stored the fields from the frontend.

    Ran into some issues running backend ? Try these

    - Theres a possiblity that you have to migrate the backend changes to view it so try running these commands.

    python manage.py makemigrations
    python manage.py migrate


2) Running Frontend
  - Running the react frontend is very straight forward. Navigate into restAPI folder and youll see a frontend folder. Cd into that. ( cd restAPI/frontend/movie-site)
  - Run the frontend by typing " npm start "
  - The react is very barebones and should need any other things to be installed like the backend


3) Making an API Post
  - Fill out the information on the page and click on the submit button. Afterwards you should see the new movie you just reviewd show up on the backend URL that you were on previously. " http://127.0.0.1:8000/api/moviereviews/


4) GET /{id}:
  - Getting an ID of a specific review is very straight forward. ALl you have to do is type the id at the end of the backend url, an example would be ' http://127.0.0.1:8000/api/moviereviews/2 '
    - This would return the movie you just reviewed coresponding with that ID.

5) GET /: 
 - The Get/ is actually just the default url ! http://127.0.0.1:8000/api/moviereviews/  
 - It shows everything added into our DB



