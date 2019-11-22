/**
 * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
 */
/**
 * The attachment type
 */
declare type AttachmentType = 'image' | 'video' | 'audio' | 'file';
declare const ATTACHMENT_TYPE: {
    IMAGE: string;
    VIDEO: string;
    AUDIO: string;
    FILE: string;
};
export { AttachmentType, ATTACHMENT_TYPE };
/**
 * The attachment payload
 */
interface IAttachmentPayload {
    /**
     * The attachment type
     */
    type: AttachmentType;
    /**
     * The attachment url
     */
    url: string;
}
export { IAttachmentPayload };
