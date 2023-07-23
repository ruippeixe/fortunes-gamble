// toggle the 'active' class for the buttons on click

const betBtns = document.querySelectorAll(".bet-btn");

betBtns.forEach((betBtn) => {
  betBtn.addEventListener("click", () => {
    betBtns.forEach((btn) => btn.classList.remove("active"));
    betBtn.classList.add("active");
    userBetAmount.classList.remove("active"); 
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
  userBetAmount.classList.add("active");
  betBtns.forEach((btn) => btn.classList.remove("active"));
});
