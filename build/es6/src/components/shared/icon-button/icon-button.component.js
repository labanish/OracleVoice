/**
 * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
 */
import { Component } from "../../component";
import { IconComponent } from "../icon/icon.component";
/**
 * This component creates a button with icon element
 * <button class="button icon-button {className}">
 *     <IconComponent>
 * </button>
 */
export class IconButtonComponent extends Component {
    constructor(utils, onClick, imgSrc, className = '') {
        super(utils);
        this.onClick = onClick;
        this.imgSrc = imgSrc;
        this.className = className;
        this.element = this._createElement();
    }
    render(element) {
        element.appendChild(this.element);
    }
    _createElement() {
        let button = this.utils.createButton(['button', 'icon-button', this.className]);
        button.onclick = () => this.onClick(button.innerText);
        let icon = new IconComponent(this.utils, this.imgSrc);
        button.appendChild(icon.element);
        return button;
    }
}
//# sourceMappingURL=icon-button.component.js.map