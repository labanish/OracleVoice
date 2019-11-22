/**
 * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
 */
/**
 * Interface of the widget component
 */
interface IComponent {
    /**
     * Convert the component to HTML elements
     * @return {HTMLElement}
     */
    render(): HTMLElement;
}
export { IComponent };
