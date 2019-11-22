/**
 * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
 */
/**
 * Base class for action components
 */
class ActionComponent {
    constructor(utils, payload) {
        this.utils = utils;
        this.disabled = false;
        this.type = payload.type;
        this.label = payload.label;
        this.imageUrl = payload.imageUrl;
    }
    render() {
        this.htmlElement = this.utils.createAnchor();
        this.htmlElement.onclick = this.handleOnClick.bind(this);
        if (this.label) {
            this.htmlElement.innerText = this.label;
        }
        else {
            let img = this.utils.createImage(this.imageUrl);
            this.htmlElement.appendChild(img);
        }
        return this.htmlElement;
    }
    handleOnClick(event) {
        if (this.onActionClick && !this.disabled) {
            let event = {
                type: this.type,
                getPayload: this.getEventPayload.bind(this),
                label: this.label
            };
            this.onActionClick(event);
        }
    }
    disable() {
        this.disabled = true;
        this.htmlElement.classList.add(this.utils.getCssClassWithPrefix('disabled'));
    }
}
export { ActionComponent };
//# sourceMappingURL=action.component.js.map