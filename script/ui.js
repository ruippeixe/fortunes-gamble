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

function createInfoMessageElement(text) {
  const screen = document.querySelector(".screen");

  const div = document.createElement("div");
  const p = document.createElement("p");

  div.classList.add("info-screen");
  p.classList.add("info");

  p.textContent = text;

  div.appendChild(p);
  screen.appendChild(div);
}

// show warning messages on the screen

let checkBetMessage = false;
let checkOptionMessage = false;

function updateScreenWithWarningMessage(option) {
  const waitingScreen = document.querySelector(".waiting-screen");
  const infoScreen = document.querySelector(".info-screen");

  if (option == "isCheckBet") {
    if (!checkBetMessage) {
      createInfoMessageElement("set bet value");
      checkBetMessage = true;
      waitingScreen.classList.remove("active");
    }
  }

  if (option == "isCheckOption") {
    if (checkBetMessage && !checkOptionMessage) infoScreen.remove();

    if (!checkOptionMessage) {
      createInfoMessageElement("choose an option");
      checkOptionMessage = true;
      waitingScreen.classList.remove("active");
    }
  }
}
