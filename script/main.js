// bet option choice

const betOptions = { chosenOption: null, randomOption: null };

const options = document.querySelectorAll(".options div");

options.forEach((option) => {
  option.addEventListener("click", handleChosenOption);
});

function handleChosenOption(e) {
  const clickedElement = e.currentTarget;
  betOptions.chosenOption = clickedElement.id;
}

const gambleBtn = document.querySelector(".gamble-btn");

gambleBtn.addEventListener("click", gamble);

function gamble() {
  betOptions.randomOption = chooseRandomOption();

  if (!checkBet() || !checkOption()) {
    return;
  }
  if (isTotalMoneyEnough(totalMoney, betSize)) {
    compareOptions(betOptions.chosenOption, betOptions.randomOption);
  } else {
    console.log("sorry, you don't have enough money");
  }
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
    checkMinimumBetAmount(userBetAmount);
    betSize = parseInt(userBetAmount);
  } else {
    console.log("Invalid input! Please enter a numeric value.");
  }

  inputValue.value = "";
});

const smallBet = document.querySelector("#smallBet");
const bigBet = document.querySelector("#bigBet");

// choose the bet size

let betSize = "";

smallBet.addEventListener("click", () => {
  betSize = 10;
});

bigBet.addEventListener("click", () => {
  betSize = 50;
});

// update total money after the bet

let totalMoney = 50;

function addExtraMoney() {
  totalMoney += betSize * 37;
  console.log("mega win! ", totalMoney);
}

function addMoney() {
  totalMoney += betSize;
  console.log("win! ", totalMoney);
}

function subtractMoney() {
  totalMoney -= betSize;
  console.log("lose ", totalMoney);
}

// check if the bet amount was selected

function checkBet() {
  if (betSize === "") {
    alert("set bet value");
    return 0;
  } else return 1;
}

// check if the bet option was selected

function checkOption() {
  if (betOptions.chosenOption === null) {
    alert("choose an option");
    return 0;
  } else return 1;
}

// check if the total amount of money is enough to bet

function isTotalMoneyEnough(total, bet) {
  let result = total - bet;
  return result >= 0;
}

// minimum bet amount

function checkMinimumBetAmount(amount) {
  if (amount < 2) {
    console.log("Minimum bet amount not met!");
    return false;
  }
  return true;
}
