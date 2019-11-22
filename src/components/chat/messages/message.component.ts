/**
 * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
 */
import {ActionComponent} from "./actions/action.component";
import {IMessageComponent} from "../../../model/message-component.interface";
import {IActionEvent, IMessageActionEvent} from "../../../model/action-event.interface";
import {IMessagePayload} from "../../../model/common/payloads/message-payload/message-payload.interface";
import {Utils} from "../../../core/utils";
import {ActionComponentFactory} from "../../../core/factories/action-component.factory";
import {ISettings} from "../../../core/settings";

/**
 * The side of the message in the chat.
 */
type MessageSide = 'right' | 'left';
const MESSAGE_SIDE = {
  RIGHT: 'right',
  LEFT: 'left'
};
export {MessageSide, MESSAGE_SIDE};

/**
 * Base class for the messages components
 * Converts message payload to component.
 */
abstract class MessageComponent implements IMessageComponent{

    protected actions: ActionComponent[] = [];
    protected globalActions: ActionComponent[] = [];

    onActionClick: (event: IActionEvent) => void;

    constructor(protected utils: Utils,
                protected settings: ISettings,
                payload: IMessagePayload,
                protected side: MessageSide){

        // Create the message actions components
        if(payload.actions){
            for(let action of payload.actions){
                let actionComponent = ActionComponentFactory.fromActionPayload(utils, action);
                if(actionComponent) {
                    actionComponent.onActionClick = this.handleOnActionClick.bind(this);
                    this.actions.push(actionComponent);
                }
            }
        }
        // Create the message global actions components
        if(payload.globalActions){
            for(let action of payload.globalActions){
                let actionComponent = ActionComponentFactory.fromActionPayload(utils, action);
                if(actionComponent) {
                    actionComponent.onActionClick = this.handleOnActionClick.bind(this);
                    this.globalActions.push(actionComponent);
                }
            }
        }
    }

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
    render(messageContent?: HTMLElement): HTMLElement {
        let message = this.utils.createDiv(['message', this.side]);

        let messageWrapper = this.utils.createDiv(['message-wrapper']);
        message.appendChild(messageWrapper);

        let profilePicUrl = this.side === MESSAGE_SIDE.LEFT ? this.settings.botIcon : this.settings.personIcon;
        if(profilePicUrl){
            messageWrapper.classList.add(this.utils.getCssClassWithPrefix('has-profile-pic'));
            messageWrapper.appendChild(this.utils.createImage(profilePicUrl, ['message-profile-pic']));
        }

        let bubble = this.utils.createDiv(['message-bubble']);

        let content = this.utils.createDiv(['message-content']);
        content.appendChild(messageContent || this.getContent());
        bubble.appendChild(content);

        if(this.actions) {
            this.appendActions(bubble, this.actions);
        }

        messageWrapper.appendChild(bubble);
        messageWrapper.appendChild(this.utils.createDiv(['clear']));

        if(this.globalActions) {
            this.appendGlobalActions(message, this.globalActions);
        }

        message.appendChild(this.utils.createDiv(['clear']));
        return message;
    }

    /**
     * Method that returns this message content.
     * @return {HTMLElement}
     */
    getContent(): HTMLElement {
        throw new Error("Method not implemented.");
    }


    /**
     * Disable actions buttons
     */
    disableActions(){
        for(let action of this.actions){
            action.disable();
        }
        for(let action of this.globalActions){
            action.disable();
        }
    }

    /**
     * Handles the action button click
     * @param {IActionEvent} event
     */
    protected handleOnActionClick(event: IActionEvent){
        if(this.onActionClick){
            let messageEvent = event as IMessageActionEvent;
            messageEvent.messageComponent = this;
            this.onActionClick(messageEvent);
        }
    }

    protected appendActions(parent: HTMLElement, actions: ActionComponent[]){
        if(actions.length > 0){
            let actionsElement = this.utils.createDiv(['message-actions']);
            for(let action of actions){
                actionsElement.appendChild(action.render());
            }
            parent.appendChild(actionsElement);
        }
    }

    protected appendGlobalActions(parent: HTMLElement, actions: ActionComponent[]){
        if(actions.length > 0){
            let actionsElement = this.utils.createDiv(['message-global-actions']);
            for(let action of actions){
                actionsElement.appendChild(action.render());
            }
            parent.appendChild(actionsElement);
        }
    }
}

export {MessageComponent};