function slider() {
    let offset = 0;
    let slideIndex = 1;

    const slides = document.querySelectorAll('.offer__slide'),
        slider = document.querySelector('.offer__slider'),
        prev = document.querySelector('.offer__slider-prev'),
        next = document.querySelector('.offer__slider-next'),
        total = document.querySelector('#total'),
        current = document.querySelector('#current'),
        slidesWrapper = document.querySelector('.offer__slider-wrapper'),
        width = window.getComputedStyle(slidesWrapper).width,
        slidesField = document.querySelector('.offer__slider-inner');

    slidesField.style.cssText = `
        width: ${slides.length * 100}%;
        display: flex;
        transition: 0.5s;
    `;

    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(slide => slide.style.width = width);

    total.textContent = addZero(slides.length);
    current.textContent = addZero(slideIndex);

    slider.style.position = 'relative';

    const indicators = document.createElement('ol');
    indicators.classList.add('carousel-indicators');
    indicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `;
    slider.append(indicators);

    const dots = [];
    slides.forEach((item, i) => {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `;
        if (i === slideIndex - 1) {
            dot.style.opacity = '1';
        }
        indicators.append(dot);
        dots.push(dot);
    })

    next.addEventListener('click', () => {
        if (offset === (slides.length - 1) * parseInt(width)) {
            offset = 0;
        } else {
            offset += parseInt(width);
        }

        slidesField.style.transform = `translateX(${-offset}px)`;

        if (slideIndex === slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }
        current.textContent = addZero(slideIndex);

        changeDot();
    });

    prev.addEventListener('click', () => {
        if (offset === 0 ) {
            offset = (slides.length - 1) * parseInt(width)
        } else {
            offset -= parseInt(width);
        }

        slidesField.style.transform = `translateX(${-offset}px)`;

        if (slideIndex === 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }
        current.textContent = addZero(slideIndex);

        changeDot();
    });

    indicators.addEventListener('click', (event) => {
        const target = event.target;
        if (target && target.matches('[data-slide-to]')) {
            const slideTo = parseInt(target.getAttribute('data-slide-to'));
            slideIndex = slideTo;
            current.textContent = addZero(slideIndex);

            offset = parseInt(width) * (slideTo - 1);
            slidesField.style.transform = `translateX(${-offset}px)`;

            changeDot();
        }
    })

    function addZero(num) {
        return num > 9 ? num : `0${num}`
    }

    function changeDot() {
        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = '1';
    }
}
export default slider;