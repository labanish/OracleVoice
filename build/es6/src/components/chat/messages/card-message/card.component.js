/**
 * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
 */
import { ActionComponentFactory } from "../../../../core/factories/action-component.factory";
/**
 * Converts card message payload to component.
 */
class CardComponent {
    constructor(utils, payload) {
        this.utils = utils;
        this.actions = [];
        this.title = payload.title;
        this.description = payload.description;
        this.imageUrl = payload.imageUrl;
        this.url = payload.url;
        if (payload.actions) {
            for (let action of payload.actions) {
                let actionComponent = ActionComponentFactory.fromActionPayload(utils, action);
                if (actionComponent) {
                    actionComponent.onActionClick = this.handleOnActionClick.bind(this);
                    this.actions.push(actionComponent);
                }
            }
        }
    }
    handleOnActionClick(event) {
        if (this.onActionClick) {
            this.onActionClick(event);
        }
    }
    /**
     * Renders dom from component object
     * <div class="card">
     *   <img src="imageUrl"/>
     *   <div class="card-content">
     *       <span class="card-title">{title}</span>
     *       <p>{description}</p>
     *   </div>
     *   <div class="card-actions">
     *      {actions}
     *   </div>
     *   <div class="clear"></div>
     * </div>
     * @return {HTMLElement}
     */
    render() {
        let card = this.utils.createDiv(['card']);
        if (this.imageUrl) {
            card.appendChild(this.utils.createImage(this.imageUrl));
        }
        let content = this.utils.createDiv(['card-content']);
        let title = this.utils.createSpan(['card-title']);
        title.innerText = this.title;
        content.appendChild(title);
        let desc = this.utils.createParagraph();
        desc.innerText = this.description;
        content.appendChild(desc);
        card.appendChild(content);
        if (this.actions.length > 0) {
            let actions = this.utils.createDiv(['card-actions']);
            for (let action of this.actions) {
                actions.appendChild(action.render());
            }
            card.appendChild(actions);
        }
        return card;
    }
    /**
     * Disable actions buttons
     */
    disableActions() {
        for (let action of this.actions) {
            action.disable();
        }
    }
}
export { CardComponent };
//# sourceMappingURL=card.component.js.map