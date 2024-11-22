document.getElementById('search-btn').addEventListener('click', function() {
    searchImages();
});

// Add an event listener for the Enter key
document.getElementById('search-input').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        searchImages(); // Call the function to search for images
    }
});

function searchImages() {
    const query = document.getElementById('search-input').value;
    const accessKey = 'rFa3fsVJl-ZdUejoG1Okm4TyJV1P2Z6IbnLK_e8XC5c'; // Replace with your Unsplash API access key
    const url = `https://api.unsplash.com/search/photos?query=${query}&client_id=${accessKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const imageResults = document.getElementById('image-results');
            imageResults.innerHTML = ''; // Clear previous results

            if (data.results.length > 0) {
                data.results.forEach(image => {
                    const imgElement = document.createElement('img');
                    imgElement.src = image.urls.small; // Use small version of the image
                    imgElement.alt = image.alt_description || 'Image';
                    imageResults.appendChild(imgElement);
                });
            } else {
                imageResults.innerHTML = '<p>No images found.</p>';
            }
        })
        .catch(error => console.error('Error fetching images:', error));
}