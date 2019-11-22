/**
 * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
 */
import { AttachmentComponent } from "./attachment.component";
/**
 * Converts attachment payload to component
 */
class FileAttachmentComponent extends AttachmentComponent {
    constructor(utils, payload) {
        super(payload);
        this.utils = utils;
        this.url = payload.url;
    }
    /**
     * Renders dom from component object
     * <a class="attachment-file" href="url">url</a>
     * @return {HTMLElement}
     */
    render() {
        return this.utils.createAnchor(this.url, null, ['attachment-file']);
    }
}
export { FileAttachmentComponent };
//# sourceMappingURL=file-attachment.component.js.map