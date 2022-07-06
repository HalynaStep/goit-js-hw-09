

const startBtnEl = document.querySelector('[data-start]');
const stopBtnEl = document.querySelector('[data-stop]');
const bodyEl = document.querySelector("body")
let intervalId = null;

startBtnEl.addEventListener('click', onStart)
stopBtnEl.addEventListener('click', onStop);

function onStart(event) {
    startBtnEl.disabled = event.target;
    bodyEl.style.backgroundColor = getRandomHexColor();
    intervalId = setInterval(() => { bodyEl.style.backgroundColor = getRandomHexColor() }, 1000); 
};




function onStop(event) {
    startBtnEl.disabled = !event.target;
    clearInterval(intervalId);
}

 function getRandomHexColor() {
     return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
 }

 
