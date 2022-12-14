function forms() {
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
}
export default forms;