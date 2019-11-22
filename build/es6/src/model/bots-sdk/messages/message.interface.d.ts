/**
 * Copyright© 2018, Oracle and/or its affiliates. All rights reserved.
 */
/**
 * The bots sdk message role type
 */
declare type BotsSDKMessageRoleType = 'appUser' | 'appMaker';
declare const BOTS_SDK_MESSAGE_ROLE: {
    APP_USER: string;
    APP_MARKET: string;
};
export { BotsSDKMessageRoleType, BOTS_SDK_MESSAGE_ROLE };
/**
 * The bots sdk message type
 */
declare type BotsSDKMessageType = 'text' | 'list' | 'location' | 'image' | 'file' | 'carousel';
declare const BOTS_SDK_PAYLOAD_TYPE: {
    TEXT: string;
    LIST: string;
    LOCATION: string;
    IMAGE: string;
    FILE: string;
    CAROUSEL: string;
};
export { BotsSDKMessageType, BOTS_SDK_PAYLOAD_TYPE };
/**
 * A base interface
 */
interface IBotsSDKMessage {
    _id: string;
    /**
     * Message type
     */
    type: BotsSDKMessageType;
    /**
     * Message role
     */
    role?: BotsSDKMessageRoleType;
    /**
     * Url to the avatar for this message sender
     */
    avatarUrl?: string;
}
export { IBotsSDKMessage };
