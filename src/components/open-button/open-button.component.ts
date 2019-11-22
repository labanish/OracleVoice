/**
 * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
 */
import {Component} from "../component";
import {IconButtonComponent} from "../shared/icon-button/icon-button.component";
import {Utils} from "../../core/utils";
import {ISettings} from "../../core/settings";

/**
 * The component create open chat button element on the web page
 * <IconButtonComponent class="chat-button">
 */
export class OpenButtonComponent extends Component {

    content: HTMLElement;

    constructor(utils: Utils,
                private settings: ISettings,
                private onOpen: Function) {
        super(utils);
        this.element = this._createElement();
    }

    render(element: any): void {
        element.appendChild(this.element);
    }

    protected _createElement(): HTMLElement {
        let openButton = new IconButtonComponent(this.utils, this.onOpen.bind(this), this.settings.openIcon, 'chat-button');
        return openButton.element;
    }
}