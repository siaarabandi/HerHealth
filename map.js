// map.js

// Replace 'YOUR_GOOGLE_PLACES_API_KEY' with your actual API key, keeping in mind this is for testing purposes only.
const API_KEY = 'AIzaSyCFUBz7iN0FZn6iGrLGUHbjGgy2YKj6o1Q';

// Initialize the map and set a default location
const map = L.map('map').setView([37.7749, -122.4194], 12); // Default location: San Francisco

// Add OpenStreetMap tiles to the map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Function to initialize map with user location and fetch nearby resources
function initializeMap() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                const userLat = position.coords.latitude;
                const userLng = position.coords.longitude;

                // Set map view to user's current location
                map.setView([userLat, userLng], 13);

                // Fetch nearby resources using user location
                fetchNearbyResources(userLat, userLng);
            },
            error => {
                console.error('Error getting location:', error);
                // Fallback to default location if user denies geolocation
                fetchNearbyResources(37.7749, -122.4194);
            }
        );
    } else {
        // Fallback to default location if geolocation is not available
        fetchNearbyResources(37.7749, -122.4194);
    }
}

// Function to fetch nearby resources from Google Places API
function fetchNearbyResources(lat, lng) {
    const radius = 5000; // Search radius in meters
    const keywords = ['shelter', 'nonprofit', 'donation center', 'period', 'menstrual'];
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&type=point_of_interest&keyword=${keywords.join('|')}&key=${API_KEY}`;

    // Fetch data from Google Places API
    /*fetch(url)
        .then(response => response.json())
        .then(data => {
            // Loop through results and place markers on the map
            if (data.results) {
                data.results.forEach(place => {
                    const placeLat = place.geometry.location.lat;
                    const placeLng = place.geometry.location.lng;
                    const placeName = place.name;

                    // Create a marker for each place and add it to the map
                    L.marker([placeLat, placeLng])
                        .addTo(map)
                        .bindPopup(`<b>${placeName}</b><br>${place.vicinity || 'Address not available'}`);
                });
            } else {
                console.error('No results found:', data);
            }
        })
        .catch(error => console.error('Error fetching data:', error));*/

        fetch(`/api/places?lat=${lat}&lng=${lng}`)
            .then(response => response.json())
            .then(data => {
                    // Process and add markers to the map as before
            })
            .catch(error => console.error('Error fetching data:', error));
}

// Initialize map and resource fetch on page load
initializeMap();
