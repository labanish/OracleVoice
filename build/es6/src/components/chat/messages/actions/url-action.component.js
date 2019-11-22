/**
 * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
 */
import { ActionComponent } from "./action.component";
/**
 * Converts action payload to component
 */
class UrlActionComponent extends ActionComponent {
    constructor(utils, payload) {
        super(utils, payload);
        this.url = payload.url;
    }
    render() {
        let link = super.render();
        link.classList.add(this.utils.getCssClassWithPrefix('action-url'));
        link.target = '_blank';
        link.href = this.url;
        return link;
    }
    getEventPayload() {
        return Promise.resolve(this.url);
    }
}
export { UrlActionComponent };
//# sourceMappingURL=url-action.component.js.map