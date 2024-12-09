// Playoff passing yards for 2023
const yardsData = {
  mahomes: 850, // Replace with actual data
  burrow: 600, // Replace with actual data
  jackson: 450, // Replace with actual data
};

// Map yards to a distance in pixels (adjust the multiplier as needed)
const yardToPixels = (yards) => yards * 0.1;

// Add event listeners to each QB's picture
document
  .getElementById("mahomes")
  .addEventListener("click", () => moveFootball("mahomes"));
document
  .getElementById("burrow")
  .addEventListener("click", () => moveFootball("burrow"));
document
  .getElementById("jackson")
  .addEventListener("click", () => moveFootball("jackson"));

function moveFootball(qbId) {
  const football = document.querySelector(`#${qbId} .football`);
  const yards = yardsData[qbId];
  const distance = yardToPixels(yards);

  // Move the football to the right
  football.style.transform = `translateX(${distance}px)`;
}
