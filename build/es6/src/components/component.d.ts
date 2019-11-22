/**
 * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
 */
import { Utils } from "../core/utils";
/**
 * Base class for components
 */
export declare abstract class Component {
    protected utils: Utils;
    element: HTMLElement;
    orgDisplayStyle: string;
    constructor(utils: Utils);
    abstract render(element: HTMLElement): void;
    /**
     * Add css class to the component element
     * @param {string} className
     */
    addClass(className: string): void;
    /**
     * Hide/Show the component
     * @param {boolean} hide
     */
    hide(hide?: boolean): void;
    /**
     * Remove the element from the DOM
     */
    remove(): void;
    /**
     * Add the component element as a last child to the parent element
     * @param {HTMLElement} parent
     */
    appendToElement(parent: HTMLElement): void;
    /**
     * Put current component element as the first child of provided element
     * @param {HTMLElement} parentElement to put as the first child to
     */
    prependToElement(parentElement: HTMLElement): void;
    /**
     * Add provided element as last child to the component element
     * @param {HTMLElement} child
     */
    appendContentChildElement(child: HTMLElement): void;
    appendContentChild(child: Component): void;
    getContentElement(): HTMLElement;
}
