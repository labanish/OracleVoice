/**
 * Copyright© 2018, Oracle and/or its affiliates. All rights reserved.
 */
/**
 * The recipient type
 */
declare type UserMessageType = 'bot' | 'user';
declare const USER_MESSAGE_TYPE: {
    BOT: UserMessageType;
    USER: UserMessageType;
};
export { UserMessageType, USER_MESSAGE_TYPE };
/**
 * The recipient details
 */
interface IMessageTo {
    /**
     * The message type
     */
    type: UserMessageType;
    /**
     * The recipient ID, appropriate to the recipient type.
     */
    id: string;
}
export { IMessageTo };
