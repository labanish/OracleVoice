/**
 * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
 */
import { MessageComponent, MessageSide } from "../message.component";
import { IMessageComponent } from "../../../../model/message-component.interface";
import { AttachmentComponent } from "./attachments/attachment.component";
import { IAttachmentMessagePayload } from "../../../../model/common/payloads/message-payload/attachment-message-payload.interface";
import { Utils } from "../../../../core/utils";
import { IAttachmentPayload } from "../../../../model/common/payloads/attachment-payload.interface";
import { ISettings } from "../../../../core/settings";
/**
 * Converts attachment message payload to component
 */
declare class AttachmentMessageComponent extends MessageComponent implements IMessageComponent {
    private payload;
    attachment: AttachmentComponent;
    constructor(utils: Utils, settings: ISettings, payload: IAttachmentMessagePayload, side: MessageSide);
    /**
     * Renders dom from component object
     * @param {HTMLElement} [messageContent] - message content
     * @return {HTMLElement}
     */
    render(messageContent?: HTMLElement): HTMLElement;
    getContent(): HTMLElement;
    static fromPayload(utils: Utils, settings: ISettings, payload: IAttachmentPayload): AttachmentComponent;
}
export { AttachmentMessageComponent };
