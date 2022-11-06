import Notiflix from 'notiflix';

const inputForm = document.querySelector('.form');
const inputDelay = document.querySelector('input[name="delay"]');
const inputStep = document.querySelector('input[name="step"]');
const inputAmount = document.querySelector('input[name="amount"]');

inputForm.addEventListener('submit', btnClick);

function btnClick(event) {
  event.preventDefault();

  let delayNum = Number(inputDelay.value);
  const stepNum = Number(inputStep.value);
  const amountNum = Number(inputAmount.value);

  for (let i = 1; i <= amountNum; i += 1) {
    createPromise(i, delayNum)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
    delayNum += stepNum;
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      }
      reject({ position, delay });
    }, delay);
  });
}
