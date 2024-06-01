//  Function to retrieve a cat fact from the API and populate the comment field
document.getElementById('getCatFact').addEventListener('click', async () => {
    try {
        const response = await fetch('https://catfact.ninja/fact');
        const data = await response.json();
        const catFact = data.fact;
        document.getElementById('comment').value = catFact;
    } catch (error) {
        console.error('Error fetching cat fact:', error);
    }
});

// Function to submit the form data to the server
document.getElementById('form').addEventListener('submit', event => {
    event.preventDefault();

    //get the form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const catFact = document.getElementById('comment').value;
    const age = document.getElementById('age').value;

    //send the form data to the server and display the response
    fetch('http://localhost:3000/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, age, email, catFact})
    })
        .then(response => response.json())
        .then(data => {
            alert('Form submitted successfully with ID: ' + data.id);
            loadResponses();
        })
        .catch(error => console.error('Error submitting form:', error));
});
//document.getElementById('getResponses').addEventListener('click', loadResponses);
document.getElementById('searchButton').addEventListener('click', searchByID);

// Function to search for a form response by ID
function searchByID() {
    const id = document.getElementById('searchID').value;
    console.log('id');
    fetch(`http://localhost:3000/${id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const responsesList = document.getElementById('responses');
            responsesList.innerHTML = '';
            const listItem = document.createElement('li');
            listItem.innerHTML = `ID: ${data.id}<br>-Name: ${data.name}<br>-Email: ${data.email}<br>-Cat Fact: ${data.catFact}`;
            responsesList.appendChild(listItem);
        })
        .catch(error => console.error('Error loading response:', error));
}

// Function to load all form responses
function loadResponses() {
    fetch('http://localhost:3000/list')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text().then(text => {
                console.log('Raw response text:', text); // Log the raw response text
                try {
                    return JSON.parse(text);
                } catch (error) {
                    console.error('Error parsing JSON:', error);
                    throw new Error('Error parsing JSON');
                }
            });
        })
        .then(data => {
            const responsesList = document.getElementById('responses');
            responsesList.innerHTML = '';
            data.forEach(response => {
                const listItem = document.createElement('li');
                listItem.innerHTML = `ID: ${response.id}<br>-Name: ${response.name}<br>-Email: ${response.email}<br>-Cat Fact: ${response.catFact}`;
                responsesList.appendChild(listItem);
            });
        })
        .catch(error => console.error('Error loading responses:', error));
}

loadResponses();