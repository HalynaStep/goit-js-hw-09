import Notiflix from 'notiflix';

const formEl = document.querySelector(".form")

formEl.addEventListener('submit', onPromise);

function onPromise (event) {
  event.preventDefault();
  
  const { elements: { delay, step, amount } } = event.currentTarget;
  
  let delayValue = Number(delay.value);
  const stepValue = Number(step.value);

    for (let position = 1; position < amount.value; position +=1) {
      createPromise(position, delayValue)
        .then(value =>
          Notiflix.Notify.success(value))
        .catch(error => 
          Notiflix.Notify.failure(error));
      
      delayValue += stepValue;
  }  
};


function createPromise(position, delay) {
  return new Promise((resolve, reject) =>{
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
        if (shouldResolve) {
          resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);          
        } else {
          reject(`❌ Rejected promise ${position} in ${delay}ms`);
        }
      }, delay);
    });
}






