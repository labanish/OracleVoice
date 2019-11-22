/**
 * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
 */
/**
 * Base class for attachment components
 */
class AttachmentComponent {
    constructor(payload) {
        this.title = AttachmentComponent.capitalize(payload.type);
    }
    static capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
}
export { AttachmentComponent };
//# sourceMappingURL=attachment.component.js.map