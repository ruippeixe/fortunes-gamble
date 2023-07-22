// Toggle 'active' class for "bet-btn" and "option" buttons on click.

const betBtns = document.querySelectorAll(".bet-btn");

betBtns.forEach((betBtn) => {
  betBtn.addEventListener("click", () => {
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
