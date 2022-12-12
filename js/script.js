document.addEventListener('DOMContentLoaded', () => {

    // 1. TABS


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



    // 2. TIMER


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



    // 3. MODAL

        const openModalButtons = document.querySelectorAll('[data-modal]'),
            modalWindow = document.querySelector('.modal'),
            modalTimerID = setTimeout(toggleModalWindow, 50000, 'hidden');
        let isCloseThanksModalByUser = true;

        function toggleModalWindow(value = '') {
            isCloseThanksModalByUser = !isCloseThanksModalByUser;
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

        function showThanksModal(message) {
            const previousModalDialog = document.querySelector('.modal__dialog');
            previousModalDialog.classList.add('hide');

            const thanksModal = document.createElement('div');
            thanksModal.classList.add('modal__dialog');
            thanksModal.innerHTML = `
                     <div class="modal__content">
                         <div data-modal-close class="modal__close">×</div>
                         <div class="modal__title">${message}</div>
                     </div>
                `;
            modalWindow.append(thanksModal);

            setTimeout(closeThanksModal, 2000);

            function closeThanksModal() {
                thanksModal.remove();
                previousModalDialog.classList.remove('hide');
                if (!isCloseThanksModalByUser) {
                    toggleModalWindow('');
                }
            }
        }


    // 4. CARDS
    class Menu {
        constructor({img, altimg, title, descr, price}, parentSelector, ...classes) {
            this.imgCard = img;
            this.imgAltText = altimg;
            this.titleCard = title;
            this.textCard = descr;
            this.priceCard = price;
            this.parentSelector = parentSelector;
            this.classes = classes.length ? classes : ['menu__item'];
        }

        render() {
            const menuItem = document.createElement('div');
            menuItem.classList.add(...this.classes);
            menuItem.innerHTML = `
                <img src=${this.imgCard} alt=${this.imgAltText}>
                <h3 class="menu__item-subtitle">${this.titleCard}</h3>
                <div class="menu__item-descr">${this.textCard}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.priceCard}</span> грн/день</div>
                </div>
            `;
            document.querySelector(this.parentSelector).append(menuItem);
        }
    }

    const getResource = async (url) => {
        const result = await fetch(url);

        if (!result.ok) {
            throw new Error(`Could not fetch ${url}, error ${result.status}`)
        }

        return await result.json();
    }

    getResource('http://localhost:3000/menu')
        .then(response => {
            response.forEach(obj => {
                new Menu(obj, '.menu .container').render();
            })
        })

    // 5. SEND FORM

    const forms = document.querySelectorAll('form');
    const messages = {
        loading: './icons/spinner.svg',
        success: 'Спасибо! Мы скоро с вами свяжемся.',
        fail: 'Что-то пошло не так...'
    }

    forms.forEach(item => {
        bindPostData(item);
    })

    const postData = async (url, data) => {
        const result = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: data
        });

        return await result.json();
    }

    function bindPostData(form) {
        form.addEventListener('submit', (event) => {
            event.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = messages.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);

            const formData = new FormData(form);
            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData('http://localhost:3000/requests', json)
                .then(() => {
                    statusMessage.remove();
                    showThanksModal(messages.success);
                })
                .catch(error => {
                    console.error(error);
                    showThanksModal(messages.fail);
                })
                .finally(() => {
                    form.reset();
                });
        })
    }

    // 6. SLIDER
    let slideIndex = 1;
    const slides = document.querySelectorAll('.offer__slide'),
        prev = document.querySelector('.offer__slider-prev'),
        next = document.querySelector('.offer__slider-next'),
        total = document.querySelector('#total'),
        current = document.querySelector('#current');

    showSlides();
    total.textContent = addZero(slides.length);

    function showSlides(n) {
        if (n > slides.length) {
            slideIndex = 1;
        }
        if (n < 1) {
            slideIndex = slides.length
        }

        slides.forEach(item => item.classList.add('hide'));
        slides[slideIndex - 1].classList.remove('hide');


        current.textContent = addZero(slideIndex);
    }

    function addZero(num) {
        return num > 9 ? num : `0${num}`
    }

    prev.addEventListener('click', () => {
        showSlides(slideIndex += -1);
    })

    next.addEventListener('click', () => {
        showSlides(slideIndex += 1);
    })
})

