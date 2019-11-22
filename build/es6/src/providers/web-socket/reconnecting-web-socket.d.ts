/**
 * Copyright© 2018, Oracle and/or its affiliates. All rights reserved.
 */
/**
 * Reconnecting websoket wrapper
 */
declare class ReconnectingWebSocket implements WebSocket {
    private _ws;
    private _url;
    private _protocols;
    private _timedOut;
    private _readyState;
    private _forcedClose;
    private _reconnectInterval;
    private _timeoutInterval;
    readonly url: string;
    readonly protocol: string;
    readonly bufferedAmount: number;
    readonly extensions: string;
    readonly readyState: number;
    readonly CLOSED: number;
    readonly CLOSING: number;
    readonly CONNECTING: number;
    readonly OPEN: number;
    binaryType: BinaryType;
    onclose: (event: Event) => any;
    onerror: (event: Event) => any;
    onmessage: (event: MessageEvent) => any;
    onopen: (event: Event) => any;
    onconnecting: () => void;
    private logger;
    constructor(reconnectInterval: number, timeoutInterval: number, url: string, protocols?: string | string[]);
    private connect;
    close(code?: number, reason?: string): void;
    send(data: any): void;
    addEventListener<K extends keyof WebSocketEventMap>(type: K, listener: (this: WebSocket, ev: WebSocketEventMap[K]) => any, useCapture?: boolean): void;
    dispatchEvent(evt: Event): boolean;
    removeEventListener(type: string, listener?: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
export { ReconnectingWebSocket };
