import { ActionComponentFactory } from "../../../core/factories/action-component.factory";
const MESSAGE_SIDE = {
    RIGHT: 'right',
    LEFT: 'left'
};
export { MESSAGE_SIDE };
/**
 * Base class for the messages components
 * Converts message payload to component.
 */
class MessageComponent {
    constructor(utils, settings, payload, side) {
        this.utils = utils;
        this.settings = settings;
        this.side = side;
        this.actions = [];
        this.globalActions = [];
        // Create the message actions components
        if (payload.actions) {
            for (let action of payload.actions) {
                let actionComponent = ActionComponentFactory.fromActionPayload(utils, action);
                if (actionComponent) {
                    actionComponent.onActionClick = this.handleOnActionClick.bind(this);
                    this.actions.push(actionComponent);
                }
            }
        }
        // Create the message global actions components
        if (payload.globalActions) {
            for (let action of payload.globalActions) {
                let actionComponent = ActionComponentFactory.fromActionPayload(utils, action);
                if (actionComponent) {
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
    render(messageContent) {
        let message = this.utils.createDiv(['message', this.side]);
        let messageWrapper = this.utils.createDiv(['message-wrapper']);
        message.appendChild(messageWrapper);
        let profilePicUrl = this.side === MESSAGE_SIDE.LEFT ? this.settings.botIcon : this.settings.personIcon;
        if (profilePicUrl) {
            messageWrapper.classList.add(this.utils.getCssClassWithPrefix('has-profile-pic'));
            messageWrapper.appendChild(this.utils.createImage(profilePicUrl, ['message-profile-pic']));
        }
        let bubble = this.utils.createDiv(['message-bubble']);
        let content = this.utils.createDiv(['message-content']);
        content.appendChild(messageContent || this.getContent());
        bubble.appendChild(content);
        if (this.actions) {
            this.appendActions(bubble, this.actions);
        }
        messageWrapper.appendChild(bubble);
        messageWrapper.appendChild(this.utils.createDiv(['clear']));
        if (this.globalActions) {
            this.appendGlobalActions(message, this.globalActions);
        }
        message.appendChild(this.utils.createDiv(['clear']));
        return message;
    }
    /**
     * Method that returns this message content.
     * @return {HTMLElement}
     */
    getContent() {
        throw new Error("Method not implemented.");
    }
    /**
     * Disable actions buttons
     */
    disableActions() {
        for (let action of this.actions) {
            action.disable();
        }
        for (let action of this.globalActions) {
            action.disable();
        }
    }
    /**
     * Handles the action button click
     * @param {IActionEvent} event
     */
    handleOnActionClick(event) {
        if (this.onActionClick) {
            let messageEvent = event;
            messageEvent.messageComponent = this;
            this.onActionClick(messageEvent);
        }
    }
    appendActions(parent, actions) {
        if (actions.length > 0) {
            let actionsElement = this.utils.createDiv(['message-actions']);
            for (let action of actions) {
                actionsElement.appendChild(action.render());
            }
            parent.appendChild(actionsElement);
        }
    }
    appendGlobalActions(parent, actions) {
        if (actions.length > 0) {
            let actionsElement = this.utils.createDiv(['message-global-actions']);
            for (let action of actions) {
                actionsElement.appendChild(action.render());
            }
            parent.appendChild(actionsElement);
        }
    }
}
export { MessageComponent };
//# sourceMappingURL=message.component.js.map