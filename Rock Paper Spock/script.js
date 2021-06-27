import { startConfetti, stopConfetti, removeConfetti } from "./confetti.js";

const playerScoreEl = document.getElementById("player-score");
const playerChoiceEl = document.getElementById("player-choice");
const computerScoreEl = document.getElementById("computer-score");
const computerChoiceEl = document.getElementById("computer-choice");
const resultText = document.getElementById("resultText");

const playerRock = document.getElementById("playerRock");
const playerPaper = document.getElementById("playerPaper");
const playerScissors = document.getElementById("playerScissors");
const playerLizard = document.getElementById("playerLizard");
const playerSpock = document.getElementById("playerSpock");
const computerRock = document.getElementById("computerRock");
const computerPaper = document.getElementById("computerPaper");
const computerScissors = document.getElementById("computerScissors");
const computerLizard = document.getElementById("computerLizard");
const computerSpock = document.getElementById("computerSpock");

const allGameIcons = document.querySelectorAll(".far");

const choices = {
	rock: { name: "Rock", defeats: ["scissors", "lizard"] },
	paper: { name: "Paper", defeats: ["rock", "spock"] },
	scissors: { name: "Scissors", defeats: ["paper", "lizard"] },
	lizard: { name: "Lizard", defeats: ["paper", "spock"] },
	spock: { name: "Spock", defeats: ["scissors", "rock"] },
};

let playerChoice = "";
let computerChoice = "";
let playerScore = 0;
let computerScore = 0;

function resetSelected() {
	allGameIcons.forEach((icon) => {
		icon.classList.remove("selected");
	});
	stopConfetti();
	removeConfetti();
}

function resetAll() {
	playerScore = 0;
	computerScore = 0;
	playerScoreEl.textContent = playerScore;
	computerScoreEl.textContent = computerScore;
	playerChoiceEl.textContent = "";
	computerChoiceEl.textContent = "";
	resultText.textContent = "";
	resetSelected();
}

function computerRandomChoice() {
	const computerChocieNumber = Math.floor(Math.random() * 5) + 1;
	switch (computerChocieNumber) {
		case 1:
			computerChoice = "rock";
			computerRock.classList.add("selected");
			computerChoiceEl.textContent = " --- Rock";
			break;
		case 2:
			computerChoice = "paper";
			computerPaper.classList.add("selected");
			computerChoiceEl.textContent = " --- Paper";
			break;
		case 3:
			computerChoice = "scissors";
			computerScissors.classList.add("selected");
			computerChoiceEl.textContent = " --- Scissors";
			break;
		case 4:
			computerChoice = "lizard";
			computerLizard.classList.add("selected");
			computerChoiceEl.textContent = " --- Lizard";
			break;
		case 5:
			computerChoice = "spock";
			computerSpock.classList.add("selected");
			computerChoiceEl.textContent = " --- Spock";
			break;
	}
}

function updateScore() {
	if (playerChoice === computerChoice) {
		resultText.textContent = "It's a tie.";
	} else {
		const choice = choices[playerChoice];
		if (choice.defeats.indexOf(computerChoice) > -1) {
			resultText.textContent = "You Won!";
			playerScore++;
			playerScoreEl.textContent = playerScore;
			startConfetti();
		} else {
			resultText.textContent = "You Lose!";
			computerScore++;
			computerScoreEl.textContent = computerScore;
		}
	}
}

function checkResult() {
	resetSelected();
	computerRandomChoice();
	updateScore();
}

function select(choice) {
	playerChoice = choice;
	checkResult();
	switch (choice) {
		case "rock":
			playerRock.classList.add("selected");
			playerChoiceEl.textContent = " --- Rock";
			break;
		case "paper":
			playerPaper.classList.add("selected");
			playerChoiceEl.textContent = " --- Paper";
			break;
		case "scissors":
			playerScissors.classList.add("selected");
			playerChoiceEl.textContent = " --- Scissors";
			break;
		case "lizard":
			playerLizard.classList.add("selected");
			playerChoiceEl.textContent = " --- Lizard";
			break;
		case "spock":
			playerSpock.classList.add("selected");
			playerChoiceEl.textContent = " --- Spock";
			break;
	}
}

window.select = select;
window.resetAll = resetAll;

resetAll();
