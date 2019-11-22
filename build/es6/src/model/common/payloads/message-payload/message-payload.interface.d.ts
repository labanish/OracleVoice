/**
 * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
 */
import { IActionPayload } from "../action-payload/action-payload.interface";
/**
 * The message payload type
 */
declare type PayloadType = 'text' | 'card' | 'attachment' | 'location' | 'raw' | 'postback';
declare const PAYLOAD_TYPE: {
    TEXT: string;
    CARD: string;
    ATTACHMENT: string;
    LOCATION: string;
    RAW: string;
    POSTBACK: string;
};
export { PayloadType, PAYLOAD_TYPE };
/**
 * The message payload
 */
interface IMessagePayload {
    /**
     * The payload type
     */
    type: PayloadType;
    /**
     * A list of actions related to the attachment.
     */
    actions?: IActionPayload[];
    /**
     * A list of global actions to be rendered.
     * How they are rendered is channel-specific.
     * For example, in Facebook they will be rendered as reply_options.
     */
    globalActions?: IActionPayload[];
}
export { IMessagePayload };
