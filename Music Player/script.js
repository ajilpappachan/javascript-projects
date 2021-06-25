const image = document.querySelector("img");
const title = document.getElementById("title");
const artist = document.getElementById("artist");

const music = document.querySelector("audio");
const progressContainer = document.getElementById("progress-container");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");

const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");

let currentSongIndex = Math.floor(Math.random() * songs.length);

const togglePlay = () => {
	if (music.paused) {
		music.play();
		playBtn.classList.replace("fa-play", "fa-pause");
		playBtn.title = "Pause";
	} else {
		music.pause();
		playBtn.classList.replace("fa-pause", "fa-play");
		playBtn.title = "Play";
	}
};

const loadSong = (song) => {
	title.textContent = song.displayName;
	artist.textContent = song.artist;
	music.src = `music/${song.name}.mp3`;
	image.src = `img/${song.name}.jpg`;
};

const prevSong = () => {
	currentSongIndex--;
	if (currentSongIndex < 0) currentSongIndex = songs.length - 1;
	loadSong(songs[currentSongIndex]);
	togglePlay();
};

const nextSong = () => {
	currentSongIndex++;
	if (currentSongIndex > songs.length - 1) currentSongIndex = 0;
	loadSong(songs[currentSongIndex]);
	togglePlay();
};

const timeDataString = (time) => {
	minutes = Math.floor(time / 60);
	seconds = `0${Math.floor(time % 60)}`.slice(-2);
	return `${minutes}:${seconds}`;
};

const updateProgress = () => {
	const { duration, currentTime } = music;
	const progressPercent = (currentTime / duration) * 100;
	progress.style.width = `${progressPercent}%`;
	currentTimeEl.textContent = timeDataString(currentTime);
};

const setProgresBar = (event) => {
	const width = progressContainer.clientWidth;
	const clickX = event.offsetX;
	console.log(width, clickX);
	console.log((clickX / width) * music.duration);
	music.currentTime = (clickX / width) * music.duration;
	updateProgress();
};

playBtn.addEventListener("click", togglePlay);
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);

music.addEventListener("timeupdate", updateProgress);
music.addEventListener("loadedmetadata", () => {
	durationEl.textContent = timeDataString(music.duration);
});
music.addEventListener("ended", nextSong);

progressContainer.addEventListener("click", setProgresBar);

loadSong(songs[currentSongIndex]);
