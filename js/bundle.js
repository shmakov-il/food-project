/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function calc() {
  const calculatingResult = document.querySelector('.calculating__result span');
  let sex, height, weight, age, ratio;
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
    });
  }
  initInfoCalc('#gender', 'calculating__choose-item_active');
  initInfoCalc('.calculating__choose_big', 'calculating__choose-item_active');
  function calcTotal() {
    if (!sex || !height || !weight || !age || !ratio) {
      calculatingResult.textContent = '____';
      return;
    }
    if (sex === 'female') {
      calculatingResult.textContent = String(Math.round((447.6 + 9.2 * weight + 3.1 * height - 4.3 * age) * ratio));
    } else {
      calculatingResult.textContent = String(Math.round((83.36 + 13.4 * weight + 4.8 * height - 5.7 * age) * ratio));
    }
  }
  calcTotal();
  function getStaticParams(parentSelector, activeClass) {
    const parent = document.querySelectorAll(`${parentSelector} div`);
    parent.forEach(element => {
      element.addEventListener('click', event => {
        const target = event.target;
        if (target.matches('#female') || target.matches('#male')) {
          sex = target.id;
          localStorage.setItem('sex', sex);
        } else {
          ratio = +target.getAttribute('data-ratio');
          localStorage.setItem('ratio', ratio);
        }
        parent.forEach(element => element.classList.remove(activeClass));
        target.classList.add(activeClass);
        calcTotal();
      });
    });
  }
  getStaticParams('#gender', 'calculating__choose-item_active');
  getStaticParams('.calculating__choose_big', 'calculating__choose-item_active');
  function getDynamicParams(parentSelector) {
    const parent = document.querySelectorAll(`${parentSelector} input`);
    parent.forEach(input => {
      input.addEventListener('input', event => {
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
        switch (input.getAttribute('id')) {
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
      });
    });
  }
  getDynamicParams('.calculating__choose_medium');
}
/* harmony default export */ __webpack_exports__["default"] = (calc);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");

function cards() {
  class Menu {
    constructor(_ref, parentSelector) {
      let {
        img,
        altimg,
        title,
        descr,
        price
      } = _ref;
      this.imgCard = img;
      this.imgAltText = altimg;
      this.titleCard = title;
      this.textCard = descr;
      this.priceCard = price;
      this.parentSelector = parentSelector;
      for (var _len = arguments.length, classes = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        classes[_key - 2] = arguments[_key];
      }
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
  (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getResource)('http://localhost:3000/menu').then(response => {
    response.forEach(obj => {
      new Menu(obj, '.menu .container').render();
    });
  });
}
/* harmony default export */ __webpack_exports__["default"] = (cards);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


function forms(formSelector, modalTimerID) {
  const forms = document.querySelectorAll(formSelector);
  const messages = {
    loading: './icons/spinner.svg',
    success: 'Спасибо! Мы скоро с вами свяжемся.',
    fail: 'Что-то пошло не так...'
  };
  forms.forEach(item => {
    bindPostData(item);
  });
  function bindPostData(form) {
    form.addEventListener('submit', event => {
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
      (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)('http://localhost:3000/requests', json).then(() => {
        statusMessage.remove();
        showThanksModal(messages.success);
      }).catch(error => {
        console.error(error);
        showThanksModal(messages.fail);
      }).finally(() => {
        form.reset();
      });
    });
  }
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
    const modalWindow = document.querySelector('.modal');
    modalWindow.append(thanksModal);
    setTimeout(() => {
      thanksModal.remove();
      previousModalDialog.classList.remove('hide');
      (0,_modal__WEBPACK_IMPORTED_MODULE_0__.toggleModalWindow)('', modalTimerID, '.modal');
    }, 2000);
  }
}
/* harmony default export */ __webpack_exports__["default"] = (forms);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "toggleModalWindow": function() { return /* binding */ toggleModalWindow; }
/* harmony export */ });
function toggleModalWindow() {
  let value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  let modalTimerID = arguments.length > 1 ? arguments[1] : undefined;
  let modalWindowSelector = arguments.length > 2 ? arguments[2] : undefined;
  const modalWindow = document.querySelector(modalWindowSelector);
  modalWindow.classList.toggle('show');
  document.body.style.overflow = value;
  clearTimeout(modalTimerID);
}
function modal(modalTimerID, modalWindowSelector, triggerModalWindow) {
  const openModalButtons = document.querySelectorAll(triggerModalWindow),
    modalWindow = document.querySelector(modalWindowSelector);
  openModalButtons.forEach(item => {
    item.addEventListener('click', () => {
      toggleModalWindow('hidden', modalTimerID, modalWindowSelector);
    });
  });
  modalWindow.addEventListener('click', event => {
    if (event.target && event.target.matches('[data-modal-close]')) {
      toggleModalWindow('', modalTimerID, modalWindowSelector);
    }
    if (event.target && event.target === modalWindow) {
      toggleModalWindow('', modalTimerID, modalWindowSelector);
    }
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && modalWindow.classList.contains('show')) {
      toggleModalWindow('', modalTimerID, modalWindowSelector);
    }
  });
  function showModalByScroll() {
    const doc = document.documentElement;
    if (window.scrollY + doc.clientHeight >= doc.scrollHeight) {
      toggleModalWindow('hidden', modalTimerID, modalWindowSelector);
      document.removeEventListener('scroll', showModalByScroll);
    }
  }
  document.addEventListener('scroll', showModalByScroll);
}
/* harmony default export */ __webpack_exports__["default"] = (modal);


