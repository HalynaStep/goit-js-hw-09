import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const startBtnEl = document.querySelector('[data-start]');
const dateInputEl = document.querySelector('#datetime-picker');
let dataDaysEl = document.querySelector('[data-days]');
let dataHoursEl = document.querySelector('[data-hours]');
let dataMinutesEl = document.querySelector('[data-minutes]');
let dataSecondsEl = document.querySelector('[data-seconds]');

let targetDates = null;
let timerId = null;
let diff = null;


const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      if (selectedDates[0] < Date.now()) {
          Notiflix.Notify.failure('Please choose a date in the future');
      }
      else {
          targetDates = selectedDates[0];
          startBtnEl.style.disebled=true;
      }
  },
};

startBtnEl.style.disebled=false;
flatpickr(dateInputEl, {options});
startBtnEl.addEventListener('click', onStartTime)

function onStartTime(event) {      
event.preventDefault();
   timerId = setInterval (() =>{
   diff = targetDates - Date.now();
        if(diff<0) {
            clearInterval(timerId);
            return;
        }
    addTextContetnt(diff);
        
    },1000) 
}

function addLeadingZero(value) {
    return String(value).padStart(2,'0');

}

function addTextContetnt(diff){
    dataDaysEl.textContent = addLeadingZero(convertMs(diff).days);
    dataHoursEl.textContent = addLeadingZero(convertMs(diff).hours);
    dataMinutesEl.textContent = addLeadingZero(convertMs(diff).minutes);
    dataSecondsEl.textContent = addLeadingZero(convertMs(diff).seconds);
}


function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
