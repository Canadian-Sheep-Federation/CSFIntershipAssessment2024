# SOFTWARE DEVELOPER ASSESSMENT
# HOW TO RUN THE CODE
Run the following commands (replace pip with pip3 if needed):
1. pip install requests
2. pip install flask
3. pip install flask-wtf

In the folder CSFInternshipAssessment2024, run any of the following commands in the terminal (at least one should work):
1. python SoftwareDeveloperAssessment/main.py
2. python3 SoftwareDeveloperAssessment/main.py
3. py SoftwareDeveloperAssessment/main.py

The terminal should have a line that looks something like this: 
* Running on http://127.0.0.1:5000 (the address is just an example)

Enter the URL that appears in the terminal in a web browser.

Once you see the form page, enter any details that you want, and select any Attack on Titan character from the list. The images and names use the Jikan API, which interacts with MyAnimeList. 

Once the form is successfully submitted, you can click "View Other Entries" page to view all the entries.

# ENDPOINTS
1. /POST/ (i.e., http://127.0.0.1:5000/POST/) can accept a JSON with the following keys:
   * "entry_id": integer (ensure integer is greater than the number of entries already submitted)
   * "first_name": string
   * "birthday": string of the form "YYYY-MM-DD"
   * "bio": string
   * "image": URL of an image
2. /GET/<entry_id> (i.e., http://127.0.0.1:5000/GET/0, where 0 is the entry ID). Entry IDs can be found for each entry when you click "View Other Entries" on the form. 
3. /GET/ (i.e., http://127.0.0.1:5000/GET/, where no entry ID is provided). If no entry ID is provided, all the entries will be shown.

# BONUS POINTS

### Discuss how the application and api could be extended and improved
The application could be extended by being able to select an image from any anime, not just Attack on Titan. I could make use of other aspects of the Jikan API to accomplish this. 

### Discuss how the application and api should be deployed
Hypothetically, they should be deployed through GitHub, where other programmers can test it. I do not think it is suited for use of the general public (yet).

### Intuitive design and user interface
I believe the design and UI are intuitive.

# SOURCES
Generative AI was partially used to help make the HTML files in the directory SoftwareDeveloperAssessment/templates/. Everything else was created with the knowledge I gained from my software engineering class and some YouTube videos.
