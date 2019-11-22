/**
 * Copyright© 2018, Oracle and/or its affiliates. All rights reserved.
 */
/**
 * The bots sdk action type
 */
declare type BotsSDKActionType = 'postback' | 'link' | 'webview' | 'reply' | 'locationRequest' | 'share';
declare const BOTS_SDK_ACTION_TYPE: {
    POSTBACK: string;
    WEBVIEW: string;
    REPLY: string;
    LOCATION_REQUEST: string;
    SHARE: string;
    LINK: string;
};
export { BotsSDKActionType, BOTS_SDK_ACTION_TYPE };
/**
 * A link action will open the provided URI when tapped.
 */
interface IBotsSDKMessageAction {
    _id: string;
    /**
     * The button text.
     */
    text: string;
    /**
     * Type of the action
     */
    type: BotsSDKActionType;
    /**
     * Value indicating whether the action is the default action for a message item.
     */
    default: boolean;
    /**
     * Flat object containing any custom properties associated with the action.
     */
    metadata?: any;
}
export { IBotsSDKMessageAction };
