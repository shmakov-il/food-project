import 'nodelist-foreach-polyfill';
import tabs from './modules/tabs';
import timer from './modules/timer';
import modal, {toggleModalWindow} from './modules/modal';
import cards from './modules/cards';
import forms from './modules/forms';
import slider from './modules/slider';
import calc from './modules/calc';

document.addEventListener('DOMContentLoaded', () => {

    const modalTimerID = setTimeout(toggleModalWindow, 50000, 'hidden');

    tabs('.tabheader__items', '.tabheader__item', '.tabcontent', 'tabheader__item_active');
    timer('2022-12-19', '.timer');
    modal(modalTimerID, '.modal', '[data-modal]');
    cards();
    forms('form', modalTimerID);
    slider({
        container: '.offer__slider',
        slide: '.offer__slide',
        prevArrow: '.offer__slider-prev',
        nextArrow: '.offer__slider-next',
        totalCount: '#total',
        currentSlide: '#current',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner'
    });
    calc();
})
