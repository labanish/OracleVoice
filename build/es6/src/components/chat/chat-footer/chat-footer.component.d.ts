/**
 * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
 */
import { Component } from "../../component";
import { IconButtonComponent } from "../../shared/icon-button/icon-button.component";
import { Utils } from "../../../core/utils";
export declare class ChatFooterComponent extends Component {
    private onSend;
    private sendButtonImgSrc;
    private stopButtonImgSrc;
    private inputPlaceholder;
    input: HTMLInputElement;
    sendButton: IconButtonComponent;
    stopButton: IconButtonComponent;
    constructor(utils: Utils, onSend: Function, sendButtonImgSrc: string, stopButtonImgSrc: string, inputPlaceholder: string);
    render(element: any): void;
    protected _createElement(): HTMLElement;
    onInputKeyPress(event: any): void;
    onClick(): void;
    toggleButton(): void;
    _onSend(): void;
}
