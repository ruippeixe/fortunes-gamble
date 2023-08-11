const MIN_BET = 2;
const EXTRA_MULTIPLIER = 37;

const betOptions = { chosenOption: null, randomOption: null };

// bet option choices and comparisons

const options = document.querySelectorAll(".options div");

options.forEach((option) => {
  option.addEventListener("click", handleChosenOption);
});

function handleChosenOption(e) {
  const clickedElement = e.currentTarget;
  betOptions.chosenOption = clickedElement.id;
}

function chooseRandomOption() {
  const randomOption = Math.floor(Math.random() * EXTRA_MULTIPLIER);

  if (randomOption === 0) {
    return "circle";
  } else if (randomOption % 2 === 0) {
    return "square";
  } else {
    return "triangle";
  }
}

function compareOptions(playerOption, machineOption) {
  let resultType;
  let betSizeResultValue;

  if (playerOption === machineOption && machineOption === "circle") {
    addExtraMoney();
    resultType = "winExtra";
    betSizeResultValue = betSize * EXTRA_MULTIPLIER;
  } else if (playerOption === machineOption) {
    addMoney();
    resultType = "win";
    betSizeResultValue = betSize;
  } else {
    subtractMoney();
    resultType = "lose";
    betSizeResultValue = betSize;
  }
  updateScreenInfo(machineOption, resultType, betSizeResultValue);
}

// gamble button

const gambleBtn = document.querySelector(".gamble-btn");

gambleBtn.addEventListener("click", () => {
  betOptions.randomOption = chooseRandomOption();

  if (!isMinimumBetAmount) {
    return showWarningMessage("minimumBetAmount");
  } else if (!isBetAmountValidInput) {
    return showWarningMessage("betAmountInput");
  } else if (!checkBet()) {
    return showWarningMessage("setBetValue");
  } else if (!checkOption()) {
    return showWarningMessage("checkOption");
  } else if (isTotalMoneyEnough(totalMoney, betSize)) {
    compareOptions(betOptions.chosenOption, betOptions.randomOption);
  } else {
    return showWarningMessage("notEnoughMoney");
  }
  toggleScreens(true);
});

// input values

const userBetForm = document.querySelector("#userBetForm");
const userBetAmount = document.querySelector("#userBetAmount");

userBetAmount.addEventListener("click", () => {
  betSize = "";
});

userBetAmount.addEventListener("blur", () => {
  isBetAmountValidInput = true;
  isMinimumBetAmount = true;
  verifyBetAmount(userBetAmount.value);
});

userBetForm.addEventListener("submit", (e) => {
  e.preventDefault();
  verifyBetAmount(userBetAmount.value);
});

let isBetAmountValidInput = true;

function verifyBetAmount(userBetAmount) {
  if (
    !isNaN(userBetAmount) &&
    userBetAmount !== "" &&
    !userBetAmount.includes(" ") &&
    checkMinimumBetAmount(userBetAmount)
  ) {
    betSize = parseInt(userBetAmount);
    isBetAmountValidInput = true;
  } else {
    betSize = "";
    isBetAmountValidInput = false;
  }
}

// choose the bet size

const smallBet = document.querySelector("#smallBet");
const bigBet = document.querySelector("#bigBet");

let betSize = "";

smallBet.addEventListener("click", () => setBetSize(10));
bigBet.addEventListener("click", () => setBetSize(50));

function setBetSize(size) {
  userBetAmount.value = "";
  userBetAmount.classList.remove("active");
  betSize = size;
  isBetAmountValidInput = true;
  isMinimumBetAmount = true;
}

// update total money after the bet

let totalMoney = 500;

function addExtraMoney() {
  let result = betSize * EXTRA_MULTIPLIER;
  totalMoney += result;
  updateWalletInfo();
  console.log("mega win! ", totalMoney);
}

function addMoney() {
  let result = betSize;
  totalMoney += result;
  updateWalletInfo();
  console.log("win! ", totalMoney);
}

function subtractMoney() {
  let result = betSize;
  totalMoney -= result;
  updateWalletInfo();
  console.log("lose ", totalMoney);
}

// check if the bet amount was selected

function checkBet() {
  if (betSize === "") {
    return 0;
  } else {
    return 1;
  }
}

// check if the bet option was selected

function checkOption() {
  if (betOptions.chosenOption === null) {
    return 0;
  } else {
    return 1;
  }
}

// check if the total amount of money is enough to bet

function isTotalMoneyEnough(total, bet) {
  let result = total - bet;
  return result >= 0;
}

// minimum bet amount

let isMinimumBetAmount = true;

function checkMinimumBetAmount(amount) {
  if (amount < MIN_BET) {
    isMinimumBetAmount = false;
    return false;
  } else {
    isMinimumBetAmount = true;
    return true;
  }
}

// reset button

const gameReset = document.querySelector(".game-reset");

gameReset.addEventListener("click", () => {
  totalMoney = 500;
  updateWalletInfo();

  betBtns.forEach((betBtn) => {
    betBtn.classList.remove("active");
  });

  options.forEach((option) => {
    option.classList.remove("active");
  });

  toggleScreens(false);

  betOptions.chosenOption = null;
  betOptions.randomOption = null;

  userBetAmount.value = "";
  userBetAmount.classList.remove("active");

  betSize = "";

  isBetAmountValidInput = true;
  isMinimumBetAmount = true;
});
