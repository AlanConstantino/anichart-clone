export default class Dom {
    constructor() {
        // store a reference to the <main> tag
        this.main = document.getElementById('main');
        // store a reference to the navbar's children
        this.navbar = document.getElementById('navbar').children;
    }

    // 'classes' can either be a single css class or an array of multiple css classes
    createElement(typeOfElement = 'div', classes = '') {
        const element = document.createElement(typeOfElement);

        if (classes === '') {
            return element;
        }

        if (Array.isArray(classes)) {
            classes.forEach(cssClass => element.classList.add(cssClass));
        } else {
            element.classList.add(classes);
        }

        return element;
    }

    // Doesn't make sense to have an instance just to use this method therefore, it's static.
    // clears everything within the <main> tag22
    static clearMainTag() {
        const main = document.getElementById('main');
        while (main.firstChild) {
            main.removeChild(main.firstChild);
        }
    }

    // Doesn't make sense to have an instance just to use this method therefore, it's static.
    // 'itemToAppend' can either be a single item or an array with multiple items
    static appendToNode(node = '', itemToAppend = '') {
        if (Array.isArray(itemToAppend)) {
            itemToAppend.forEach(item => node.appendChild(item));
            return;
        }

        node.appendChild(itemToAppend);
    }

    // Doesn't make sense to have an instance just to use this method therefore, it's static.
    // 'classes' can either be a single css class or an array of multiple css classes
    static createElement(typeOfElement = 'div', classes = '') {
        const element = document.createElement(typeOfElement);

        if (classes === '') {
            return element;
        }

        if (Array.isArray(classes)) {
            classes.forEach(cssClass => element.classList.add(cssClass));
        } else {
            element.classList.add(classes);
        }

        return element;
    }
}