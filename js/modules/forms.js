import {toggleModalWindow} from "./modal";
import {postData} from "../services/services";

function forms(formSelector, modalTimerID) {
    const forms = document.querySelectorAll(formSelector);
    const messages = {
        loading: './icons/spinner.svg',
        success: 'Спасибо! Мы скоро с вами свяжемся.',
        fail: 'Что-то пошло не так...'
    }

    forms.forEach(item => {
        bindPostData(item);
    })

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
            toggleModalWindow('', modalTimerID, '.modal');
        }, 2000);
    }
}
export default forms;