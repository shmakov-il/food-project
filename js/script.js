document.addEventListener('DOMContentLoaded', () => {

    // 1. TABS
    function createTabs () {

        const tabsParent = document.querySelector('.tabheader__items'),
            tabs = tabsParent.querySelectorAll('.tabheader__item'),
            tabsContent = document.querySelectorAll('.tabcontent');

        function hideContent(i) {
            tabsContent.forEach(item => {
                item.classList.add('hide');
                item.classList.remove('show');
            });

            tabs.forEach(item => {
                item.classList.remove('tabheader__item_active');
            });
        }

        function showContent(i = 0) {
            tabsContent[i].classList.remove('hide');
            tabsContent[i].classList.add('show');

            tabs[i].classList.add('tabheader__item_active');
        }

        tabsParent.addEventListener('click', (event) => {
            const target = event.target;

            if (target && target.classList.contains('tabheader__item')) {
                tabs.forEach((item, i) => {
                    if (item === target) {
                        hideContent(i);
                        showContent(i);
                    }
                })
            }
        });

    }
    createTabs();

    // 2. TIMER
    function createTimer() {

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
    createTimer();

    // 3. MODAL
    function createModal() {
        const openModalButtons = document.querySelectorAll('[data-modal]'),
            modalWindow = document.querySelector('.modal'),
            modalTimerID = setTimeout(toggleModalWindow, 50000, 'hidden');

        function toggleModalWindow(value = '') {
            modalWindow.classList.toggle('show')
            document.body.style.overflow = value;
            clearTimeout(modalTimerID);
        }

        openModalButtons.forEach(item => {
            item.addEventListener('click', () => {
                toggleModalWindow('hidden');
            })
        });

        modalWindow.addEventListener('click', (event) => {
            if (event.target && event.target.matches('[data-modal-close]')) {
                toggleModalWindow();
            }

            if (event.target && event.target === modalWindow) {
                toggleModalWindow();
            }
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && modalWindow.classList.contains('show')) {
                toggleModalWindow();
            }
        });

        function showModalByScroll() {
            const doc = document.documentElement;

            if (window.scrollY + doc.clientHeight >= doc.scrollHeight) {
                toggleModalWindow('hidden');
                document.removeEventListener('scroll', showModalByScroll);
            }
        }

        document.addEventListener('scroll', showModalByScroll);

    }
    createModal();
})