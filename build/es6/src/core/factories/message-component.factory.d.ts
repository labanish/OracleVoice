/**
 * Copyright© 2018, Oracle and/or its affiliates. All rights reserved.
 */
import { Utils } from "../utils";
import { IMessage } from "../../model/common/message";
import { MessageComponent } from "../../components/chat/messages/message.component";
import { ISettings } from "../settings";
/**
 * The factory creates message component from message payload
 */
declare class MessageComponentFactory {
    static fromMessage(utils: Utils, settings: ISettings, message: IMessage): MessageComponent;
}
export { MessageComponentFactory };
