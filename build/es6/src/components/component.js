/**
 * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
 */
/**
 * Base class for components
 */
export class Component {
    constructor(utils) {
        this.utils = utils;
    }
    /**
     * Add css class to the component element
     * @param {string} className
     */
    addClass(className) {
        this.element.classList.add(this.utils.getCssClassWithPrefix(className));
    }
    ;
    /**
     * Hide/Show the component
     * @param {boolean} hide
     */
    hide(hide = true) {
        if (hide) {
            this.orgDisplayStyle = this.element.style.display;
            this.element.style.display = 'none';
        }
        else {
            this.element.style.display = this.orgDisplayStyle;
        }
    }
    /**
     * Remove the element from the DOM
     */
    remove() {
        this.element.remove();
    }
    /**
     * Add the component element as a last child to the parent element
     * @param {HTMLElement} parent
     */
    appendToElement(parent) {
        parent.appendChild(this.element);
    }
    /**
     * Put current component element as the first child of provided element
     * @param {HTMLElement} parentElement to put as the first child to
     */
    prependToElement(parentElement) {
        let firstChild = parentElement.firstChild;
        if (firstChild) {
            parentElement.insertBefore(this.element, firstChild);
        }
        else {
            parentElement.appendChild(this.element);
        }
    }
    /**
     * Add provided element as last child to the component element
     * @param {HTMLElement} child
     */
    appendContentChildElement(child) {
        this.getContentElement().appendChild(child);
    }
    appendContentChild(child) {
        this.getContentElement().appendChild(child.element);
    }
    getContentElement() {
        return this.element;
    }
}
//# sourceMappingURL=component.js.map