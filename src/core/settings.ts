/**
 * Copyright© 2018, Oracle and/or its affiliates. All rights reserved.
 */

/**
 * The widget server mode
 */
type ModeType = 'chatServer' | 'botsSDK';
const MODE = {
  CHAT_SERVER: 'chatServer',
  BOTS_SDK: 'botsSDK'
};
export {ModeType, MODE};

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
    mode: ModeType,

    // Bots SDK mode
    /**
     * Application Id for BOT SDK in BOT SDK mode
     */
    appId?: string;
    /**
     * The url to the hosted sdk
     */
    sdkUrl?: string;

    // Chat Server mode
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
export const defaultSettings = {
    version: '{version}',// replace by grunt with data from package.json
    name: '{name}',// replace by grunt with data from package.json

    mode: MODE.BOTS_SDK as ModeType,

    isDebugMode: false,
    webSocketReconnectInterval: 1000,
    webSocketTimeoutInterval: 5000,
    autoplayVideo: false,
    autoplayAudio: false,

    chatTitle: 'Oracle Bots Chat Widget',
    chatSubTitle: 'How can we help?',
    chatInputPlaceholder: 'Type a message...',
    position: {
        bottom: '20px',
        right: '20px'
    },
    useCustomStyle: false,
    embeddedVideo: true,
    isOpen: false,
    embedded: false,
    openIcon: 'askoracle.svg',
    sendIcon: 'microphone-solid.svg',
    stopIcon: 'stop-circle-regular.svg'

};
