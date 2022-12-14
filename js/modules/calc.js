function calc() {
    const calculatingResult = document.querySelector('.calculating__result span');
    let sex,
        height,
        weight,
        age,
        ratio;

    if (localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex');
    } else {
        sex = 'female';
        localStorage.setItem('sex', 'female');
    }

    if (localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio');
    } else {
        ratio = '1.375';
        localStorage.setItem('ratio', '1.375');
    }

    function initInfoCalc(parentSelector, activeClass) {
        const elements = document.querySelectorAll(`${parentSelector} div`);

        elements.forEach(element => {
            element.classList.remove(activeClass);
            if (element.getAttribute('id') === localStorage.getItem('sex')) {
                element.classList.add(activeClass);
            }

            if (element.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                element.classList.add(activeClass);
            }
        })
    }
    initInfoCalc('#gender', 'calculating__choose-item_active');
    initInfoCalc('.calculating__choose_big', 'calculating__choose-item_active');

    function calcTotal() {
        if (!sex || !height || !weight || !age || !ratio) {
            calculatingResult.textContent = '____';
            return;
        }
        if (sex === 'female') {
            calculatingResult.textContent = String(Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio));
        } else {
            calculatingResult.textContent = String(Math.round((83.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio));
        }
    }
    calcTotal();

    function getStaticParams(parentSelector, activeClass) {
        const parent = document.querySelectorAll(`${parentSelector} div`);

        parent.forEach(element => {
            element.addEventListener('click', (event) => {
                const target = event.target;
                if (target.matches('#female') || target.matches('#male')) {
                    sex = target.id;
                    localStorage.setItem('sex', sex)
                } else {
                    ratio = +target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', ratio)
                }

                parent.forEach(element => element.classList.remove(activeClass));
                target.classList.add(activeClass);

                calcTotal();
            })
        });
    }
    getStaticParams('#gender', 'calculating__choose-item_active');
    getStaticParams('.calculating__choose_big', 'calculating__choose-item_active');


    function getDynamicParams(parentSelector) {
        const parent = document.querySelectorAll(`${parentSelector} input`);

        parent.forEach(input => {
            input.addEventListener('input', (event) => {

                function checkingInputValue() {
                    if (input.value.match(/\D/g)) {
                        input.style.border = '1px solid red';
                        input.value = input.value.replace(/\D/g, '');
                        input.addEventListener('change', checkingInputValue);
                    } else {
                        input.style.border = '1px solid green';
                    }
                }

                checkingInputValue();

                switch(input.getAttribute('id')) {
                    case 'height':
                        height = +input.value;
                        break;
                    case 'weight':
                        weight = +input.value;
                        break;
                    case 'age':
                        age = +input.value;
                        break;
                }

                calcTotal();
            })
        })
    }
    getDynamicParams('.calculating__choose_medium');
}
export default calc;