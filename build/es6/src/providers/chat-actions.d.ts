/**
 * Copyright© 2018, Oracle and/or its affiliates. All rights reserved.
 */
import { IUserMessage } from "../model/common/user-message.interface";
import { IMessage } from "../model/common/message";
import { Logger } from "../core/logger";
/**
 *  Class that process predefined actions
 */
declare class ChatActions {
    onMessage: (message: IMessage) => void;
    onClear: () => void;
    logger: Logger;
    constructor(onMessage: (message: IMessage) => void, onClear: () => void);
    process(message: IUserMessage): boolean;
    processTextMessage(message: IUserMessage): boolean;
    processPostbackMessage(message: IUserMessage): boolean;
    processLocationMessage(message: IUserMessage): boolean;
}
export { ChatActions };
