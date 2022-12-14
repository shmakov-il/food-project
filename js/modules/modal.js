function toggleModalWindow(value = '',  modalTimerID, modalWindowSelector) {
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

    modalWindow.addEventListener('click', (event) => {
        if (event.target && event.target.matches('[data-modal-close]')) {
            toggleModalWindow('', modalTimerID, modalWindowSelector);
        }

        if (event.target && event.target === modalWindow) {
            toggleModalWindow('', modalTimerID, modalWindowSelector);
        }
    });

    document.addEventListener('keydown', (event) => {
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
export default modal;
export {toggleModalWindow};
