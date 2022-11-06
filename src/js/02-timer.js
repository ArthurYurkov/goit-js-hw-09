'use strict';
import Notiflix from 'notiflix';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const datePick = document.querySelector('#datetime-picker');
const dateDays = document.querySelector('[data-days]');
const dateHours = document.querySelector('[data-hours]');
const dateMinutes = document.querySelector('[data-minutes]');
const dateSeconds = document.querySelector('[data-seconds]');
const startBtn = document.querySelector('button[data-start]');

let intervalId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    if (selectedDates[0] < Date.now()) {
      startBtn.disabled = true;
      Notiflix.Notify.failure(
        'You can not choose dates in the past! Please, pick another date'
      );
    } else {
      startBtn.disabled = false;
    }
  },
};

flatpickr(datePick, options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

startBtn.addEventListener('click', startTimer);

function startTimer() {
  startBtn.disabled = true;
  intervalId = setInterval(timer, 1000);
}

function timer() {
  const timeDiff = new Date(datePick.value) - Date.now();
  if (timeDiff < 100) {
    clearInterval(intervalId);
    Notiflix.Notify.success('Countdown is finish');
  } else {
    console.log(convertMs(timeDiff));

    dateDays.textContent = addLeadingZero(convertMs(timeDiff).days.toString());
    dateHours.textContent = addLeadingZero(
      convertMs(timeDiff).hours.toString()
    );
    dateMinutes.textContent = addLeadingZero(
      convertMs(timeDiff).minutes.toString()
    );
    dateSeconds.textContent = addLeadingZero(
      convertMs(timeDiff).seconds.toString()
    );
  }
}

function addLeadingZero(value) {
  return value.padStart(2, '0');
}
