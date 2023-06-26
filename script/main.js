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
    return 'circle';
  } else if (randomOption % 2 === 0) {
    return 'square';
  } else {
    return 'triangle';
  }
}

function compareOptions(playerOption, machineOption) {
  console.log(playerOption === machineOption ? "win!" : "try again");
}
