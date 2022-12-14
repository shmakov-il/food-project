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

    function showContent(i = 0) {
        tabsContent[i].classList.remove('hide');
        tabsContent[i].classList.add('show');

        tabs[i].classList.add(activeTabsClass);
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
}

export default tabs;