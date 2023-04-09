'use strict';

const dom = {
    create({
        content = '',
        element = 'div',
        type = false,
        parent = false,
        src = false,
        value = false,
        classes = [],
        attr = {},
        listeners = {},
        styles = {},
        amEnde = true,
    } = {}) {
        let neu = document.createElement(element);
        if (content) neu.innerHTML = content;
        if (classes.length) neu.className = classes.join(' ');
        if(src) neu.src = src;
        if(type) neu.type = type;
        if(value) neu.value = value;
    
        Object.entries(attr).forEach(el => neu.setAttribute(...el));
        Object.entries(listeners).forEach(el => neu.addEventListener(...el));
        Object.entries(styles).forEach(style => neu.style[style[0]] = style[1]);
    
        if (parent) {
            if (!amEnde) parent.prepend(neu);
            else parent.append(neu);
        }
    
        return neu;
    },

    $(selector) {
        return document.querySelector(selector);
    },

    $$(selector) {
        return [...document.querySelectorAll(selector)];
    },
    
}

export default dom;