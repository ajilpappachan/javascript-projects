const modal = document.getElementById("modal");
const modalShow = document.getElementById("show-modal");
const modalClose = document.getElementById("close-modal");
const bookmarkForm = document.getElementById("bookmark-form");
const websiteNameEl = document.getElementById("website-name");
const websiteUrlEl = document.getElementById("website-url");
const bookmarksContainer = document.getElementById("bookmarks-container");

let bookmarks = [];

const showModal = () => {
	modal.classList.add("show-modal");
	websiteNameEl.focus();
};

const closeModal = () => {
	modal.classList.remove("show-modal");
};

const validateForm = (name, url) => {
	const urlExpression =
		/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
	if (!name || !url) {
		alert("Please enter values for both fields");
		return false;
	}
	if (!url.match(urlExpression)) {
		alert("Please enter valid url");
		return false;
	}
	return true;
};

const deleteBookmark = (url) => {
	bookmarks.forEach((bookmark, index) => {
		if (bookmark.url === url) {
			bookmarks.splice(index, 1);
		}
	});
	localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
	fetchBookmarks();
};

const buildBookmarks = () => {
	bookmarksContainer.innerHTML = "";
	bookmarks.forEach((bookmark) => {
		const { name, url } = bookmark;
		const itemEl = document.createElement("div");
		itemEl.classList.add("item");
		itemEl.innerHTML = `
        <i
            class="fas fa-times"
            title="Delete Bookmark"
            onclick="deleteBookmark('${url}')"
        ></i>
        <div class="name">
            <img
                src="https://s2.googleusercontent.com/s2/favicons?domain=${url}"
                alt="Favicon"
            />
            <a href="${url}" target="_blank"
                >${name}</a>
        </div>`;
		bookmarksContainer.append(itemEl);
	});
};

const fetchBookmarks = () => {
	if (localStorage.getItem("bookmarks")) {
		bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
		buildBookmarks();
	} else {
		bookmarks = [];
		localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
	}
};

const storeBookmark = (event) => {
	event.preventDefault();
	const nameValue = websiteNameEl.value;
	let urlValue = websiteUrlEl.value;
	if (!urlValue.includes("http://", "https://")) {
		urlValue = `https://${urlValue}`;
	}
	if (!validateForm(nameValue, urlValue)) return;
	const bookmark = {
		name: nameValue,
		url: urlValue,
	};
	bookmarks.push(bookmark);
	localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
	fetchBookmarks();
	bookmarkForm.reset();
	websiteNameEl.focus();
};

modalShow.addEventListener("click", showModal);
modalClose.addEventListener("click", closeModal);
window.addEventListener("click", (event) => {
	event.target === modal && modal.classList.remove("show-modal");
});
bookmarkForm.addEventListener("submit", storeBookmark);

fetchBookmarks();
