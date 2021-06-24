const videoElement = document.getElementById("video");
const button = document.getElementById("button");

// Select Media Stream and Play
async function selectMediaStream() {
	try {
		const mediaStream = await navigator.mediaDevices.getDisplayMedia();
		videoElement.srcObject = mediaStream;
		videoElement.onloadedmetadata = () => {
			videoElement.play();
			videoElement.requestPictureInPicture();
		};
	} catch (err) {
		console.log(err);
	}
}

button.addEventListener("click", async () => {
	button.disabled = true;
	await selectMediaStream();
	button.disabled = false;
});
