/**
 * Copyright© 2018, Oracle and/or its affiliates. All rights reserved.
 */
/**
 * The sender type
 */
declare type BotMessageType = 'bot' | 'system' | 'user';
declare const BOT_MESSAGE_TYPE: {
    BOT: string;
    USER: string;
    SYSTEM: string;
};
export { BotMessageType, BOT_MESSAGE_TYPE };
/**
 * The sender details
 */
interface IMessageFrom {
    /**
     * The message type
     */
    type: BotMessageType;
    /**
     * The sender ID, appropriate to the sender type.
     */
    id?: string;
}
export { IMessageFrom };
