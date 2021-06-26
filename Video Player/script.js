const player = document.querySelector(".player");
const video = document.querySelector("video");
const progressRange = document.querySelector(".progress-range");
const progressBar = document.querySelector(".progress-bar");
const playBtn = document.getElementById("play-btn");
const volumeIcon = document.getElementById("volume-icon");
const volumeRange = document.querySelector(".volume-range");
const volumeBar = document.querySelector(".volume-bar");
const currentTime = document.querySelector(".time-elapsed");
const duration = document.querySelector(".time-duration");
const speed = document.querySelector(".player-speed");
const fullscreenBtn = document.querySelector(".fullscreen");

function showPlayIcon(value) {
	if (value) {
		playBtn.classList.replace("fa-pause", "fa-play");
		playBtn.title = "Play";
	} else {
		playBtn.classList.replace("fa-play", "fa-pause");
		playBtn.title = "Pause";
	}
}

// Play & Pause ----------------------------------- //
function togglePlay() {
	video.paused ? video.play() : video.pause();
	showPlayIcon(video.paused);
}

// Progress Bar ---------------------------------- //
function displayTime(time) {
	const minutes = `0${Math.floor(time / 60)}`.slice(-2);
	const seconds = `0${Math.floor(time % 60)}`.slice(-2);
	return `${minutes}:${seconds}`;
}

function updateProgress() {
	progressBar.style.width = `${(video.currentTime / video.duration) * 100}%`;
	currentTime.textContent = `${displayTime(video.currentTime)} / `;
	duration.textContent = `${displayTime(video.duration)}`;
}

function setProgress(event) {
	const newTime = event.offsetX / progressRange.offsetWidth;
	progressBar.style.width = `${newTime * 100}%`;
	video.currentTime = newTime * video.duration;
	if (video.paused) togglePlay();
}

// Volume Controls --------------------------- //
let lastVolume = 1;

function updateVolumeIcon(volume) {
	iconClass = "";
	if (volume >= 0.7) iconClass = "fa-volume-up";
	else if (volume < 0.7 && volume > 0) iconClass = "fa-volume-down";
	else if (volume === 0) iconClass = "fa-volume-off";
	volumeIcon.className = `fas ${iconClass}`;
}

function changeVolume(event) {
	let volume = event.offsetX / volumeRange.offsetWidth;
	if (volume < 0.1) volume = 0;
	if (volume > 0.9) volume = 1;
	volumeBar.style.width = `${volume * 100}%`;
	video.volume = volume;
	lastVolume = volume;
	updateVolumeIcon(volume);
}

function toggleMute() {
	if (video.volume) {
		lastVolume = video.volume;
		video.volume = 0;
		volumeBar.style.width = 0;
		volumeIcon.className = "fas fa-volume-mute";
	} else {
		video.volume = lastVolume;
		volumeBar.style.width = `${lastVolume * 100}%`;
		updateVolumeIcon(lastVolume);
	}
}

// Change Playback Speed -------------------- //
function changeSpeed() {
	video.playbackRate = speed.value;
}

// Fullscreen ------------------------------- //
/* View in fullscreen */
function openFullscreen(elem) {
	if (elem.requestFullscreen) {
		elem.requestFullscreen();
	} else if (elem.webkitRequestFullscreen) {
		/* Safari */
		elem.webkitRequestFullscreen();
	} else if (elem.msRequestFullscreen) {
		/* IE11 */
		elem.msRequestFullscreen();
	}
}

/* Close fullscreen */
function closeFullscreen() {
	if (document.exitFullscreen) {
		document.exitFullscreen();
	} else if (document.webkitExitFullscreen) {
		/* Safari */
		document.webkitExitFullscreen();
	} else if (document.msExitFullscreen) {
		/* IE11 */
		document.msExitFullscreen();
	}
}

let fullscreen = false;

function toggleFullscreen() {
	if (!fullscreen) {
		openFullscreen(player);
		video.classList.add("video-fullscreen");
	} else {
		closeFullscreen();
		video.classList.remove("video-fullscreen");
	}
	fullscreen = !fullscreen;
}

// Event Listeners
playBtn.addEventListener("click", togglePlay);
video.addEventListener("click", () => togglePlay());
video.addEventListener("ended", () => showPlayIcon(true));
video.addEventListener("timeupdate", updateProgress);
video.addEventListener("canplay", updateProgress);
progressRange.addEventListener("click", setProgress);
volumeRange.addEventListener("click", changeVolume);
volumeIcon.addEventListener("click", toggleMute);
speed.addEventListener("change", changeSpeed);
fullscreenBtn.addEventListener("click", toggleFullscreen);
