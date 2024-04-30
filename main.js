// Selecting DOM element
const gallery = document.getElementById('img-gallery');

// Function to preload images   
function preload(path) {
    // Map function that maps each img to a promise
    let promises = path.map(url => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            // Resolve promise if image loads
            img.onload = () => resolve(img);
            // Reject if image fails to load
            img.onerror = () => reject(new Error(`Error loading image ${url}`));
            img.src = url;
        });
    });
    // Return a promise that resolves when all images are loaded
    return Promise.all(promises)
}

// Image url paths
const imgPath = [
    './img/img-1.jpg',
    './img/img-2.jpg',
    './img/img-3.jpg',
    './img/img-4.jpg',
    './img/img-5.jpg',
    './img/img-6.jpg',
]


preload(imgPath)
    // If all images load successfully .then starts
    .then((images) => {
        // Foreach appends each img to the gallery HTML div
        images.forEach(image => {
            const element = document.createElement('img');
            element.src = image.src;
            gallery.appendChild(element);
        });
        console.log("All images loaded")
    })
    // If any or all images fail to load .catch starts
    .catch((error) =>{
        console.error("Error loading images:", error )
    })