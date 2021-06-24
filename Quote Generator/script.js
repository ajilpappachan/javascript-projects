const apiURL = "https://api.quotable.io/random";
const twitterURL = "https://twitter.com/intent/tweet";

const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let quote = "";

const getQuote = async () => {
	try {
		const response = await fetch(apiURL);
		quote = await response.json();
		return quote;
	} catch (err) {
		console.log(err);
	}
};

const showLoading = (value) => {
	loader.hidden = !value;
	quoteContainer.hidden = value;
};

const fillQuote = async () => {
	showLoading(true);
	await getQuote();
	quoteText.textContent = quote.content;
	authorText.textContent = quote.author || "Unknown";
	if (quote.length > 50) quoteText.classList.add("long-quote");
	else quoteText.classList.remove("long-quote");
	showLoading(false);
};

const tweetQuote = () => {
	const url = `${twitterURL}?text="${quote.content}" - ${quote.author}`;
	window.open(url, "_blank");
};

newQuoteBtn.addEventListener("click", fillQuote);
twitterBtn.addEventListener("click", tweetQuote);

fillQuote();
