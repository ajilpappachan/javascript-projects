const button = document.getElementById("button");
const audioElement = document.getElementById("audio");

// Get joke from API

const jokeAPI = "https://v2.jokeapi.dev/joke/Any";

const getJoke = async () => {
	try {
		const response = await fetch(jokeAPI);
		const data = await response.json();
		const joke = data.joke || `${data.setup} ... ${data.delivery}`;
		return joke;
	} catch (err) {
		console.log(err);
	}
};

// Speak Joke

const speakJoke = (joke) => {
	VoiceRSS.speech({
		key: voiceRSSKey,
		src: joke,
		hl: "en-us",
		r: 1,
		c: "mp3",
		f: "44khz_16bit_stereo",
		ssml: false,
	});
};

const tellMeAJoke = async () => {
	button.disabled = true;
	const joke = await getJoke();
	speakJoke(joke);
	button.textContent = joke;
};

button.addEventListener("click", tellMeAJoke);
audio.addEventListener("ended", () => {
	button.disabled = false;
	button.textContent = "Tell Me A Joke";
});
