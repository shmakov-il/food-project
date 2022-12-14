function modal() {
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
}
export default modal;