/**
 * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
 */
import {Component} from "../../component";
import {Utils} from "../../../core/utils";
import {IconComponent} from "../icon/icon.component";

/**
 * This component creates a button with icon element
 * <button class="button icon-button {className}">
 *     <IconComponent>
 * </button>
 */
export class IconButtonComponent extends Component {

    constructor(utils: Utils,
                private onClick: Function,
                private imgSrc: string,
                private className: string = '') {
        super(utils);
        this.element = this._createElement();
    }

    render(element: any): void {
        element.appendChild(this.element);
    }

    protected _createElement(): HTMLElement {
        let button = this.utils.createButton(['button', 'icon-button', this.className]);
        button.onclick = () => this.onClick(button.innerText);
        let icon = new IconComponent(this.utils, this.imgSrc);
        button.appendChild(icon.element);
        return button;
    }
}