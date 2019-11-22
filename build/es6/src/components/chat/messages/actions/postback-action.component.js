/**
 * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
 */
import { ActionComponent } from "./action.component";
/**
 * Converts action payload to component
 */
class PostbackActionComponent extends ActionComponent {
    constructor(utils, payload) {
        super(utils, payload);
        this.postback = payload.postback;
    }
    render() {
        let link = super.render();
        link.classList.add(this.utils.getCssClassWithPrefix('action-postback'));
        return link;
    }
    getEventPayload() {
        return Promise.resolve(this.postback);
    }
}
export { PostbackActionComponent };
//# sourceMappingURL=postback-action.component.js.map