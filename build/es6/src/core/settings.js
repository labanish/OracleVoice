/**
 * Copyright© 2018, Oracle and/or its affiliates. All rights reserved.
 */
const MODE = {
    CHAT_SERVER: 'chatServer',
    BOTS_SDK: 'botsSDK'
};
export { MODE };
/**
 * The widget default settings
 */
export const defaultSettings = {
    version: '2.0.1',
    name: 'chat-sample-custom-web',
    mode: MODE.BOTS_SDK,
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
//# sourceMappingURL=settings.js.map