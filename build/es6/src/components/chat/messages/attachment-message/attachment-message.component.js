/**
 * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
 */
import { MessageComponent } from "../message.component";
import { ATTACHMENT_TYPE } from "../../../../model/common/payloads/attachment-payload.interface";
import { ImageAttachmentComponent } from "./attachments/image-attachment.component";
import { VideoAttachmentComponent } from "./attachments/video-attachment.component";
import { AudioAttachmentComponent } from "./attachments/audio-attachment.component";
import { FileAttachmentComponent } from "./attachments/file-attachment.component";
/**
 * Converts attachment message payload to component
 */
class AttachmentMessageComponent extends MessageComponent {
    constructor(utils, settings, payload, side) {
        super(utils, settings, payload, side);
        this.payload = payload;
        this.attachment = AttachmentMessageComponent.fromPayload(utils, settings, payload.attachment);
    }
    /**
     * Renders dom from component object
     * @param {HTMLElement} [messageContent] - message content
     * @return {HTMLElement}
     */
    render(messageContent) {
        let div = this.utils.createDiv();
        div.appendChild(super.render());
        return div;
    }
    getContent() {
        return this.attachment.render();
    }
    static fromPayload(utils, settings, payload) {
        switch (payload.type) {
            case ATTACHMENT_TYPE.IMAGE:
                return new ImageAttachmentComponent(utils, payload);
            case ATTACHMENT_TYPE.VIDEO:
                return new VideoAttachmentComponent(utils, settings, payload);
            case ATTACHMENT_TYPE.AUDIO:
                return new AudioAttachmentComponent(utils, settings, payload);
            case ATTACHMENT_TYPE.FILE:
                return new FileAttachmentComponent(utils, payload);
            default:
                throw Error('Payload contains wrong attachment type');
        }
    }
}
export { AttachmentMessageComponent };
//# sourceMappingURL=attachment-message.component.js.map