/**
 * Copyright© 2018, Oracle and/or its affiliates. All rights reserved.
 */
/**
 * The widget server mode
 */
declare type ModeType = 'chatServer' | 'botsSDK';
declare const MODE: {
    CHAT_SERVER: string;
    BOTS_SDK: string;
};
export { ModeType, MODE };
/**
 * THe widget settings
 */
export interface ISettings {
    /**
     * replace by grunt with data from package.json
     */
    version: string;
    /**
     * replace by grunt with data from package.json
     */
    name: string;
    /**
     * The Bots Instance connection mode.
     */
    mode: ModeType;
    /**
     * Application Id for BOT SDK in BOT SDK mode
     */
    appId?: string;
    /**
     * The url to the hosted sdk
     */
    sdkUrl?: string;
    /**
     * Chat server url for Chat Server Mode
     */
    uri?: string;
    /**
     * Channel identifier last GUID from WebHook URL for Chat Server Mode
     */
    channel?: string;
    /**
     * Unique user identifier
     */
    userId?: string;
    /**
     * Enable debug mode
     */
    isDebugMode: boolean;
    /**
     * Reconnect web socket's time to wait before attempting reconnect (after close)
     */
    webSocketReconnectInterval: number;
    /**
     * Reconnect web sockets's time to wait for WebSocket to open (before aborting and retrying)
     */
    webSocketTimeoutInterval: number;
    autoplayVideo: boolean;
    autoplayAudio: boolean;
    /**
 * Base64 or url to image for robot
 */
    botIcon: string;
    /**
     * Base64 or url to image for person
     */
    personIcon: string;
    /**
     * Base64 or url to image for chat logo
     */
    logoIcon: string;
    /**
     * Base64 or url to image for send button
     */
    sendIcon: string;
    stopIcon: string;
    /**
     * Base64 or url to image for open button
     */
    openIcon: string;
    /**
     * Text for chat title
     */
    chatTitle: string;
    /**
     * Text for chat subtitle
     */
    chatSubTitle: string;
    /**
     * Text for chat input placeholder
     */
    chatInputPlaceholder: string;
    position: any;
    useCustomStyle: boolean;
    /**
     * Convert links to youtube that in text to embedded video.
     */
    embeddedVideo: boolean;
    isOpen: boolean;
    embedded: boolean;
}
/**
 * The widget default settings
 */
export declare const defaultSettings: {
    version: string;
    name: string;
    mode: ModeType;
    isDebugMode: boolean;
    webSocketReconnectInterval: number;
    webSocketTimeoutInterval: number;
    autoplayVideo: boolean;
    autoplayAudio: boolean;
    chatTitle: string;
    chatSubTitle: string;
    chatInputPlaceholder: string;
    position: {
        bottom: string;
        right: string;
    };
    useCustomStyle: boolean;
    embeddedVideo: boolean;
    isOpen: boolean;
    embedded: boolean;
    openIcon: string;
    sendIcon: string;
    stopIcon: string;
};
