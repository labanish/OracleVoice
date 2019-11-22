/**
 * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
 */
import { MessageComponent } from "../message.component";
/**
 * This component creates HTML elements for the raw message type.
 * <span>{content}</span>
 */
class RawMessageComponent extends MessageComponent {
    constructor(utils, settings, payload, side) {
        super(utils, settings, payload, side);
        this.payload = JSON.stringify(payload.payload);
    }
    getContent() {
        let span = this.utils.createSpan();
        span.innerText = this.payload;
        return span;
    }
}
export { RawMessageComponent };
//# sourceMappingURL=raw-message.component.js.map