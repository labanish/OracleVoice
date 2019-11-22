/**
 * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
 */
import { Component } from "../component";
import { Utils } from "../../core/utils";
import { LoadingComponent } from "../loading/loading.component";
import { IMessageActionEvent } from "../../model/action-event.interface";
import { IMessage } from "../../model/common/message";
import { ChatActions } from "../../providers/chat-actions";
import { ISettings } from "../../core/settings";
import { IBotsService } from "../../providers/bots-service.interface";
/**
 * The component creates chat scrollable window
 * <HeaderComponent>
 * <div class="chat">
 *     <div id="ochat_widget_messages" class="scroll-content">
 *     </div>
 * </div>
 * <ChatFooterComponent>
 */
export declare class ChatComponent extends Component {
    private settings;
    private dataService;
    private loadingComponent;
    private _logger;
    static MESSAGES_ID: string;
    message: string;
    input: HTMLInputElement;
    scrollContent: HTMLElement;
    chatActions: ChatActions;
    constructor(utils: Utils, settings: ISettings, dataService: IBotsService, loadingComponent: LoadingComponent);
    private onClear;
    /**
     * Inherit form Component
     * @return {HTMLElement}
     */
    protected _createElement(): HTMLElement;
    render(element: any): void;
    /**
     * Remove the element
     */
    remove(): void;
    /**
     * Render messages in the chat
     * @param {IMessage[]} messages
     */
    renderMessages(messages: IMessage[]): void;
    /**
     * Called when message action button was clicked
     * @param {IMessageActionEvent} event
     */
    onMessageActionClicked(event: IMessageActionEvent): void;
    /**
     * Called when message received from the server
     * @param {IMessage} message
     */
    onMessageReceived(message: IMessage): void;
    /**
     * Create and send user message
     * @param {string} text
     */
    sendMessage(text: string): void;
    /**
     * Send message to the server
     * @param message
     */
    sendMessageToServer(message: any): void;
    /**
     * Scroll all the chat content to the last message
     */
    scrollToBottom(): void;
}
