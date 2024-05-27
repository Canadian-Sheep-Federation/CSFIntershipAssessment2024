
document.getElementById('form').addEventListener('submit', async function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const activity = document.getElementById('activity').value;
    const location = document.getElementById('location').value;

    const response = await fetch('/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, activity, location })
    });

    if (response.ok) {
        const responseData = await response.json();
        alert(`Form submitted successfully. ID: ${responseData.id}`);
        document.getElementById('form').reset();
    } else {
        alert('Failed to submit form');
    }
});

document.getElementById('loadSubmissions').addEventListener('click', async function() {
    try {
        const response = await fetch('/submissions');
        if (!response.ok) {
            throw new Error('Failed to load submissions');
        }
        const submissions = await response.json();

        const submissionsList = document.getElementById('submissions');
        submissionsList.innerHTML = '';

        submissions.forEach(submission => {
            const li = document.createElement('li');
            li.innerHTML = `
                <strong>ID:</strong> ${submission.id}<br>
                <strong>Name:</strong> ${submission.name}<br>
                <strong>Activity:</strong> ${submission.activity}<br>
                <strong>Location:</strong> ${submission.location}<br>
                <strong>Weather:</strong> ${submission.weather ? JSON.parse(submission.weather).temperature + '°C, ' + JSON.parse(submission.weather).weather_descriptions[0] : 'N/A'}
            `;
            submissionsList.appendChild(li);
        });
    } catch (error) {
        console.error('Error loading submissions:', error.message);
        alert('Failed to load submissions. Please try again later.');
    }
});

document.getElementById('loadSubmissionById').addEventListener('click', async function() {
    const id = document.getElementById('submissionId').value;

    if (!id) {
        alert('Please enter a submission ID');
        return;
    }

    const response = await fetch(`/submission/${id}`);
    if (response.ok) {
        const submission = await response.json();
        const submissionDetails = document.getElementById('submissionDetails');
        submissionDetails.innerHTML = `
            <strong>ID:</strong> ${submission.id}<br>
            <strong>Name:</strong> ${submission.name}<br>
            <strong>Activity:</strong> ${submission.activity}<br>
            <strong>Location:</strong> ${submission.location}<br>
            <strong>Weather:</strong> ${submission.weather ? JSON.parse(submission.weather).temperature + '°C, ' + JSON.parse(submission.weather).weather_descriptions[0] : 'N/A'}
        `;
    } else {
        alert('Failed to load submission. Please check the ID and try again.');
    }
});



