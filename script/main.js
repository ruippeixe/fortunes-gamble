// bet option choice

const options = document.querySelectorAll(".options div");

options.forEach((option) => {
  option.addEventListener("click", handleChosenOption);
});

function handleChosenOption(e) {
  if (!checkBets()) {
    return;
  }
  const clickedElement = e.target;
  const chosenOption = clickedElement.className;
  const randomOption = chooseRandomOption();
  compareOptions(chosenOption, randomOption);
}

function chooseRandomOption() {
  const randomOption = Math.floor(Math.random() * 37);

  if (randomOption === 0) {
    return "circle";
  } else if (randomOption % 2 === 0) {
    return "square";
  } else {
    return "triangle";
  }
}

function compareOptions(playerOption, machineOption) {
  if (playerOption === machineOption && machineOption === "circle") {
    addExtraMoney();
  } else if (playerOption === machineOption) {
    addMoney();
  } else {
    subtractMoney();
  }
}

// input values

const userBetForm = document.querySelector("#userBetForm");

userBetForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let inputValue = document.querySelector("#userBetAmount");
  let userBetAmount = inputValue.value;

  if (
    !isNaN(userBetAmount) &&
    userBetAmount !== "" &&
    !userBetAmount.includes(" ")
  ) {
    betSize = parseInt(userBetAmount);
  } else {
    console.log("Invalid input! Please enter a numeric value.");
  }

  inputValue.value = "";
});

const oneHundred = document.querySelector("#oneHundred");
const fiveHundred = document.querySelector("#fiveHundred");

// choose the bet size

let betSize = "";

oneHundred.addEventListener("click", () => {
  betSize = 10;
});

fiveHundred.addEventListener("click", () => {
  betSize = 50;
});

// update total money after the bet

let currentMoney = 1000;

function addExtraMoney() {
  currentMoney += betSize * 37;
  console.log("mega win! ", currentMoney);
}

function addMoney() {
  currentMoney += betSize;
  console.log("win! ", currentMoney);
}

function subtractMoney() {
  currentMoney -= betSize;
  console.log("lose ", currentMoney);
}

// check if the bet amount was selected

function checkBets() {
  if (betSize === "") {
    alert("set bet value");
    return 0;
  } else return 1;
}
