"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ChatServerService = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _messagePayload = require("../model/common/payloads/message-payload/message-payload.interface");

var _message = require("../model/common/message");

var _reconnectingWebSocket = require("./web-socket/reconnecting-web-socket");

var _logger = require("../core/logger");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * The service connect the widget with Chat Server by utilizing the ReconnectingWebSocket object.
 */
var ChatServerService = exports.ChatServerService = function () {
    function ChatServerService(config) {
        _classCallCheck(this, ChatServerService);

        this.config = config;
        this._logger = new _logger.Logger('ChatServerService');
        /**
         * The method called when message received by the service
         * @param {IMessage} message
         */
        this.onMessage = function (message) {};
        this._uri = this.config.uri + '?user=' + this.config.userId;
    }
    /**
     * Initialize the service
     * @return {Promise<any>}
     */


    _createClass(ChatServerService, [{
        key: "init",
        value: function init() {
            var _this = this;

            return new Promise(function (resolve) {
                _this._ws = new _reconnectingWebSocket.ReconnectingWebSocket(_this.config.webSocketReconnectInterval, _this.config.webSocketTimeoutInterval, _this._uri);
                _this._ws.onopen = function () {
                    resolve();
                    _this._logger.debug('ws.Open');
                };
                _this._ws.onmessage = _this.wsMessage.bind(_this);
                _this._ws.onclose = function () {
                    return _this._logger.debug('ws.Close');
                };
                _this._ws.onerror = function (event) {
                    return _this._logger.error("the socket had an error", event);
                };
            });
        }
        /**
         * The method loads chat history
         * @return {Promise<IMessage[]>}
         */

    }, {
        key: "loadChat",
        value: function loadChat() {
            return Promise.resolve([]);
        }
        /**
         * Send the message to the Chat Server
         * @param {IUserMessage} message
         */

    }, {
        key: "send",
        value: function send(message) {
            this._logger.debug('send message to chat server', message);
            if (this._ws.readyState === this._ws.OPEN) {
                this._ws.send(JSON.stringify(message));
                if (message.messagePayload.type === _messagePayload.PAYLOAD_TYPE.POSTBACK) {
                    var userMessage = (0, _message.createUserMessage)({
                        type: _messagePayload.PAYLOAD_TYPE.TEXT,
                        text: message.messagePayload.text
                    }, this.config.channel);
                    this.onMessage(userMessage);
                } else {
                    this.onMessage(message);
                }
            } else {
                console.error('Can\'t send message, websoket not ready', message, this._ws.readyState);
            }
        }
        /**
         * Process message received from Chat Server
         * @param {MessageEvent} event
         */

    }, {
        key: "wsMessage",
        value: function wsMessage(event) {
            this._logger.debug('msg received: ', event.data);
            var msg = JSON.parse(event.data);
            if (msg.error) {
                // Convert error message to common model text message
                msg = (0, _message.createBotMessage)(msg.from, {
                    type: _messagePayload.PAYLOAD_TYPE.TEXT,
                    text: 'Error: ' + msg.error.code + ' ' + msg.error.message
                });
            } else if (msg.body && (msg.body.text || msg.body.choices)) {
                // backward comparability with version 1.0
                // convert message from version 1.1 to common model
                var newMsg = (0, _message.createBotMessage)(msg.from, {
                    type: _messagePayload.PAYLOAD_TYPE.TEXT,
                    text: msg.body.text,
                    actions: []
                });
                if (msg.body.choices) {
                    var _iteratorNormalCompletion = true;
                    var _didIteratorError = false;
                    var _iteratorError = undefined;

                    try {
                        for (var _iterator = msg.body.choices[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                            var item = _step.value;

                            newMsg.body.messagePayload.actions.push({
                                type: 'postback',
                                label: item,
                                postback: item
                            });
                        }
                    } catch (err) {
                        _didIteratorError = true;
                        _iteratorError = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion && _iterator.return) {
                                _iterator.return();
                            }
                        } finally {
                            if (_didIteratorError) {
                                throw _iteratorError;
                            }
                        }
                    }
                }
                msg = newMsg;
            } else if (msg.from && msg.to) {
                // the message received from the person from another chat
                delete msg.from;
            }
            this.onMessage(msg);
        }
    }, {
        key: "clear",
        value: function clear() {}
    }]);

    return ChatServerService;
}();
//# sourceMappingURL=chat-server-service.js.map
