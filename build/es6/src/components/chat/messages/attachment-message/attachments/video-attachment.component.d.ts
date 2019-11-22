/**
 * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
 */
import { AttachmentComponent } from "./attachment.component";
import { IComponent } from "../../../../../model/component.interface";
import { IAttachmentPayload } from "../../../../../model/common/payloads/attachment-payload.interface";
import { Utils } from "../../../../../core/utils";
import { ISettings } from "../../../../../core/settings";
/**
 * Converts attachment payload to component
 */
declare class VideoAttachmentComponent extends AttachmentComponent implements IComponent {
    private utils;
    private settings;
    url: string;
    constructor(utils: Utils, settings: ISettings, payload: IAttachmentPayload);
    /**
     * Renders dom from component object
     * <video class="attachment-video">
     *    Your browser does not support embedded video. However you can <a href="url">download it</a>.
     * </video>
     * @return {HTMLElement}
     */
    render(): HTMLElement;
}
export { VideoAttachmentComponent };
