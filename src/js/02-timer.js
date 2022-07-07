import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const startBtnEl = document.querySelector('[data-start]');
const dateInputEl = document.querySelector('#datetime-picker');
const dataDaysEl = document.querySelector('[data-days]');
const dataHoursEl = document.querySelector('[data-hours]');
const dataMinutesEl = document.querySelector('[data-minutes]');
const dataSecondsEl = document.querySelector('[data-seconds]');

let targetDate = null;
let timerId = null;
let diffTime = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
      targetDate = selectedDates[0].getTime();
      if (targetDate < Date.now()) {
          Notiflix.Notify.failure('Please choose a date in the future');
      }
      else {
          startBtnEl.removeAttribute('disabled');
      }
  },
};

startBtnEl.setAttribute('disabled', true);
flatpickr(dateInputEl, options);
startBtnEl.addEventListener('click', onStartTime)

function onStartTime(event) {
    startBtnEl.setAttribute('disabled', true);
    timerId = setInterval(() => {
        diffTime = targetDate - Date.now();
        const diffDate = convertMs(diffTime);
        if (diffDate.seconds < 0) {
            clearInterval(timerId);
            return;
        }
        addTextContetnt(diffDate);
    }, 1000)
};

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
};

function addLeadingZero(value) {
    return String(value).padStart(2,'0');

};

function addTextContetnt({ days, hours, minutes, seconds }){
    dataDaysEl.textContent = addLeadingZero(days);
    dataHoursEl.textContent = addLeadingZero(hours);
    dataMinutesEl.textContent = addLeadingZero(minutes);
    dataSecondsEl.textContent = addLeadingZero(seconds);
};



