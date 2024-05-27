/*
 * Uses Google Maps API to display and manage location on map
 * displays a list of locations from the server
 * Submit new locations from a form, which are then saved to the server and displayed
 * Search for specific locations and display the search results on the map.
 */


let map;
let markers = [];

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 43.65107, lng: -79.347015 }, // Center on Toronto, Canada
        zoom: 10
    });
    loadLocations();
}

function loadLocations() {
    fetch('/locations')
        .then(response => response.json())
        .then(data => {
            clearMarkers();
            data.forEach(location => {
                const marker = new google.maps.Marker({
                    position: { lat: 43.65107, lng: -79.347015 }, // Default position
                    map: map,
                    title: location.name
                });
                markers.push(marker);
            });
        })
        .catch(error => console.error('Error:', error));
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('location-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const description = document.getElementById('description').value;
        const category = document.getElementById('category').value;

        fetch('/locations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, description, category })
        })
        .then(response => response.json())
        .then(data => {
            alert('Location submitted with ID: ' + data.id);
            loadLocations();
        })
        .catch(error => console.error('Error:', error));
    });

    document.getElementById('search-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const query = document.getElementById('search').value;
        searchLocations(query);
    });

    loadLocations();
});

function searchLocations(query) {
    const url = `/search?query=${query}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log("Search data:", data); // Debugging
            clearMarkers();
            if (data.length) {
                let results = '';
                data.forEach(location => {
                    results += `Name: ${location.name}, Description: ${location.description}, Category: ${location.category}\n`;
                    const marker = new google.maps.Marker({
                        position: { lat: 43.65107, lng: -79.347015 }, // Default position
                        map: map,
                        title: location.name
                    });
                    markers.push(marker);
                });
                alert('Search results:\n' + results);
            } else {
                alert('No locations found');
            }
        })
        .catch(error => console.error('Error:', error));
}

function clearMarkers() {
    markers.forEach(marker => marker.setMap(null));
    markers = [];
}
