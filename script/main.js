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
  const randomIndex = Math.floor(Math.random() * options.length);
  const randomOption = options[randomIndex].className;
  return randomOption;
}

function compareOptions(playerOption, machineOption) {
  console.log(playerOption === machineOption ? "win!" : "try again");
}
