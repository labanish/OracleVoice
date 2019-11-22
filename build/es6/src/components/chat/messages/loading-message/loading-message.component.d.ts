/**
 * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
 */
import { IComponent } from "../../../../model/component.interface";
import { MessageSide } from "../message.component";
import { Utils } from "../../../../core/utils";
/**
 * Represents loading component
 */
declare class LoadingMessageComponent implements IComponent {
    private text;
    private side;
    private utils;
    element: HTMLElement;
    constructor(text: string, side: MessageSide, utils: Utils);
    /**
     * Renders the loading message elements
     * <div class="loading-message">
     *     <div class="message-bubble right | left">
     *        <div class="message-content">
     *             {SpinnerComponent}
     *            <span>{text}</span>
     *        </div>
     *     </div>
     *     <div class="clear"></div>
     * </div>
     * @return {HTMLElement}
     */
    render(): HTMLElement;
    remove(): void;
}
export { LoadingMessageComponent };
