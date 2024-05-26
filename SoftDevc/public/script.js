document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('weather-form');
    const formResponsesDiv = document.getElementById('form-responses');

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
                    <p>City: (HIMANSHU SINGH) ${entry.city}</p>
                    <p>Date (HIMANSHU SINGH) : ${entry.date}</p>
                    <p>Temperature (HIMANSHU SINGH): ${entry.temperature}°C</p>
                </div>
            `).join('');
        } catch (error) {
            console.error('Error loading form responses:', error);
            alert('Error loading form responses');
        }
    };

    loadFormResponses();
});
