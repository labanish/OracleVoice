/**
 * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
 */
import { ActionComponent } from "./action.component";
/**
 * Converts action payload to component
 */
class CallActionComponent extends ActionComponent {
    constructor(utils, payload) {
        super(utils, payload);
        this.phoneNumber = payload.phoneNumber;
    }
    render() {
        let link = super.render();
        link.classList.add(this.utils.getCssClassWithPrefix('action-call'));
        link.href = 'tel:' + this.phoneNumber;
        return link;
    }
    getEventPayload() {
        return Promise.resolve(this.phoneNumber);
    }
}
export { CallActionComponent };
//# sourceMappingURL=call-action.component.js.map