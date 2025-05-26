function initMap() {
    const mapElement = document.getElementById('map');
    if (!mapElement) return;

    // Default center location (replace with your preferred location)
    const center = { lat: 19.0760, lng: 72.8777 }; // Mumbai coordinates

    const map = new google.maps.Map(mapElement, {
        zoom: 12,
        center: center,
        styles: [
            {
                "featureType": "all",
                "elementType": "geometry",
                "stylers": [{ "color": "#f5f5f5" }]
            },
            {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [{ "color": "#e9e9e9" }]
            }
        ]
    });

    // Sample pandits locations (replace with actual data from backend)
    const panditLocations = [
        {
            position: { lat: 19.0760, lng: 72.8777 },
            title: "Pandit Sharma",
            type: "Wedding Specialist"
        },
        {
            position: { lat: 19.0820, lng: 72.8410 },
            title: "Pandit Patel",
            type: "House Warming Expert"
        }
    ];

    // Add markers for each pandit
    panditLocations.forEach(location => {
        const marker = new google.maps.Marker({
            position: location.position,
            map: map,
            title: location.title
        });

        const infoWindow = new google.maps.InfoWindow({
            content: `
                <div class="pandit-info">
                    <h3>${location.title}</h3>
                    <p>${location.type}</p>
                    <button onclick="bookPandit('${location.title}')">Book Now</button>
                </div>
            `
        });

        marker.addListener('click', () => {
            infoWindow.open(map, marker);
        });
    });
}

function bookPandit(panditName) {
    // Handle booking action
    window.location.href = `booking.html?pandit=${encodeURIComponent(panditName)}`;
}

// Load Google Maps API
function loadGoogleMapsAPI() {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
}

// Initialize map when DOM is loaded
document.addEventListener('DOMContentLoaded', loadGoogleMapsAPI); 
