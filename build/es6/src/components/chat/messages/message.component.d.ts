/**
 * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
 */
import { ActionComponent } from "./actions/action.component";
import { IMessageComponent } from "../../../model/message-component.interface";
import { IActionEvent } from "../../../model/action-event.interface";
import { IMessagePayload } from "../../../model/common/payloads/message-payload/message-payload.interface";
import { Utils } from "../../../core/utils";
import { ISettings } from "../../../core/settings";
/**
 * The side of the message in the chat.
 */
declare type MessageSide = 'right' | 'left';
declare const MESSAGE_SIDE: {
    RIGHT: string;
    LEFT: string;
};
export { MessageSide, MESSAGE_SIDE };
/**
 * Base class for the messages components
 * Converts message payload to component.
 */
declare abstract class MessageComponent implements IMessageComponent {
    protected utils: Utils;
    protected settings: ISettings;
    protected side: MessageSide;
    protected actions: ActionComponent[];
    protected globalActions: ActionComponent[];
    onActionClick: (event: IActionEvent) => void;
    constructor(utils: Utils, settings: ISettings, payload: IMessagePayload, side: MessageSide);
    /**
     * Renders dom from component object
     * <div class="message">
     *    <div class="message-wrapper">
     *        <img class="message-profile-pic right | left" src="{PROFILE_PICTURE}"/>
     *        <div class="message-bubble right | left">
     *             <div class="message-content">{messageContent | getContent()}</div>
     *             <div class="message-actions">{actions}</div>
     *        </div>
     *    <div>
     *    <div class="message-global-actions">{globalActions}</div>
     *    <div class="clear"></div>
     * </div>
     * @param {HTMLElement} [messageContent] - message content
     * @return {HTMLElement}
     */
    render(messageContent?: HTMLElement): HTMLElement;
    /**
     * Method that returns this message content.
     * @return {HTMLElement}
     */
    getContent(): HTMLElement;
    /**
     * Disable actions buttons
     */
    disableActions(): void;
    /**
     * Handles the action button click
     * @param {IActionEvent} event
     */
    protected handleOnActionClick(event: IActionEvent): void;
    protected appendActions(parent: HTMLElement, actions: ActionComponent[]): void;
    protected appendGlobalActions(parent: HTMLElement, actions: ActionComponent[]): void;
}
export { MessageComponent };
