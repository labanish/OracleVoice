/**
 * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
 */
import { AttachmentComponent } from "./attachment.component";
/**
 * Converts attachment payload to component
 */
class AudioAttachmentComponent extends AttachmentComponent {
    constructor(utils, settings, payload) {
        super(payload);
        this.utils = utils;
        this.settings = settings;
        this.url = payload.url;
    }
    /**
     * Renders dom from component object
     * <audio class="attachment-audio">
     *    Your browser does not support embedded audio. However you can <a href="url">download it</a>.
     * </audio>
     * @return {HTMLElement}
     */
    render() {
        let audio = this.utils.createAudio(this.url, 'attachment-audio', this.settings.autoplayAudio);
        audio.controls = true;
        audio.innerHTML = 'Your browser does not support embedded audio. However you can <a href="' + this.url + '">download it</a>.';
        return audio;
    }
}
export { AudioAttachmentComponent };
//# sourceMappingURL=audio-attachment.component.js.map