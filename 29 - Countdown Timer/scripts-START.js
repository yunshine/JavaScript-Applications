const buttons = document.querySelectorAll('.timer__button');
const timeLeftDisplay = document.querySelector('.display__time-left');
const timeEndDisplay = document.querySelector('.display__end-time');
const input = document.querySelector('form');

function setTimerEndTime(seconds) {
    const newDate = new Date();
    const startHour = newDate.getHours();
    const startMinute = newDate.getMinutes();
    const startSecond = newDate.getSeconds();

    const endSecondsToDisplay = (startSecond + seconds) % 60;
    const endMinutesToDisplay = (startMinute + (Math.floor((startSecond + seconds) / 60))) % 60;
    const endHoursToDisplay = (startHour + Math.floor((startMinute + (Math.floor((startSecond + seconds)) / 60)) / 60)) % 12;

    timeEndDisplay.innerText = `This break ends at ${endHoursToDisplay}:${endMinutesToDisplay < 10 ? 0 : ""}${endMinutesToDisplay}:${endSecondsToDisplay < 10 ? 0 : ""}${endSecondsToDisplay}`;

    console.log("Seconds to Add: ", seconds);
    console.log("Hours NOW: ", newDate.getHours());
    console.log("Minutes NOW: ", newDate.getMinutes());
    console.log("Seconds NOW: ", newDate.getSeconds());
};

function buttonTimer() {
    let secondsRemaining = parseInt(this.dataset.time);
    setTimerEndTime(secondsRemaining);
    timeLeftDisplay.innerText = `${secondsRemaining} ${secondsRemaining !== 1 ? "seconds remaining" : "second remaining"}`;
    startCountdown(secondsRemaining);
};

function startCountdown(secondsRemaining) {
    const timer = setInterval(function () {
        secondsRemaining -= 1;
        timeLeftDisplay.innerText = `${secondsRemaining} ${secondsRemaining !== 1 ? "seconds remaining" : "second remaining"}`;
        if (secondsRemaining === 0) {
            clearInterval(timer);
        };
    }, 1000);
}

function inputTimer(e) {
    e.preventDefault();
    let formValue = document.querySelector('input').value;
    let secondsRemaining = parseInt(formValue) * 60;
    setTimerEndTime(secondsRemaining);
    timeLeftDisplay.innerText = `${secondsRemaining} ${secondsRemaining !== 1 ? "seconds remaining" : "second remaining"}`;
    startCountdown(secondsRemaining);
}

buttons.forEach(button => button.addEventListener('click', buttonTimer));
input.addEventListener('submit', inputTimer);
