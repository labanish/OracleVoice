/**
 * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
 */
import { Component } from "../component";
import { Utils } from "../../core/utils";
import { ISettings } from "../../core/settings";
/**
 * The component create open chat button element on the web page
 * <IconButtonComponent class="chat-button">
 */
export declare class OpenButtonComponent extends Component {
    private settings;
    private onOpen;
    content: HTMLElement;
    constructor(utils: Utils, settings: ISettings, onOpen: Function);
    render(element: any): void;
    protected _createElement(): HTMLElement;
}
