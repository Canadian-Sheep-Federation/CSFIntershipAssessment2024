document.getElementById('sheep-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const sheepData = {
        sheepId: document.getElementById('sheep-id').value,
        healthStatus: document.getElementById('health-status').value,
        conditionDescription: document.getElementById('condition-description').value,
        feedType: document.getElementById('feed-type').value,
        feedQuantity: document.getElementById('feed-quantity').value,
        feedWeight: document.getElementById('feed-weight').value,
        feedDate: document.getElementById('feed-date').value,
    };

    try {
        const response = await fetch('http://localhost:5000/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(sheepData)
        });

        const data = await response.json();
        if (response.status !== 200) {
            throw new Error(data);
        }
        
        document.getElementById('error-message').textContent = ''; // Clear error message if successful
        console.log(data);

        // Fetch all records after the new one is added
        await fetchAndDisplayRecords();

    } catch (error) {
        document.getElementById('error-message').textContent = `The feed type ${sheepData['feedType']} is currently not supported. Please try another.`; //for the sake of simplicity, we know that the error is due to the api call and we can ask the user to provide a different feed type.
        console.error('Error:', error);
    }
});

async function fetchAndDisplayRecords() {
    try {
        const recordsResponse = await fetch('http://localhost:5000/');
        const records = await recordsResponse.json();
        console.log(records);

        // Clear existing records
        const healthRecordsElement = document.getElementById('health-records');
        healthRecordsElement.innerHTML = '';

        // Group records by sheep ID
        const groupedRecords = records.reduce((acc, record) => {
            acc[record.sheep_id] = acc[record.sheep_id] || { ...record, feed_logs: [] };
            acc[record.sheep_id].feed_logs.push(record);
            return acc;
        }, {});

        // Display grouped records
        Object.values(groupedRecords).forEach(sheep => {
            const sheepRecord = document.createElement('div');
            sheepRecord.className = "card mb-3";
            sheepRecord.style.cursor = "pointer";

            const sheepRecordBody = document.createElement('div');
            sheepRecordBody.className = "card-body d-flex align-items-center";

            const sheepImage = document.createElement('img');
            sheepImage.src = `../images/white-sheep.png`; // Default image is a white sheep
            sheepImage.className = "img-thumbnail mr-3";
            sheepImage.style.width = '50px';

            const sheepRecordTitle = document.createElement('b');
            sheepRecordTitle.textContent = `Sheep ID: ${sheep.sheep_id}`;
            sheepRecordTitle.style.width = '200px';
            sheepRecordTitle.className = "mr-3";

            const sheepColorToggle = document.createElement('select');
            sheepColorToggle.className = "custom-select";
            sheepColorToggle.innerHTML = `
                <option value="" disabled selected>Color</option>
                <option value="white-sheep">White</option>
                <option value="black-sheep">Black</option>
                <option value="brown-sheep">Brown</option>
                <option value="grey-sheep">Grey</option>
            `;
            sheepColorToggle.style.width = '100px';
            sheepColorToggle.addEventListener('change', function () {
                sheepImage.src = `../images/${sheepColorToggle.value}.png`;
                sheepImage.alt = `${sheepColorToggle.value}`;
            });

            sheepRecordBody.appendChild(sheepImage);
            sheepRecordBody.appendChild(sheepRecordTitle);
            sheepRecordBody.appendChild(sheepColorToggle);
            sheepRecord.appendChild(sheepRecordBody);

            sheepRecord.addEventListener('click', function () {
                const nutritionSection = document.getElementById('nutrition');
                nutritionSection.innerHTML = ''; // Clear previous logs

                sheep.feed_logs.forEach(log => {
                    const logEntry = document.createElement('div');
                    logEntry.className = "card mb-3";

                    const logBody = document.createElement('div');
                    logBody.className = "card-body d-flex";

                    const foodImage = document.createElement('img');
                    foodImage.src = log.food_photo;
                    foodImage.className = "img-thumbnail mr-3";
                    foodImage.draggable = false
                    foodImage.style.width = '500px';
                    foodImage.style.height = 'auto';

                    const logText = document.createElement('div');
                    logText.className = "card-text";
                    logText.innerHTML = `
                        <h5 class="card-title">Feed Date: ${log.feed_date}</h5>
                        <p><b>Sheep ID:</b> ${log.sheep_id}</p>
                        <p><b>Health Status:</b> ${log.health_status}</p>
                        <p><b>Condition Description:</b> ${log.condition_description}</p>
                        <p><b>Feed Type:</b> ${log.feed_type}</p>
                        <p><b>Feed Quantity:</b> ${log.feed_quantity} ${log.feed_weight}</p>
                        <p><b>Total Calories:</b> ${log.total_calories.toFixed(2)} kcal</p>
                        <p><b>Total Fat:</b> ${log.total_fat.toFixed(2)} g</p>
                        <p><b>Saturated Fat:</b> ${log.saturated_fat.toFixed(2)} g</p>
                        <p><b>Cholesterol:</b> ${log.cholesterol.toFixed(2)} mg</p>
                        <p><b>Sodium:</b> ${log.sodium.toFixed(2)} mg</p>
                        <p><b>Total Carbohydrate:</b> ${log.total_carbohydrate.toFixed(2)} g</p>
                        <p><b>Dietary Fiber:</b> ${log.dietary_fiber.toFixed(2)} g</p>
                        <p><b>Sugars:</b> ${log.sugars.toFixed(2)} g</p>
                        <p><b>Protein:</b> ${log.protein.toFixed(2)} g</p>
                        <p><b>Potassium:</b> ${log.potassium.toFixed(2)} mg</p>
                    `;
                
                

                    logBody.appendChild(foodImage);
                    logBody.appendChild(logText);
                    logEntry.appendChild(logBody);
                    nutritionSection.appendChild(logEntry);
                });
            });

            healthRecordsElement.appendChild(sheepRecord);
        });

        document.getElementById('nutrition').textContent = "Click on a sheep record to view details";

    } catch (error) {
        console.error('Error:', error);
    }
}

// Fetch and display records on page load
fetchAndDisplayRecords();
