document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('weather-form');
    const fetchForm = document.getElementById('fetch-form');
    const formResponsesDiv = document.getElementById('form-responses');
    const weatherDataDiv = document.getElementById('weather-data');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        console.log('Form submitted');
        
        const city = document.getElementById('city').value;
        const date = document.getElementById('date').value;
        console.log('City:', city, 'Date:', date);

        try {
            const response = await fetch('http://localhost:3200/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ city, date })
            });

            const data = await response.json();
            console.log('Response data:', data);

            if (data.id) {
                alert('Form submitted successfully!');
                loadFormResponses();
            } else {
                alert('Error submitting form (Usually means that the city entered is not spelled correctly or does not exist)');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error submitting form');
        }
    });

    fetchForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        console.log('Fetch form submitted');
        
        const id = document.getElementById('fetch-id').value;
        console.log('Fetching data for ID:', id);

        try {
            const response = await fetch(`http://localhost:3200/${id}`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            console.log('Fetched data:', data);

            if (data) {
                weatherDataDiv.innerHTML = `
                    <div>
                        <p>City: ${data.city}</p>
                        <p>Date: ${data.date}</p>
                        <p>Temperature: ${data.temperature}°C</p>
                    </div>
                `;
            } else {
                weatherDataDiv.innerHTML = '<p>No data found for the given ID.</p>';
            }
        } catch (error) {
            console.error('Error fetching data by ID:', error);
            alert('Error fetching data by ID (Most likely because that id does not exist. the IDs start at 1 and increment by 1)');
        }
    });

    const loadFormResponses = async () => {
        try {
            const response = await fetch('http://localhost:3200/responses');
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            console.log('All form responses:', data);

            if (data.length === 0) {
                formResponsesDiv.innerHTML = '<p>No form responses found.</p>';
                return;
            }

            formResponsesDiv.innerHTML = data.map(entry => `
                <div>
                    <p>City: ${entry.city}</p>
                    <p>Date: ${entry.date}</p>
                    <p>Temperature: ${entry.temperature}°C</p>
                </div>
            `).join('');
        } catch (error) {
            console.error('Error loading form responses:', error);
            alert('Error loading form responses');
        }
    };

    loadFormResponses();
});