/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function slider(_ref) {
  let {
    container,
    slide,
    prevArrow,
    nextArrow,
    totalCount,
    currentSlide,
    wrapper,
    field
  } = _ref;
  let offset = 0;
  let slideIndex = 1;
  const slides = document.querySelectorAll(slide),
    slider = document.querySelector(container),
    prev = document.querySelector(prevArrow),
    next = document.querySelector(nextArrow),
    total = document.querySelector(totalCount),
    current = document.querySelector(currentSlide),
    slidesWrapper = document.querySelector(wrapper),
    width = window.getComputedStyle(slidesWrapper).width,
    slidesField = document.querySelector(field);
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
  });
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
    if (offset === 0) {
      offset = (slides.length - 1) * parseInt(width);
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
  indicators.addEventListener('click', event => {
    const target = event.target;
    if (target && target.matches('[data-slide-to]')) {
      const slideTo = parseInt(target.getAttribute('data-slide-to'));
      slideIndex = slideTo;
      current.textContent = addZero(slideIndex);
      offset = parseInt(width) * (slideTo - 1);
      slidesField.style.transform = `translateX(${-offset}px)`;
      changeDot();
    }
  });
  function addZero(num) {
    return num > 9 ? num : `0${num}`;
  }
  function changeDot() {
    dots.forEach(dot => dot.style.opacity = '.5');
    dots[slideIndex - 1].style.opacity = '1';
  }
}
/* harmony default export */ __webpack_exports__["default"] = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function tabs(tabsContainer, tabsElement, tabContent, activeTabsClass) {
  const tabsParent = document.querySelector(tabsContainer),
    tabs = tabsParent.querySelectorAll(tabsElement),
    tabsContent = document.querySelectorAll(tabContent);
  function hideContent() {
    tabsContent.forEach(item => {
      item.classList.add('hide');
      item.classList.remove('show');
    });
    tabs.forEach(item => {
      item.classList.remove(activeTabsClass);
    });
  }
  function showContent() {
    let i = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    tabsContent[i].classList.remove('hide');
    tabsContent[i].classList.add('show');
    tabs[i].classList.add(activeTabsClass);
  }
  tabsParent.addEventListener('click', event => {
    const target = event.target;
    if (target && target.classList.contains('tabheader__item')) {
      tabs.forEach((item, i) => {
        if (item === target) {
          hideContent(i);
          showContent(i);
        }
      });
    }
  });
}
/* harmony default export */ __webpack_exports__["default"] = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function timer(deadline, timerSelector) {
  function getRemainingTime(endTime) {
    const diffTime = Date.parse(endTime + 'T00:00:00.00+03:00') - new Date();
    let days, hours, minutes, seconds;
    if (diffTime <= 0) {
      days = 0;
      hours = 0;
      minutes = 0;
      seconds = 0;
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
    };
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
  setClock(timerSelector, deadline);
}
/* harmony default export */ __webpack_exports__["default"] = (timer);

/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getResource": function() { return /* binding */ getResource; },
/* harmony export */   "postData": function() { return /* binding */ postData; }
/* harmony export */ });
const postData = async (url, data) => {
  const result = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: data
  });
  return await result.json();
};
const getResource = async url => {
  const result = await fetch(url);
  if (!result.ok) {
    throw new Error(`Could not fetch ${url}, error ${result.status}`);
  }
  return await result.json();
};



/***/ }),

/***/ "./node_modules/nodelist-foreach-polyfill/index.js":
/*!*********************************************************!*\
  !*** ./node_modules/nodelist-foreach-polyfill/index.js ***!
  \*********************************************************/
/***/ (function() {

if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = function (callback, thisArg) {
        thisArg = thisArg || window;
        for (var i = 0; i < this.length; i++) {
            callback.call(thisArg, this[i], i, this);
        }
    };
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
!function() {
"use strict";
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var nodelist_foreach_polyfill__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! nodelist-foreach-polyfill */ "./node_modules/nodelist-foreach-polyfill/index.js");
/* harmony import */ var nodelist_foreach_polyfill__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(nodelist_foreach_polyfill__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");








document.addEventListener('DOMContentLoaded', () => {
  const modalTimerID = setTimeout(_modules_modal__WEBPACK_IMPORTED_MODULE_3__.toggleModalWindow, 50000, 'hidden');
  (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_1__["default"])('.tabheader__items', '.tabheader__item', '.tabcontent', 'tabheader__item_active');
  (0,_modules_timer__WEBPACK_IMPORTED_MODULE_2__["default"])('2022-12-19', '.timer');
  (0,_modules_modal__WEBPACK_IMPORTED_MODULE_3__["default"])(modalTimerID, '.modal', '[data-modal]');
  (0,_modules_cards__WEBPACK_IMPORTED_MODULE_4__["default"])();
  (0,_modules_forms__WEBPACK_IMPORTED_MODULE_5__["default"])('form', modalTimerID);
  (0,_modules_slider__WEBPACK_IMPORTED_MODULE_6__["default"])({
    container: '.offer__slider',
    slide: '.offer__slide',
    prevArrow: '.offer__slider-prev',
    nextArrow: '.offer__slider-next',
    totalCount: '#total',
    currentSlide: '#current',
    wrapper: '.offer__slider-wrapper',
    field: '.offer__slider-inner'
  });
  (0,_modules_calc__WEBPACK_IMPORTED_MODULE_7__["default"])();
});
}();
/******/ })()
;
//# sourceMappingURL=bundle.js.map