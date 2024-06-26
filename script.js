document.getElementById('add-spot-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const spotName = document.getElementById('spot-name').value;
    const spotReview = document.getElementById('spot-review').value;
    const spotRating = document.getElementById('spot-rating').value;

    const spot = {
        id: Date.now(),
        name: spotName,
        review: spotReview,
        rating: spotRating
    };

    addSpotToLocalStorage(spot);
    displaySpots();
    document.getElementById('add-spot-form').reset();
});

function addSpotToLocalStorage(spot) {
    let spots = localStorage.getItem('spots');
    if (spots) {
        spots = JSON.parse(spots);
    } else {
        spots = [];
    }
    spots.push(spot);
    localStorage.setItem('spots', JSON.stringify(spots));
}

function displaySpots() {
    const spotsContainer = document.getElementById('spots-container');
    spotsContainer.innerHTML = '';

    let spots = localStorage.getItem('spots');
    if (spots) {
        spots = JSON.parse(spots);
        spots.forEach(spot => {
            const spotElement = document.createElement('div');
            spotElement.innerHTML = `
                <h3>${spot.name}</h3>
                <p>${spot.review}</p>
                <p>Rating: ${spot.rating}</p>
                <button onclick="editSpot(${spot.id})">Edit</button>
                <button onclick="deleteSpot(${spot.id})">Delete</button>
            `;
            spotsContainer.appendChild(spotElement);
        });
    }
}

function editSpot(id) {
    let spots = JSON.parse(localStorage.getItem('spots'));
    const spot = spots.find(spot => spot.id === id);
    document.getElementById('spot-name').value = spot.name;
    document.getElementById('spot-review').value = spot.review;
    document.getElementById('spot-rating').value = spot.rating;

    deleteSpot(id);
}

function deleteSpot(id) {
    let spots = JSON.parse(localStorage.getItem('spots'));
    spots = spots.filter(spot => spot.id !== id);
    localStorage.setItem('spots', JSON.stringify(spots));
    displaySpots();
}

window.onload = displaySpots;

