const toggleSwitch = document.querySelector("input[type='checkbox']");
const nav = document.getElementById("nav");
const toggleIcon = document.getElementById("toggle-icon");
const image1 = document.getElementById("image1");
const image2 = document.getElementById("image2");
const image3 = document.getElementById("image3");
const textBox = document.getElementById("text-box");

const imageMode = (color) => {
	image1.src = `img/undraw_proud_coder_${color}.svg`;
	image2.src = `img/undraw_feeling_proud_${color}.svg`;
	image3.src = `img/undraw_conceptual_idea_${color}.svg`;
};

const toggleDarkLightMode = (isDark) => {
	localStorage.setItem("theme", isDark ? "dark" : "light");
	nav.style.backgroundColor = isDark
		? "rgb(0 0 0 / 50%)"
		: "rgb(255 255 255 / 50%)";
	textBox.style.backgroundColor = isDark
		? "rgb(255 255 255 / 50%)"
		: "rgb(0 0 0 / 50%)";
	toggleIcon.children[0].textContent = isDark ? "Dark Mode" : "Light Mode";
	isDark
		? toggleIcon.children[1].classList.replace("fa-sun", "fa-moon")
		: toggleIcon.children[1].classList.replace("fa-moon", "fa-sun");
	imageMode(isDark ? "dark" : "light");
};

const switchTheme = (event) => {
	document.documentElement.setAttribute(
		"data-theme",
		`${event.target.checked ? "dark" : "light"}`
	);
	if (event.target.checked) toggleDarkLightMode(true);
	else toggleDarkLightMode(false);
};

toggleSwitch.addEventListener("change", switchTheme);

const currentTheme = localStorage.getItem("theme");
if (currentTheme) {
	document.documentElement.setAttribute("data-theme", currentTheme);
	if (currentTheme === "dark") {
		toggleSwitch.checked = true;
		toggleDarkLightMode(true);
	}
}
