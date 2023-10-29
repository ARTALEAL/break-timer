let countDown;
const timerDisplay = document.querySelector('.timer-display__left-time');
const timerEndIn = document.querySelector('.timer-display__end-time');
const timerButtons = document.querySelectorAll('.timer__button');

const timer = (seconds) => {
  clearInterval(countDown);
  displayTimer(seconds);
  const currentTime = Date.now();
  const endTime = currentTime + seconds * 1000;
  displayEndTime(endTime);
  countDown = setInterval(() => {
    const secondsLeft = Math.round((endTime - Date.now()) / 1000);
    if (secondsLeft < 0) {
      clearInterval(countDown);
      document.title = 'Таймер на перерыв';
      return;
    }
    displayTimer(secondsLeft);
  }, 1000);
};

const displayTimer = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remaindeSeconds = seconds % 60;
  const display = `${minutes < 10 ? '0' + minutes : minutes}:${
    remaindeSeconds < 10 ? '0' + remaindeSeconds : remaindeSeconds
  }`;
  timerDisplay.textContent = display;
  document.title = display;
};

const displayEndTime = (timeStamp) => {
  const endIn = new Date(timeStamp);
  const hours = endIn.getHours();
  const minutes = endIn.getMinutes();
  timerEndIn.textContent = `Вернуться к ${hours < 10 ? '0' + hours : hours}:${
    minutes < 10 ? '0' + minutes : minutes
  }`;
};

timerButtons.forEach((el) => {
  el.addEventListener('click', () => {
    const timeLine = Number(el.getAttribute('data-time'));
    timer(timeLine);
  });
});

document.timerForm.addEventListener('submit', function (e) {
  e.preventDefault();
  timer(Number(this.minutes.value * 60));
  this.reset();
});
