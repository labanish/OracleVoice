/**
 * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
 */
import { MessageComponent, MessageSide } from "../message.component";
import { IMessageComponent } from "../../../../model/message-component.interface";
import { IRawMessagePayload } from "../../../../model/common/payloads/message-payload/raw-message-payload.interface";
import { Utils } from "../../../../core/utils";
import { ISettings } from "../../../../core/settings";
/**
 * This component creates HTML elements for the raw message type.
 * <span>{content}</span>
 */
declare class RawMessageComponent extends MessageComponent implements IMessageComponent {
    payload: string;
    constructor(utils: Utils, settings: ISettings, payload: IRawMessagePayload, side: MessageSide);
    getContent(): HTMLSpanElement;
}
export { RawMessageComponent };
