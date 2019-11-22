/**
 * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
 */
import { AttachmentComponent } from "./attachment.component";
/**
 * Converts attachment payload to component
 */
class VideoAttachmentComponent extends AttachmentComponent {
    constructor(utils, settings, payload) {
        super(payload);
        this.utils = utils;
        this.settings = settings;
        this.url = payload.url;
    }
    /**
     * Renders dom from component object
     * <video class="attachment-video">
     *    Your browser does not support embedded video. However you can <a href="url">download it</a>.
     * </video>
     * @return {HTMLElement}
     */
    render() {
        let element = this.utils.createVideo(this.url, 'attachment-video', this.settings.autoplayVideo);
        element.controls = true;
        element.innerHTML = 'Your browser does not support embedded video. However you can <a href="' + this.url + '">download it</a>.';
        return element;
    }
}
export { VideoAttachmentComponent };
//# sourceMappingURL=video-attachment.component.js.map