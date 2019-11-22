/**
 * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
 */
import { Component } from "../component";
import { IconButtonComponent } from "../shared/icon-button/icon-button.component";
/**
 * The component create open chat button element on the web page
 * <IconButtonComponent class="chat-button">
 */
export class OpenButtonComponent extends Component {
    constructor(utils, settings, onOpen) {
        super(utils);
        this.settings = settings;
        this.onOpen = onOpen;
        this.element = this._createElement();
    }
    render(element) {
        element.appendChild(this.element);
    }
    _createElement() {
        let openButton = new IconButtonComponent(this.utils, this.onOpen.bind(this), this.settings.openIcon, 'chat-button');
        return openButton.element;
    }
}
//# sourceMappingURL=open-button.component.js.map