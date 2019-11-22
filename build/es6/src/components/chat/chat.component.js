/**
 * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
 */
import { Component } from "../component";
import { HeaderComponent } from "../shared/header/header.component";
import { MESSAGE_SIDE } from "./messages/message.component";
import { PAYLOAD_TYPE } from "../../model/common/payloads/message-payload/message-payload.interface";
import { LoadingMessageComponent } from "./messages/loading-message/loading-message.component";
import { ACTION_TYPE } from "../../model/common/payloads/action-payload/action-payload.interface";
import { createUserMessage } from "../../model/common/message";
import { MessageComponentFactory } from "../../core/factories/message-component.factory";
import { Logger } from "../../core/logger";
import { ChatFooterComponent } from "./chat-footer/chat-footer.component";
import { ChatActions } from "../../providers/chat-actions";
/**
 * The component creates chat scrollable window
 * <HeaderComponent>
 * <div class="chat">
 *     <div id="ochat_widget_messages" class="scroll-content">
 *     </div>
 * </div>
 * <ChatFooterComponent>
 */
export class ChatComponent extends Component {
    constructor(utils, settings, dataService, loadingComponent) {
        super(utils);
        this.settings = settings;
        this.dataService = dataService;
        this.loadingComponent = loadingComponent;
        this._logger = new Logger('ChatComponent');
        this.element = this._createElement();
        loadingComponent.present('Please wait ...');
        // load history messages
        dataService
            .loadChat()
            .then(messages => {
            // free the main thread
            setTimeout(() => {
                this.renderMessages(messages.slice());
                this.scrollToBottom();
                loadingComponent.dismiss();
                dataService.onMessage = this.onMessageReceived.bind(this);
            });
        });
        this.chatActions = new ChatActions(this.onMessageReceived.bind(this), this.onClear.bind(this));
    }
    onClear() {
        this.dataService.clear();
    }
    /**
     * Inherit form Component
     * @return {HTMLElement}
     */
    _createElement() {
        const chat = this.utils.createDiv(['chat']);
        this.scrollContent = this.utils.createDiv(['scroll-content']);
        this.scrollContent.id = ChatComponent.MESSAGES_ID;
        chat.appendChild(this.scrollContent);
        const footer = new ChatFooterComponent(this.utils, this.sendMessage.bind(this), this.settings.sendIcon, this.settings.stopIcon, this.settings.chatInputPlaceholder);
        footer.appendToElement(chat);
        const header = new HeaderComponent(this.utils, this.settings.chatTitle, this.settings.chatSubTitle, 'chat-title', null, null);
        header.prependToElement(chat);
        return chat;
    }
    render(element) { }
    /**
     * Remove the element
     */
    remove() {
        super.remove();
        this.dataService.onMessage = () => { };
    }
    /**
     * Render messages in the chat
     * @param {IMessage[]} messages
     */
    renderMessages(messages) {
        for (let message of messages) {
            let messageComponent = MessageComponentFactory.fromMessage(this.utils, this.settings, message);
            messageComponent.onActionClick = this.onMessageActionClicked.bind(this);
            this.scrollContent.appendChild(messageComponent.render());
        }
    }
    /**
     * Called when message action button was clicked
     * @param {IMessageActionEvent} event
     */
    onMessageActionClicked(event) {
        event.messageComponent.disableActions();
        if (event.type === ACTION_TYPE.POST_BACK) {
            event.getPayload()
                .then(payload => {
                let message = createUserMessage({
                    type: PAYLOAD_TYPE.POSTBACK,
                    text: event.label,
                    postback: payload
                }, this.settings.channel);
                this.sendMessageToServer(message);
            });
        }
        else if (event.type === ACTION_TYPE.LOCATION) {
            // add loading element to the chat
            const messagesElement = document.getElementById(ChatComponent.MESSAGES_ID);
            let loading = new LoadingMessageComponent('Loading location', MESSAGE_SIDE.RIGHT, this.utils);
            messagesElement.appendChild(loading.render());
            this.scrollToBottom();
            // get event payload
            event.getPayload()
                .then(payload => {
                loading.remove();
                let message = createUserMessage({
                    type: PAYLOAD_TYPE.LOCATION,
                    location: {
                        title: event.label === '@Share Location' ? '@demo location' : undefined,
                        longitude: payload.longitude,
                        latitude: payload.latitude
                    }
                }, this.settings.channel);
                this.sendMessageToServer(message);
            });
        }
    }
    /**
     * Called when message received from the server
     * @param {IMessage} message
     */
    onMessageReceived(message) {
        this._logger.debug('onMessageReceived', message);
        this.renderMessages([message]);
        this.scrollToBottom();
    }
    /**
     * Create and send user message
     * @param {string} text
     */
    sendMessage(text) {
        let payload = {
            type: PAYLOAD_TYPE.TEXT,
            text: text
        };
        let message = createUserMessage(payload, this.settings.channel);
        this.sendMessageToServer(message);
    }
    /**
     * Send message to the server
     * @param message
     */
    sendMessageToServer(message) {
        // Check if the message is chat action and application in debug mode
        if (!this.settings.isDebugMode || !this.chatActions.process(message)) {
            this.dataService.send(message);
        }
    }
    /**
     * Scroll all the chat content to the last message
     */
    scrollToBottom() {
        setTimeout(() => {
            let element = document.getElementById(ChatComponent.MESSAGES_ID);
            element.scrollTop = element.scrollHeight - 300;
        });
    }
}
ChatComponent.MESSAGES_ID = 'ochat_widget_messages';
//# sourceMappingURL=chat.component.js.map