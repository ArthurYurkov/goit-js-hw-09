const startPicker = document.querySelector('[data-start]');
const stopPicker = document.querySelector('[data-stop]');

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

let intervalId = null;

startPicker.addEventListener('click', event => {
  intervalId = setInterval(event => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);

  startPicker.disabled = true;
});

stopPicker.addEventListener('click', event => {
  clearInterval(intervalId);
  startPicker.disabled = false;
});
