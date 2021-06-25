const menuBars = document.getElementById("menu-bars");
const overlay = document.getElementById("overlay");
const navEls = document.querySelectorAll("#nav li");

const toggleNavSlideClasses = (remove, add) => {
	navEls.forEach((nav, index) => {
		nav.classList.remove(remove);
		nav.classList.add(add);
		if (add === "slide-in") {
			nav.style.animationDelay = `${(index + 1) * 0.2}s`;
		} else {
			nav.style.animationDelay = `${(navEls.length - index) * 0.1}s`;
		}
	});
};

const toggleNav = () => {
	menuBars.classList.toggle("change");
	overlay.classList.toggle("active");
	if (overlay.classList.contains("active")) {
		toggleNavSlideClasses("slide-out", "slide-in");
	} else {
		toggleNavSlideClasses("slide-in", "slide-out");
	}
};

menuBars.addEventListener("click", toggleNav);
navEls.forEach((nav) => {
	nav.addEventListener("click", toggleNav);
});
