/**
 * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
 */
import { AttachmentComponent } from "./attachment.component";
/**
 * Converts attachment payload to component
 */
class ImageAttachmentComponent extends AttachmentComponent {
    constructor(utils, payload) {
        super(payload);
        this.utils = utils;
        this.url = payload.url;
    }
    /**
     * Renders dom from component object
     * <img class="attachment-image" src="url"/>
     * @return {HTMLElement}
     */
    render() {
        return this.utils.createImage(this.url, ['attachment-image']);
    }
}
export { ImageAttachmentComponent };
//# sourceMappingURL=image-attachment.component.js.map