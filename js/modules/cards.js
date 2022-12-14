import {getResource} from "../services/services";

function cards() {
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

    getResource('http://localhost:3000/menu')
        .then(response => {
            response.forEach(obj => {
                new Menu(obj, '.menu .container').render();
            })
        })
}
export default cards;