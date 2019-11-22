/**
 * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
 */
import { AttachmentComponent } from "./attachment.component";
import { IComponent } from "../../../../../model/component.interface";
import { IAttachmentPayload } from "../../../../../model/common/payloads/attachment-payload.interface";
import { Utils } from "../../../../../core/utils";
/**
 * Converts attachment payload to component
 */
declare class FileAttachmentComponent extends AttachmentComponent implements IComponent {
    private utils;
    url: string;
    constructor(utils: Utils, payload: IAttachmentPayload);
    /**
     * Renders dom from component object
     * <a class="attachment-file" href="url">url</a>
     * @return {HTMLElement}
     */
    render(): HTMLElement;
}
export { FileAttachmentComponent };
