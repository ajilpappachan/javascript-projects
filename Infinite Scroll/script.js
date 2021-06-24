// Unsplash API
const count = 30;
const apiKey = unsplashAPIKey;
const query = "cat";
const apiURL = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}&query=${query}`;

const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let readyToLoad = false;
let imagesLoaded = 0;
let totalImages = 0;

// Get photos from unsplash api
const getPhotos = async () => {
	try {
		const respose = await fetch(apiURL);
		const photos = await respose.json();
		return photos;
	} catch (err) {
		console.log(err);
	}
};

const imageLoaded = () => {
	imagesLoaded++;
	if (imagesLoaded === totalImages) {
		readyToLoad = true;
		loader.hidden = true;
	}
};

//Create Elements and Add to DOM
const displayPhotos = async () => {
	const photos = await getPhotos();
	totalImages = photos.length;
	imagesLoaded = 0;
	photos.forEach((photo) => {
		const el = document.createElement("a");
		el.href = photo.links.html;
		el.target = "_blank";

		const img = document.createElement("img");
		img.src = photo.urls.regular;
		img.alt = photo.alt_description;
		img.title = photo.alt_description;
		img.addEventListener("load", imageLoaded);

		el.appendChild(img);
		imageContainer.appendChild(el);
	});
};

//Scrolling Event
window.addEventListener("scroll", () => {
	if (
		readyToLoad &&
		window.innerHeight + scrollY >= document.body.offsetHeight - 1000
	) {
		displayPhotos();
		readyToLoad = false;
	}
});

displayPhotos();
