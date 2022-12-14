function timer() {
    const deadline = '2022-12-19';

    function getRemainingTime(endTime) {
        const diffTime = Date.parse(endTime + 'T00:00:00.00+03:00') - new Date();
        let days, hours, minutes, seconds;

        if (diffTime <= 0) {
            days = 0
            hours = 0
            minutes = 0
            seconds = 0
        } else {
            days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
            hours = Math.floor(diffTime / (1000 * 60 * 60) % 24);
            minutes = Math.floor(diffTime / (1000 * 60) % 60);
            seconds = Math.floor(diffTime / 1000 % 60);
        }

        return {
            diffTime,
            days,
            hours,
            minutes,
            seconds
        }
    }

    function setClock(selector, endTime) {

        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timerID = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const actualTime = getRemainingTime(endTime);

            days.innerHTML = getZero(actualTime.days);
            hours.innerHTML = getZero(actualTime.hours);
            minutes.innerHTML = getZero(actualTime.minutes);
            seconds.innerHTML = getZero(actualTime.seconds);

            if (actualTime.diffTime <= 0) {
                clearInterval(timerID);
            }
        }

        function getZero(num) {
            return num < 10 ? `0${num}` : num;
        }
    }
    setClock('.timer', deadline)
}
export default timer;