'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ReconnectingWebSocket = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Copyright© 2018, Oracle and/or its affiliates. All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _logger = require('../../core/logger');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Reconnecting websoket wrapper
 */
var ReconnectingWebSocket = function () {
    function ReconnectingWebSocket(reconnectInterval, timeoutInterval, url, protocols) {
        _classCallCheck(this, ReconnectingWebSocket);

        this._timedOut = false;
        this._forcedClose = false;
        this.onclose = function (event) {};
        this.onerror = function (event) {};
        this.onmessage = function (event) {};
        this.onopen = function (event) {};
        this.onconnecting = function () {};
        this.logger = new _logger.Logger('ReconnectingWebSocket');
        this.logger.debug('create websocket', 'reconnectInterval: ' + reconnectInterval, 'timeoutInterval: ' + timeoutInterval, url);
        this._url = url;
        this._protocols = protocols;
        this._readyState = WebSocket.CONNECTING;
        this.connect(false);
        this._reconnectInterval = reconnectInterval;
        this._timeoutInterval = timeoutInterval;
    }

    _createClass(ReconnectingWebSocket, [{
        key: 'connect',
        value: function connect(reconnectAttempt) {
            var _this = this;

            this._ws = new WebSocket(this._url, this._protocols);
            this.logger.debug('connect', 'attempt connect', this._url);
            // Close the socket if it was not successfully connect after timeout interval
            var timeout = setTimeout(function () {
                _this.logger.debug('connection timeout, close socket', _this._url);
                _this._timedOut = true;
                _this._ws.close();
                _this._timedOut = false;
            }, this._timeoutInterval);
            this._ws.onopen = function (event) {
                clearTimeout(timeout);
                _this.logger.debug('onopen', _this._url);
                _this._readyState = WebSocket.OPEN;
                reconnectAttempt = false;
                _this.onopen(event);
            };
            this._ws.onclose = function (event) {
                clearTimeout(timeout);
                _this._ws = null;
                if (_this._forcedClose) {
                    _this._readyState = WebSocket.CLOSED;
                    _this.onclose(event);
                } else {
                    _this._readyState = WebSocket.CONNECTING;
                    _this.onconnecting();
                    if (!reconnectAttempt && !_this._timedOut) {
                        _this.logger.debug('onclose', _this._url);
                        _this.onclose(event);
                    }
                    setTimeout(function () {
                        _this.connect(true);
                    }, _this._reconnectInterval);
                }
            };
            this._ws.onmessage = function (event) {
                _this.logger.debug('onmessage', _this._url, event.data);
                _this.onmessage(event);
            };
            this._ws.onerror = function (event) {
                _this.logger.debug('onerror', _this._url, event);
                _this.onerror(event);
            };
        }
    }, {
        key: 'close',
        value: function close(code, reason) {
            if (this._ws) {
                this._forcedClose = true;
                this._ws.close();
            }
        }
    }, {
        key: 'send',
        value: function send(data) {
            if (this._ws) {
                this.logger.debug('send', this._url, data);
                return this._ws.send(data);
            } else {
                throw 'INVALID_STATE_ERR : Pausing to reconnect websocket';
            }
        }
    }, {
        key: 'addEventListener',
        value: function addEventListener(type, listener, useCapture) {
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

    }, {
        key: 'dispatchEvent',
        value: function dispatchEvent(evt) {
            if (this._ws) {
                return this._ws.dispatchEvent(evt);
            } else {
                return false;
            }
        }
    }, {
        key: 'removeEventListener',
        value: function removeEventListener(type, listener, options) {
            if (this._ws) {
                this._ws.removeEventListener(type, listener, options);
            }
        }
    }, {
        key: 'url',
        get: function get() {
            return this._url;
        }
    }, {
        key: 'protocol',
        get: function get() {
            return this._ws.protocol;
        }
    }, {
        key: 'bufferedAmount',
        get: function get() {
            return this._ws.bufferedAmount;
        }
    }, {
        key: 'extensions',
        get: function get() {
            return this._ws.extensions;
        }
    }, {
        key: 'readyState',
        get: function get() {
            return this._ws ? this._ws.readyState : this._readyState;
        }
    }, {
        key: 'CLOSED',
        get: function get() {
            return this._ws.CLOSED;
        }
    }, {
        key: 'CLOSING',
        get: function get() {
            return this._ws.CLOSING;
        }
    }, {
        key: 'CONNECTING',
        get: function get() {
            return this._ws.CONNECTING;
        }
    }, {
        key: 'OPEN',
        get: function get() {
            return this._ws.OPEN;
        }
    }, {
        key: 'binaryType',
        get: function get() {
            return this._ws.binaryType;
        },
        set: function set(value) {
            this._ws.binaryType = value;
        }
    }]);

    return ReconnectingWebSocket;
}();

exports.ReconnectingWebSocket = ReconnectingWebSocket;
//# sourceMappingURL=reconnecting-web-socket.js.map
