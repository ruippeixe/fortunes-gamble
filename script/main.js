// bet option choice

const options = document.querySelectorAll(".options div");

options.forEach((option) => {
  option.addEventListener("click", handleChosenOption);
});

function handleChosenOption(e) {
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
  console.log(playerOption === machineOption ? "win!" : "try again");
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
    console.log("Input value:", userBetAmount);
  } else {
    console.log("Invalid input! Please enter a numeric value.");
  }

  inputValue.value = "";
});

const oneHundred = document.querySelector("#oneHundred");
const fiveHundred = document.querySelector("#fiveHundred");

oneHundred.addEventListener("click", () => {
  console.log("Clicked on oneHundred element");
});

fiveHundred.addEventListener("click", () => {
  console.log("Clicked on fiveHundred element");
});
