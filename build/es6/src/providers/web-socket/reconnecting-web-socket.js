/**
 * Copyright© 2018, Oracle and/or its affiliates. All rights reserved.
 */
import { Logger } from "../../core/logger";
/**
 * Reconnecting websoket wrapper
 */
class ReconnectingWebSocket {
    constructor(reconnectInterval, timeoutInterval, url, protocols) {
        this._timedOut = false;
        this._forcedClose = false;
        this.onclose = (event) => { };
        this.onerror = (event) => { };
        this.onmessage = (event) => { };
        this.onopen = (event) => { };
        this.onconnecting = () => { };
        this.logger = new Logger('ReconnectingWebSocket');
        this.logger.debug('create websocket', 'reconnectInterval: ' + reconnectInterval, 'timeoutInterval: ' + timeoutInterval, url);
        this._url = url;
        this._protocols = protocols;
        this._readyState = WebSocket.CONNECTING;
        this.connect(false);
        this._reconnectInterval = reconnectInterval;
        this._timeoutInterval = timeoutInterval;
    }
    get url() { return this._url; }
    get protocol() { return this._ws.protocol; }
    get bufferedAmount() { return this._ws.bufferedAmount; }
    get extensions() { return this._ws.extensions; }
    get readyState() { return this._ws ? this._ws.readyState : this._readyState; }
    get CLOSED() { return this._ws.CLOSED; }
    get CLOSING() { return this._ws.CLOSING; }
    get CONNECTING() { return this._ws.CONNECTING; }
    get OPEN() { return this._ws.OPEN; }
    get binaryType() { return this._ws.binaryType; }
    set binaryType(value) { this._ws.binaryType = value; }
    connect(reconnectAttempt) {
        this._ws = new WebSocket(this._url, this._protocols);
        this.logger.debug('connect', 'attempt connect', this._url);
        // Close the socket if it was not successfully connect after timeout interval
        let timeout = setTimeout(() => {
            this.logger.debug('connection timeout, close socket', this._url);
            this._timedOut = true;
            this._ws.close();
            this._timedOut = false;
        }, this._timeoutInterval);
        this._ws.onopen = (event) => {
            clearTimeout(timeout);
            this.logger.debug('onopen', this._url);
            this._readyState = WebSocket.OPEN;
            reconnectAttempt = false;
            this.onopen(event);
        };
        this._ws.onclose = (event) => {
            clearTimeout(timeout);
            this._ws = null;
            if (this._forcedClose) {
                this._readyState = WebSocket.CLOSED;
                this.onclose(event);
            }
            else {
                this._readyState = WebSocket.CONNECTING;
                this.onconnecting();
                if (!reconnectAttempt && !this._timedOut) {
                    this.logger.debug('onclose', this._url);
                    this.onclose(event);
                }
                setTimeout(() => {
                    this.connect(true);
                }, this._reconnectInterval);
            }
        };
        this._ws.onmessage = (event) => {
            this.logger.debug('onmessage', this._url, event.data);
            this.onmessage(event);
        };
        this._ws.onerror = (event) => {
            this.logger.debug('onerror', this._url, event);
            this.onerror(event);
        };
    }
    close(code, reason) {
        if (this._ws) {
            this._forcedClose = true;
            this._ws.close();
        }
    }
    send(data) {
        if (this._ws) {
            this.logger.debug('send', this._url, data);
            return this._ws.send(data);
        }
        else {
            throw 'INVALID_STATE_ERR : Pausing to reconnect websocket';
        }
    }
    addEventListener(type, listener, useCapture) {
        if (this._ws) {
            this._ws.addEventListener(type, listener, useCapture);
        }
    }
    //
    // addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void {
    //     if(this._ws) {
    //         this._ws.addEventListener(type, listener, useCapture)
    //     }
    // }
    dispatchEvent(evt) {
        if (this._ws) {
            return this._ws.dispatchEvent(evt);
        }
        else {
            return false;
        }
    }
    removeEventListener(type, listener, options) {
        if (this._ws) {
            this._ws.removeEventListener(type, listener, options);
        }
    }
}
export { ReconnectingWebSocket };
//# sourceMappingURL=reconnecting-web-socket.js.map