const form = document.getElementById("form");
const password1El = document.getElementById("password1");
const password2El = document.getElementById("password2");
const messageContainer = document.querySelector(".message-container");
const message = document.getElementById("message");

function validateForm() {
	if (!form.checkValidity()) {
		message.textContent = "Please fill out all fields";
		message.style.color = "red";
		messageContainer.style.borderColor = "red";
		return false;
	}
	if (password1El.value === password2El.value) {
		password1El.style.borderColor = "green";
		password2El.style.borderColor = "green";
	} else {
		password1El.style.borderColor = "red";
		password2El.style.borderColor = "red";
		message.textContent = "Make sure passwords match";
		message.style.color = "red";
		messageContainer.style.borderColor = "red";
		return false;
	}
	message.textContent = "Successfully Registered!";
	message.style.color = "green";
	messageContainer.style.borderColor = "green";
	return true;
}

function storeFormData() {
	const user = {
		name: form.name.value,
		phone: form.phone.value,
		email: form.email.value,
		website: form.name.value,
		password: form.name.value,
	};
	console.log(user);
}

function processFormData(event) {
	event.preventDefault();
	if (validateForm()) storeFormData();
}

form.addEventListener("submit", processFormData);
