// toggle the 'active' class for the buttons on click

const betBtns = document.querySelectorAll(".bet-btn");

betBtns.forEach((betBtn) => {
  betBtn.addEventListener("click", () => {
    userBetAmount.classList.remove("active");
    betBtns.forEach((btn) => btn.classList.remove("active"));
    betBtn.classList.add("active");
  });
});

const betOptionsBtns = document.querySelectorAll(".option");

betOptionsBtns.forEach((optionBtn) => {
  optionBtn.addEventListener("click", () => {
    betOptionsBtns.forEach((btn) => btn.classList.remove("active"));
    optionBtn.classList.add("active");
  });
});

userBetAmount.addEventListener("click", () => {
  betBtns.forEach((btn) => btn.classList.remove("active"));
  userBetAmount.classList.add("active");
});

// wallet info

const wallet = document.querySelector(".wallet-info .total");

function updateWalletInfo() {
  wallet.textContent = formatNumberWithSpaces(totalMoney);
}

// info screen

function updateScreenInfo(symbol, resultType, betSizeResultValue) {
  const symbolImage = document.querySelector("#symbol");
  const actionScreen = document.querySelector(".action-screen");
  const screenValue = document.querySelector(".bet .value");
  const operator = document.querySelector(".bet .operator");
  const currency = document.querySelector(".bet .currency");

  symbolImage.src = `imgs/${symbol}.svg`;

  if (resultType === "winExtra" || resultType === "win") {
    actionScreen.classList.remove("lose");
    actionScreen.classList.add("win");
    operator.textContent = "+";
  } else if (resultType === "lose") {
    actionScreen.classList.remove("win");
    actionScreen.classList.add("lose");
    operator.textContent = "-";
  }
  screenValue.textContent = formatNumberWithSpaces(betSizeResultValue);
  currency.textContent = "€";
}

function toggleScreens(addActiveClass) {
  const waitingScreen = document.querySelector(".waiting-screen");
  const actionScreen = document.querySelector(".action-screen");
  const infoScreen = document.querySelector(".info-screen");

  waitingScreen.classList.add("active");
  actionScreen.classList.remove("active");

  if (addActiveClass) {
    waitingScreen.classList.remove("active");
    actionScreen.classList.add("active");
  }

  if (infoScreen) infoScreen.remove();
}

// create info element to show warnings

function createInfoMessageElement(text, className) {
  const screen = document.querySelector(".screen");

  const div = document.createElement("div");
  const p = document.createElement("p");

  div.classList.add("info-screen", className);
  p.classList.add("info");

  p.textContent = text;

  div.appendChild(p);
  screen.appendChild(div);
}

// show warning messages on the screen

function showWarningMessage(msg) {
  const waitingScreen = document.querySelector(".waiting-screen");
  const actionScreen = document.querySelector(".action-screen");

  const checkBetType = document.querySelector(".check-bet");
  const checkOptionType = document.querySelector(".check-option");
  const setBetType = document.querySelector(".set-bet");

  if (actionScreen.classList.contains("active"))
    actionScreen.classList.remove("active");

  if (msg === "setBetMsg") {
    if (checkOptionType) checkOptionType.remove();
    if (checkBetType) checkBetType.remove();

    if (!setBetType) {
      createInfoMessageElement("Invalid input! Please enter a numeric value.", "set-bet");
      waitingScreen.classList.remove("active");
    }
  }

  else if (msg === "checkBetMsg") {
    if (checkOptionType) checkOptionType.remove();

    if (!checkBetType && !setBetType) {
      createInfoMessageElement("set bet value", "check-bet");
      waitingScreen.classList.remove("active");
    }
  }

  else if (msg === "checkOptionMsg") {
    if (checkBetType) checkBetType.remove();
    if (setBetType) setBetType.remove();

    if (!checkOptionType) {
      createInfoMessageElement("choose an option", "check-option");
      waitingScreen.classList.remove("active");
    }
  }
}
