document.getElementById('add-spot-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const spotName = document.getElementById('spot-name').value;
    const spotReview = document.getElementById('spot-review').value;
    const spotRating = document.getElementById('spot-rating').value;

    const spot = {
        name: spotName,
        review: spotReview,
        rating: spotRating
    };

    addSpotToLocalStorage(spot);
    displaySpots();
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
            spotElement.innerHTML = `<h3>${spot.name}</h3><p>${spot.review}</p><p>Rating: ${spot.rating}</p>`;
            spotsContainer.appendChild(spotElement);
        });
    }
}

// New functions for handling the image gallery
function displayGallery() {
    const imageGalleryContainer = document.getElementById('image-gallery');
    imageGalleryContainer.innerHTML = '';

    const images = [
        'images/spot1.jpg',
        'images/spot2.jpg',
        'images/spot3.jpg'
    ];

    images.forEach(image => {
        const imgElement = document.createElement('img');
        imgElement.src = image;
        imageGalleryContainer.appendChild(imgElement);
    });
}

window.onload = function() {
    displaySpots();
    displayGallery();
};

