/**
 * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
 */
import { MessageComponent } from "../message.component";
import { UrlActionComponent } from "../actions/url-action.component";
import { ACTION_TYPE } from "../../../../model/common/payloads/action-payload/action-payload.interface";
/**
 * This component creates HTML elements for the location message type.
 */
class LocationMessageComponent extends MessageComponent {
    constructor(utils, settings, payload, side) {
        super(utils, settings, payload, side);
        this.title = payload.location.title;
        this.url = payload.location.url;
        this.longitude = payload.location.longitude;
        this.latitude = payload.location.latitude;
    }
    /**
     * Renders dom from component object
     * @return {HTMLElement}
     */
    render() {
        if (this.actions.length === 0) {
            let payload = {
                type: ACTION_TYPE.URL,
                label: 'Open Map',
                url: this.url || 'https://www.google.com/maps?z=12&t=m&q=loc:' + this.latitude + '+' + this.longitude
            };
            this.actions.push(new UrlActionComponent(this.utils, payload));
        }
        return super.render();
    }
    getContent() {
        let span = this.utils.createSpan();
        if (this.title) {
            span.innerText = this.title;
        }
        return span;
    }
}
export { LocationMessageComponent };
//# sourceMappingURL=location-message.component.js.map