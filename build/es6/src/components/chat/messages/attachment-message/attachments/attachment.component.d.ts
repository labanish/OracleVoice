/**
 * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
 */
import { IComponent } from "../../../../../model/component.interface";
import { IAttachmentPayload } from "../../../../../model/common/payloads/attachment-payload.interface";
/**
 * Base class for attachment components
 */
declare abstract class AttachmentComponent implements IComponent {
    title: string;
    constructor(payload: IAttachmentPayload);
    abstract render(): HTMLElement;
    static capitalize(str: string): string;
}
export { AttachmentComponent };
